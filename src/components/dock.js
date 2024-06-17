import React from "react"
import ReactDOM from 'react-dom';

import { DockLayout } from "rc-dock"

import { IonWorldImageryStyle, ProviderViewModel, buildModuleUrl, createWorldImagery, UrlTemplateImageryProvider, Viewer, Ion, Cartesian3, Color, LabelStyle, VerticalOrigin, Cartesian2, defined, Entity, PinBuilder, SceneTransforms} from "cesium"
// eslint-disable-next-line
import { createDefaultImageryProviderViewModels } from "cesium"
import { FiLayers, FiLink2, FiSettings, FiGlobe, FiInfo } from "react-icons/fi"
import { MdFlightTakeoff, MdTimeline } from "react-icons/md"
import FcxTimeline from "./timeline"
import SubsettingTool from "./subsettingTool";
import {SubsetsList} from "./subsettingTool/components";
import LayerList from "./layerList"
import emitter from "../helpers/event"
import DOIList from "./doiList"
import CampaignInfoLinks from "./campaignInfo"
import Settings from "./settings"
import { getGPUInfo, adjustHeightOfPanels } from "../helpers/utils"
import { mapboxUrl, cesiumDefaultAccessToken } from "../config"
import { checkPath } from "../helpers/path"
import InstrumentsHistogram from "./instrumentsHistogram";

import Modal from "./Modal"

import "rc-dock/dist/rc-dock.css"
import "../css/dock.css"
// import { url } from "inspector";

let viewer
let viewerObj = { viewer: null } // to be able to pass by reference to other components.

/*
  Useful links related to adding additional layers to base layer picker
  https://stackoverflow.com/questions/48291191/adding-mapbox-imagery-to-cesium-baselayerpicker
  https://github.com/CesiumGS/cesium/blob/master/Source/Widgets/BaseLayerPicker/createDefaultImageryProviderViewModels.js
  
  console.log(createDefaultImageryProviderViewModels())
*/

const getProviderViewModels = () =>{
  const providerViewModels = []

  providerViewModels.push(
    new ProviderViewModel({
      name: "Bing Maps Aerial with Labels",
      iconUrl: buildModuleUrl("Widgets/Images/ImageryProviders/bingAerialLabels.png"),
      tooltip: "Bing Maps aerial imagery with labels, provided by Cesium ion",
      category: "Cesium ion",
      creationFunction: function () {
        return createWorldImagery({
          style: IonWorldImageryStyle.AERIAL_WITH_LABELS,
        })
      },
    })
  )

  providerViewModels.push(
    new ProviderViewModel({
      name: "Mapbox Streets Dark",
      iconUrl: buildModuleUrl("Widgets/Images/ImageryProviders/mapboxStreets.png"),
      category: "Mapbox",
      tooltip: "Mapbox Streets Dark",
      creationFunction: function () {
        return new UrlTemplateImageryProvider({
          url: mapboxUrl,
        })
      },
    })
  )
  return providerViewModels
}

let getCampaignTab = (campaign) => {
  
  const logo = campaign.logo
  const description = campaign.description

  return {
    title: (
      <div>
        <MdFlightTakeoff /> Campaign{" "}
      </div>
    ),
    content: (
      <div style={{ textAlign: "center" }}>
        <p>
          <img alt="Campaign Logo" style={{ height: "80%", width: "80%" }} src={logo} />
          <br /> {description}
        </p>
      </div>
    ),
  }
}

