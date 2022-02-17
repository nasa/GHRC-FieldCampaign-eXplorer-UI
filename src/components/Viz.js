import React, { Component } from "react"
import { hot } from "react-hot-loader"

import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import { Animated } from "react-animated-css"
import moment from "moment"
import {
    Cesium3DTileset,
    Cesium3DTile,
    Cesium3DTileOptimizations,
    Cesium3DTileRefine,
    CullingVolume,
    RuntimeError,
    TimeInterval,
    defined,
    ClockRange,
    JulianDate,
    CzmlDataSource,
    CallbackProperty,
    HeadingPitchRoll,
    Transforms,
    Cartesian3,
    Cesium3DTileStyle,
    TimeIntervalCollection,
    WebMapTileServiceImageryProvider,
    ImageryLayer,
    PointPrimitiveCollection,
    NearFarScalar,
    Color as ColorCesium,
} from "cesium"
import { extendCesium3DTileset } from "temporal-3d-tile"

import { checkPath } from "../helpers/path"
import emitter from "../helpers/event"
import { Dock, viewer } from "./dock"
import store from "../state/store"
import allActions from "../state/actions"
import { getLayer, adjustHeightOfPanels, getGPUInfo } from "../helpers/utils"
import { supportEmail } from "../config"
import { getColorExpression, getShowExpression, loadData, getTimes, mousePosition } from "./layerFunctions"
import { isEmpty } from "lodash"

class Viz extends Component {
    
    constructor(props){
        super(props)
        this.epoch = null
        this.viewerTime = 0
        this.linger = 300
        this.activeLayers = []
        this.errorLayers = []
        this.lastSelectedLayers = []
        this.savedSamera = null
        this.trackEntity = false
        this.trackedEntity = null
        this.pointsCollection = null
        this.Temporal3DTileset = extendCesium3DTileset({ Cesium3DTileset, Cesium3DTile, Cesium3DTileOptimizations, Cesium3DTileRefine, CullingVolume, RuntimeError, TimeInterval, defined })

    }

    renderLayers(selectedLayers, campaign) {
        const layersToRemove = []
        for (const [, activeLayerItem] of this.activeLayers.entries()) {
            // if layer is not found in current list of selected layers, remove it
            let found = false
            for (const [, selectedLayerId] of selectedLayers.entries()) {
                if (selectedLayerId === activeLayerItem.layer.layerId) {
                    found = true
                    break
                }
            }
            if (!found) {
                layersToRemove.push(activeLayerItem)
            }
        }
        for (const e of this.errorLayers) {
            store.dispatch(allActions.listActions.markLoaded(e))
            store.dispatch(allActions.listActions.markUnLoaded(e))
        }
        for (let i = 0; i < layersToRemove.length; i++) {
            if (layersToRemove[i].layer.displayMechanism === "czml") {
                viewer.dataSources.remove(layersToRemove[i].cesiumLayerRef)
            } else if (layersToRemove[i].layer.displayMechanism === "3dtile" || layersToRemove[i].layer.displayMechanism === "points") {
                viewer.scene.primitives.remove(layersToRemove[i].cesiumLayerRef)
                if (layersToRemove[i].eventCallback) {
                    layersToRemove[i].eventCallback()
                }
            } else if (layersToRemove[i].layer.displayMechanism === "wmts") {
                viewer.imageryLayers.remove(layersToRemove[i].cesiumLayerRef)
            }
            store.dispatch(allActions.listActions.markUnLoaded(layersToRemove[i].layer.layerId))

            this.activeLayers = this.activeLayers.filter((item) => {
                return item.layer.layerId !== layersToRemove[i].layer.layerId
            })
        }

        for (const [, selectedLayerId] of selectedLayers.entries()) {
            const layer = getLayer(selectedLayerId, campaign)

            const layerDate = moment(layer.date).format("YYYY-MM-DD") //todo change to moment.utc?
            const cesiumDate = JulianDate.toDate(viewer.clock.currentTime)
            const viewerDate = moment.utc(cesiumDate).format("YYYY-MM-DD")
            const viewerStart = `${layerDate}T00:00:00Z`
            const viewerEnd = `${layerDate}T23:59:59Z`

            if (layerDate !== viewerDate) {
                // remove layers with other dates
                setTimeout(() => {
                    if(!checkPath()) return;
                    store.dispatch(allActions.listActions.removeLayersByDate(viewerDate))
                }, 1000)

                viewer.clock.currentTime = JulianDate.fromIso8601(viewerStart)

                if (campaign.defaultCamera[layerDate] && campaign.defaultCamera[layerDate].position) {
                    this.restoreCamera(campaign.defaultCamera[layerDate])
                }
            }
            viewer.clock.startTime = JulianDate.fromIso8601(viewerStart)
            viewer.clock.stopTime = JulianDate.fromIso8601(viewerEnd)
            viewer.timeline.zoomTo(JulianDate.fromIso8601(viewerStart), JulianDate.fromIso8601(viewerEnd))

            let found = false
            for (const [, activeLayerItem] of this.activeLayers.entries()) {
                if (activeLayerItem.layer.layerId === selectedLayerId) {
                    found = true
                    break
                }
            }

            if (found) continue

            store.dispatch(allActions.listActions.markLoading(selectedLayerId))

            if (layer.displayMechanism === "czml") {
                const dataSource = new CzmlDataSource()

                // eslint-disable-next-line no-loop-func
                dataSource.load(layer.czmlLocation).then((ds) => {
                    store.dispatch(allActions.listActions.markLoaded(selectedLayerId))
                    if (layer.type === "track") {
                        let modelReference = ds.entities.getById("Flight Track")

                        modelReference.orientation = new CallbackProperty((time, _result) => {
                            const position = modelReference.position.getValue(time)
                            const roll = modelReference.properties.roll.getValue(time)
                            const pitch = modelReference.properties.pitch.getValue(time)
                            const heading = modelReference.properties.heading.getValue(time)
                            const hpr = new HeadingPitchRoll(heading, pitch, roll)
                            return Transforms.headingPitchRollQuaternion(position, hpr)
                        }, false)

                        this.trackedEntity = ds.entities.getById("Flight Track")
                        this.trackedEntity.viewFrom = new Cartesian3(-30000, -70000, 50000)
                        if (this.trackEntity) {
                            viewer.trackedEntity = this.trackedEntity
                            viewer.clock.shouldAnimate = true
                            viewer.clock.canAnimate = true
                        }
                    }

                    this.activeLayers.push({ layer: layer, cesiumLayerRef: ds })
                    viewer.dataSources.add(ds)
                }).otherwise((_error) => {
                    console.error(_error)
                    window.alert("Error Loading Data")
                    this.errorLayers.push(selectedLayerId)
                })
            } else if (layer.displayMechanism === "3dtile") {
                //use TimeDynamicPointCloud from Brian's npm package temporal-3d-tile
                const newTileset = new this.Temporal3DTileset({
                    url: layer.tileLocation,
                    layerId: layer.layerId, // currently not used
                })
                this.activeLayers.push({ layer: layer, cesiumLayerRef: newTileset })

                viewer.scene.primitives.add(newTileset)

                let previousTime = JulianDate.clone(viewer.clock.currentTime)

                newTileset.readyPromise
                    // eslint-disable-next-line no-loop-func
                    .then((tileset) => {
                        store.dispatch(allActions.listActions.markLoaded(selectedLayerId))

                        this.epoch = JulianDate.fromIso8601(tileset.properties.epoch)
                        tileset.style = new Cesium3DTileStyle()
                        if (layer.displayName === "Cloud Radar System") {
                            tileset.style.pointSize = 2.0;
                            tileset.style.color = getColorExpression();
                        } else if (layer.displayName === "Cloud Physics LiDAR") {
                            tileset.style.pointSize = 4.0;
                        }
                        this.viewerTime = JulianDate.secondsDifference(JulianDate.clone(viewer.clock.currentTime), this.epoch)
                        tileset.style.show = getShowExpression(this.viewerTime, this.linger)
                        tileset.makeStyleDirty()

                        emitter.on("lingerTimeChange", (value) => {
                            this.linger = value
                            tileset.style.show = getShowExpression(this.viewerTime, this.linger)
                            tileset.makeStyleDirty()
                        })

                        if (layer.addOnTickEventListener && layer.addOnTickEventListener === true) {
                            const eventCallback = viewer.clock.onTick.addEventListener((_e) => {
                                if (!JulianDate.equalsEpsilon(previousTime, viewer.clock.currentTime, 1)) {
                                    previousTime = JulianDate.clone(viewer.clock.currentTime)
                                    this.viewerTime = JulianDate.secondsDifference(previousTime, this.epoch)
                                    tileset.style.show = getShowExpression(this.viewerTime, this.linger)
                                    tileset.makeStyleDirty()
                                }
                            })

                            for (const [, activeLayerItem] of this.activeLayers.entries()) {
                                if (activeLayerItem.layer.layerId === layer.layerId) {
                                    activeLayerItem.eventCallback = eventCallback
                                    break
                                }
                            }
                        }
                    })
                    .otherwise((_error) => {
                    console.error(_error)
                        window.alert("Error Loading Data")
                        this.errorLayers.push(selectedLayerId)
                        // this.activeLayers.push({ layer: layer })
                    })
            }
            else if (layer.displayMechanism === "points") {

                const intvl = 60;
                const promiseG = Promise.resolve(loadData(layer.tileLocation));
                Promise.all([promiseG]).then(([LightningData]) => {
                    const timingsArray = getTimes(LightningData);
                    let lastTime =this.viewerTime;
                    let timesLen = timingsArray.length;
                    let initialTime = timingsArray[0];
                    let endTime = timingsArray[timesLen - 1];

                    this.pointsCollection = viewer.scene.primitives.add(new PointPrimitiveCollection());
                    this.activeLayers.push({ layer: layer, cesiumLayerRef: this.pointsCollection })

                    store.dispatch(allActions.listActions.markLoaded(selectedLayerId))
                    /*  Display lightning on clock ticking */

                    if (layer.addOnTickEventListener && layer.addOnTickEventListener === true) {

                        const eventCallback = viewer.clock.onTick.addEventListener((_e) => {
                            let previousTime = JulianDate.clone(viewer.clock.currentTime);

                            const startTime = JulianDate.fromIso8601(layer.date + "T00:00:00Z");
                            let viewTime = JulianDate.secondsDifference(previousTime, startTime);
                            let pT60 = lastTime - lastTime % intvl;
                            let vT60 = viewTime - viewTime % intvl;

                            // remove points at off-interval
                            if (vT60 !== pT60 & pT60 >= initialTime & pT60 <= endTime) {
                                let indx = timingsArray.indexOf(pT60);
                                if (indx >= 0) {
                                    this.pointsCollection.removeAll();
                                }
                            }

                            // add points on 60s time interval
                            if (vT60 >= initialTime & vT60 <= endTime) {
                                let indx = timingsArray.indexOf(vT60);
                                if (indx >= 0 & vT60 !== pT60) {
                                    let nFScalar = new NearFarScalar(1.e2, 2, 8.0e6, 0.5);
                                    let yellow = new ColorCesium(1.0, 1.0, 0.4, 1);
                                    let cyan = new ColorCesium(0.68, 1.0, 0.55, .6);  //Cesium.Color.CYAN;
                                    let orng = ColorCesium.ORANGE.brighten(0.5, new ColorCesium());
                                    let vec = LightningData[indx];
                                    let lon = vec.Lon;
                                    let lat = vec.Lat;
                                    let rad = vec.Rad;
                                    let pw = 0.6;
                                    let fct = 1 / 15;
                                    let color = yellow;
                                    if (layer.dispType === 'Activity') {
                                        pw = 0.6;
                                        fct = 1 / 4;
                                        color = orng;
                                        rad = vec.count;
                                    }
                                    if (layer.dispType === 'LIntensity') {
                                        pw = .5;
                                        fct = 1 / 100;
                                        color = cyan;
                                        rad = vec.Rad;
                                    }

                                    for (let i = 0; i < lon.length; i += 1) {
                                        let pixel = Math.pow(rad[i], pw) * fct
                                        this.pointsCollection.add({
                                            id: layer.dispType + parseInt(i, 10),   //id+'_'+parseInt(i,10),
                                            show: true,
                                            position: Cartesian3.fromDegrees(lon[i], lat[i], 0),
                                            pixelSize: pixel,
                                            color: color,
                                            scaleByDistance: nFScalar,
                                        });
                                    };
                                }
                            }
                            lastTime = viewTime;
                        });

                        for (const [, activeLayerItem] of this.activeLayers.entries()) {
                            if (activeLayerItem.layer.layerId === layer.layerId) {
                                activeLayerItem.eventCallback = eventCallback
                                break
                            }
                        }
                    }
                    /*--- mouse functions  ---*/
                    mousePosition(viewer);

                }).catch(_error => {
                    console.error(_error)
                    window.alert("Error Loading Data")
                    this.errorLayers.push(selectedLayerId)
                })

            }
            else if (layer.displayMechanism === "wmts") {

                const times = layer.times
                const dates = []
                for (const time of times) {
                    const date = new JulianDate()
                    JulianDate.addSeconds(JulianDate.fromIso8601("2000-01-01T12:00:00Z"), Number(time), date)
                    dates.push(date)
                }
                const timeIntervalCollection = TimeIntervalCollection.fromJulianDateArray({
                    julianDates: dates,
                    dataCallback: (_interval, index) => {
                        return { Time: times[index] }
                    },
                })

                /*
                Useful links
                https://cesium.com/docs/tutorials/imagery-layers/ 
                https://sandcastle.cesium.com/?src=Imagery%20Adjustment.html
                */

                let imageryProvider = new WebMapTileServiceImageryProvider({
                    url: layer.url,
                    format: layer.format,
                    style: layer.style,
                    times: timeIntervalCollection,
                    tileMatrixSetID: layer.tileMatrixSetID,
                    clock: viewer.clock,
                    layer: layer.layer,
                })
                let imageLayer = new ImageryLayer(imageryProvider)
                viewer.imageryLayers.add(imageLayer)
                this.activeLayers.push({ layer: layer, cesiumLayerRef: imageLayer })

                imageryProvider.readyPromise.then((status) => {
                    if (status) {
                        store.dispatch(allActions.listActions.markLoaded(selectedLayerId))
                    }
                })


            }
        }
    }