let box = (campaign) => {
  const box = ({
  // const box = {
    dockbox: {
      mode: "horizontal",

      children: [
        {
          mode: "vertical",

          children: [
            {
              tabs: [
                {...getCampaignTab(campaign), id: "tabCampaign" },
                {
                  title: (
                    <div>
                      <FiInfo /> Links{" "}
                    </div>
                  ),
                  id: "tabCampaignLinks",
                  content: <CampaignInfoLinks campaign={campaign} />,
                },
              ],
            },
            {
              size: 550,
              tabs: [
                {
                  title: (
                    <div>
                      <FiLayers /> Display{" "}
                    </div>
                  ),
                  id: "tabDisplay",
                  content: <LayerList campaign={campaign} />,
                },
                {
                  title: (
                    <div>
                      <FiLink2 /> Data{" "}
                    </div>
                  ),
                  id: "tabData",
                  content: <DOIList campaign={campaign}/>,
                },
                {
                  title: (
                    <div>
                      <FiSettings /> Settings{" "}
                    </div>
                  ),
                  id: "tabSettings",
                  content: <Settings />,
                },
              ],
            },
          ],
        },
        {
          size: 1000,
          panelLock: true,
          tabs: [
            {
              title: (
                <div>
                  <FiGlobe /> Data Viewer{" "}
                </div>
              ),
              id: "tabCesium",
              content: (
                <div>
                  <span className="gpuName">Detected GPU: {getGPUInfo().gpuName}</span>
                  <div id="cesiumContainer"></div>
                </div>
              ),
            },
            {
              title: (
                <div>
                  <MdTimeline /> Timeline{" "}
                </div>
              ),
              id: "tabTimeline",
              content: <FcxTimeline campaign={campaign} />,
            }
          ],
        },
      ],
    }
  });

  // Subsetting tool and Histogram tool (data) only available only for GOES-R field campaign for now.
  if (campaign.title && campaign.title.includes("GOES-R")) {
    // for histogram
    box.dockbox.children[1].tabs.push({
      title: (
        <div>
          <FiLayers /> Histogram{" "}
        </div>
      ),
      id: "histogram",
      content: <InstrumentsHistogram/>,
    });
    
    // for subsetting tool
    // add tabs for subsets
    box.dockbox.children[1].tabs.push({
      title: (
        <div>
          <FiLayers /> Subsets{" "}
        </div>
      ),
      id: "subsets",
      content: <SubsetsList/>,
    });
    // add floatbox for subsetting tool
    box.floatbox = {
      mode: 'float',
      children: [
        {
          tabs: [
              {
                title: (
                  <div>
                    <FiLayers /> Subsetting Tool{" "}
                  </div>
                ),
                id: "subsettingTool",
                closable: true,
                content: <SubsettingTool style={{width: "100%", height: "100%"}} cesiumViewer={viewerObj}/>,
                group: "subsettingtool"
              },
          ],
          // x: (1920-400-40), y: (983-200), w: 400, h: 240 // based off component with .dock-layout class. making it movable, takes over css for bottom right
          w: 400, h: 240 // always on bottom right, with .dock-panel.dock-style-subsettingtool css. linked using xxx-group
        }
      ]
    }
  }
  return box;
}

let createViewer = () => {
  if (!checkPath()) return
  Ion.defaultAccessToken = cesiumDefaultAccessToken

  viewer = new Viewer("cesiumContainer", {
    //Use Cesium World Terrain
    // terrainProvider: createWorldTerrain(),
    baseLayerPicker: true,
    skyBox: false,
    automaticallyTrackDataSourceClocks: false,
    navigationHelpButton: true,
    homeButton: false,
    sceneModePicker: true,
    shadows: false,
    infoBox: false,
    imageryProviderViewModels: getProviderViewModels(),
    selectedImageryProviderViewModel: getProviderViewModels()[1],
  })

  viewerObj.viewer = viewer;

  viewer.selectedEntityChanged.addEventListener(function(selectedEntity) {
    if (defined(selectedEntity)) {
        if (defined(selectedEntity.name) && selectedEntity.name.includes('imageViewer')) {
          console.log('Selected ' + selectedEntity.name);
          const ref = React.createRef();
          ref.current = document.createElement('div');
          ReactDOM.render(
            <Modal id={selectedEntity.name}/>,
            ref.current
          )
          viewer.selectedEntity = undefined
        } else {
          console.log('Unknown entity selected.');
        }
    } else {
      console.log('Deselected.');
    }
  });
}

let checkViewer = () => {
  setTimeout(() => {
    if(!checkPath()) return
    let cesiumActive = document.getElementById("cesiumContainer")
    
    if(cesiumActive) cesiumActive = cesiumActive.querySelectorAll("canvas")[0]

    if (!cesiumActive) {
      createViewer()
      adjustHeightOfPanels()
    }
    else {
      checkViewer()
    }
  }, 500)
}

/* 
  Useful links related to Dock
  https://codesandbox.io/s/0mjo76mnz0?file=/src/styles.css
*/
class Dock extends React.Component {
  

  componentDidMount() {
    createViewer()
    if (viewer) {
      console.log("%c Viewer initialization successful", "background: green; color: white; display: block;")
    }
  }
  onDragNewTab = (e) => { }

  onLayoutChange = (newLayout, currentTabId) => {
    
    this.setState({ layout: newLayout })
    checkViewer()
  }
  render() {
    emitter.emit("dockRender")
    return (
      <>
      <DockLayout
        defaultLayout={
          box(this.props.campaign)
        }
        style={{
          position: "absolute",
          left: 10,
          top: 10,
          right: 10,
          bottom: 10,
        }}
        onLayoutChange={this.onLayoutChange}
      />
      </>
    )
  }
}

export { Dock, viewer }