    readStateAndRender(campaign) {
        const selectedLayers = store.getState().selectedLayers
        if (JSON.stringify(this.lastSelectedLayers) !== JSON.stringify(selectedLayers)) {
            this.lastSelectedLayers = selectedLayers
            this.renderLayers(selectedLayers, campaign)
        }
    }

    restoreCamera(cameraObj, updateTime = true) {
        if (cameraObj) {
            let camera = viewer.scene.camera
            camera.position = {...cameraObj.position}
            camera.direction = {...cameraObj.direction}
            camera.up = {...cameraObj.up}
            camera.right = {...cameraObj.right}
            if (updateTime && cameraObj.currentTime) {
                viewer.clock.currentTime = {...cameraObj.currentTime}
            }
        }
    }
    
    componentDidMount() {
        const getCampaign = () => this.props.campaign
        const campaign = getCampaign()

        if (!viewer) {
            alert(`Error: Viewer failed to initialize. Please contact support team at ${supportEmail}`)
        }
        
        if (isEmpty(campaign)) {
            alert(`Error: Couldn't fetch the data. Please contact support team at ${supportEmail}`)
        }
        
        viewer.scene.globe.tileLoadProgressEvent.addEventListener((_tiles) => { })

        viewer.imageryLayers.layerAdded.addEventListener((layer) => {
            if (layer.imageryProvider) {
                // we can raise an event here for imagery ${layer.imageryProvider.url} loaded
            }
        })

        viewer.clock.clockRange = ClockRange.LOOP_STOP
        viewer.clock.multiplier = 10

        setInterval(() => {
            let camera = viewer.scene.camera
            this.savedSamera = {
                position: camera.position,
                direction: camera.direction,
                up: camera.up,
                right: camera.right,
                currentTime: viewer.clock.currentTime,
            }
        }, 2000)

        //check for default selected layers
        this.readStateAndRender(campaign)

        store.subscribe(() => {
            this.readStateAndRender(campaign)
        })

        emitter.on("dockRender", () => {
            setTimeout(() => {
                if (!checkPath()) return
                let entitiesLength = viewer.entities.values.length
                let dataSourcesLength = viewer.dataSources.length
                let primitiesLength = viewer.scene.primitives.length
                if (entitiesLength === 0 && dataSourcesLength === 0 && primitiesLength === 0) {
                    this.activeLayers = []
                    if (this.lastSelectedLayers.length !== 0) {
                        this.renderLayers(this.lastSelectedLayers, campaign)
                        this.restoreCamera(this.savedSamera)
                        //TODO: viewer's current time is not getting restored
                    }
                }
            }, 1000)
        })

        emitter.on("tabLayoutChange", () => {
            adjustHeightOfPanels()
        })

        emitter.on("trackairplaneChange", (checked) => {
            if (checked) {
                this.trackEntity = true
                viewer.trackedEntity = this.trackedEntity
                viewer.clock.shouldAnimate = true
                viewer.clock.canAnimate = true
            } else {
                this.trackEntity = false
                viewer.trackedEntity = null
            }
        })

        emitter.on("listcheck", (selectedLayers) => {
            this.lastSelectedLayers = selectedLayers
            this.renderLayers(selectedLayers, campaign)
        })

        adjustHeightOfPanels()

        setTimeout(() => {
            if (!checkPath()) return
            adjustHeightOfPanels()
        }, 5000)

        setTimeout(() => {
            if (!checkPath()) return
            let logoElement = document.querySelector(".fcx-logo")
            if(logoElement?.parentNode){
                logoElement.parentNode.removeChild(logoElement)
            }
            let alertElement = document.querySelector("#alert-gpu")
            if (alertElement?.parentNode) {
                alertElement.parentNode.removeChild(alertElement)
            }
        }, 5000)
    }

    render() {
        let gpuInfo = getGPUInfo()

        return (
            <div
                className={"main"}
            >
                <Snackbar id="alert-gpu" anchorOrigin={{ vertical: "top", horizontal: "center" }} open={!gpuInfo.discreteGPU} key="alert-gpu">
                    <Alert severity="error">Note: Your current GPU is {gpuInfo.gpuName}. The performance of Field campaign Explorer will depend performance of your GPU. A discrete GPU is recommended.</Alert>
                </Snackbar>

                <div className="fcx-logo animate__rotateIn">
                    <Animated animationIn="tada" animationOut="rollOut" animationInDuration={5000} animationOutDuration={1000} isVisible={true}>
                        <img alt="FCX Logo" className="centered" src={`${process.env.PUBLIC_URL}/fcx_logo.png`} />
                    </Animated>
                </div>

                <Dock campaign={this.props.campaign} />
            </div>
        )
    }
}

export default hot(module)(Viz)
