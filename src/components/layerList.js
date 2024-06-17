import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Switch from "@material-ui/core/Switch"
import CircularProgress from "@material-ui/core/CircularProgress"
import FlightIcon from "@material-ui/icons/Flight"
import Card from "@material-ui/core/Card"
import { FaSatellite } from "react-icons/fa"
import { GrSatellite } from "react-icons/gr"
import { BsLayers } from "react-icons/bs"
import { MdDateRange } from "react-icons/md"
import { useSelector, useDispatch } from "react-redux"
import Box from "@material-ui/core/Box"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import moment from "moment"
import allActions from "../state/actions"
import {BsCardImage} from 'react-icons/bs'

import { IonWorldImageryStyle, ProviderViewModel, buildModuleUrl, createWorldImagery, UrlTemplateImageryProvider, Viewer, Ion, Cartesian3, Color, LabelStyle, VerticalOrigin, Cartesian2, defined, Entity, PinBuilder, SceneTransforms} from "cesium"
import { Dock, viewer } from "./dock"
import geoJson from '../data/chicago-parks2.json'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

let imageToggle = false;
export default function LayerList({ campaign }) {
  const classes = useStyles()
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  let dates = []

  for (const [itemIndex, itemValue] of campaign.layers.entries()) {
    const layerItems = itemValue

    const layers = []

    // special imageviewer layer for 2017-05-17 GOES-R field campaign
    if (campaign.title === 'GOES-R PLT Field Campaign' && layerItems.date === '2017-05-17') {
      layers.push((
          <Card key={"primary-card-Image_viewer_2017-05-17"} variant="outlined">
              <ListItem key={"primary-item-Image_viewer_2017-05-17"}>
                <ListItemIcon><BsCardImage /></ListItemIcon>
                <ListItemText id={`primary-list-label-Image_viewer_2017-05-17`} primary="Image Viewer" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={lightningImageViewerChangeHandler}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem key={"secondary-item-variable-Image_viewer_2017-05-17"}>
                <ListItemText id={`secondary-list-label-Image_viewer_2017-05-17`} primary={
                  <span style={{ fontSize: 12 }}>
                    Toggle to enable/disable Markers
                  </span>
                }></ListItemText>
              </ListItem>
            </Card>
        )
      )
    }

    for (const [layerIndex, layerValue] of layerItems.items.entries()) {
      // icons and information gathering for layer card; needed for layerlist sidebar and layer legend
      let icon = <BsLayers />

      let legendImage
      let legendUrl = ""

      if (layerValue.type === "track") {
        legendUrl = campaign.legends["track"].url
      } else {
        if (campaign.legends[layerValue.shortName]) {
          legendUrl = campaign.legends[layerValue.shortName].url
        }
      }
      legendImage = (
        <div>
          <img className="legend" src={legendUrl} alt="legend" />
        </div>
      )

      if (layerValue.platform === "satellite") {
        icon = <FaSatellite />
      } else if (layerValue.platform === "air") {
        icon = <FlightIcon />
      } else if (layerValue.platform === "ground") {
        icon = <GrSatellite />
      }
      if (state.layerStatus.inProgress.indexOf(layerValue.layerId) !== -1) {
        icon = <CircularProgress />
      }
      if (state.layerStatus.loaded.indexOf(layerValue.layerId) !== -1) {
        icon = <div style={{ color: "green" }}>{icon}</div>
      }

      let layerStartTime = moment.utc(layerValue.start).format("HH:mm:ss")
      let layerEndTime = moment.utc(layerValue.end).format("HH:mm:ss")

      let layerVariable
      if (layerValue.variableName) {
        layerVariable = (
          <span>
            {" "}
            <i>{"Displaying: "}</i> {layerValue.variableName + (layerValue.unit ? " (" + layerValue.unit + ")" : "")}
          </span>
        )
      }

      let layerAvailability
      if (layerValue.start && layerValue.end) {
        layerAvailability = (
          <span>
            {" "}
            <i>{"Availability: "}</i> {layerStartTime + " - " + layerEndTime}
          </span>
        )
      }

      let layerVariableAvailability

      if (layerVariable) {
        layerVariableAvailability = (
          <span style={{ fontSize: 12 }}>
            {layerVariable}
            {layerVariable && <br />}
            {layerAvailability}
          </span>
        )
      } else {
        layerVariableAvailability = <span style={{ fontSize: 12 }}>{layerAvailability}</span>
      }

      // with the gathered information, populate and push the layer card to the layers array.
      layers.push(
        <Card key={"primary-card-" + layerIndex} variant="outlined">
          <ListItem key={"primary-item-" + layerIndex}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText id={`primary-list-label-${layerValue.layerId}`} primary={layerValue.displayName} />

            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={() => dispatch(allActions.listActions.handleToggle(layerValue.layerId))}
                checked={state.selectedLayers.indexOf(layerValue.layerId) !== -1}
                inputProps={{
                  "aria-labelledby": `switch-list-label-${layerValue.layerId}`,
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          {state.selectedLayers.indexOf(layerValue.layerId) !== -1 && layerVariableAvailability && (
            <ListItem key={"secondary-item-variable" + layerIndex}>
              <ListItemText id={`secondary-list-label-${layerValue.layerId}`} primary={layerVariableAvailability}></ListItemText>
            </ListItem>
          )}
          {state.selectedLayers.indexOf(layerValue.layerId) !== -1 && legendImage && (
            <ListItem key={"secondary-item-legend" + layerIndex}>
              <ListItemText id={`secondary-list-label-${layerValue.layerId}`}>{legendImage}</ListItemText>
            </ListItem>
          )}
        </Card>
      )
    }

    let expanded = false
    if (itemIndex === 0) {
      expanded = true
    }

    dates.push(
      <Accordion key={"panel" + itemIndex} defaultExpanded={expanded}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" key={"summary-panel" + itemIndex}>
          <div style={{ width: "100%" }}>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <Box p={1}>
                <MdDateRange /> {layerItems.date}
              </Box>
            </Box>
          </div>
        </AccordionSummary>
        <AccordionDetails key={"details-panel" + itemIndex}>
          <List key={itemIndex} className={classes.root}>
            {layers}
          </List>
        </AccordionDetails>
      </Accordion>
    )
  }

  return dates
}

const lightningImageViewerChangeHandler = (e) =>{
  imageToggle = !imageToggle;
  if(imageToggle){
    geoJson.fieldCampaignImages.forEach((element)=>{
      var pinBuilder = new PinBuilder();
      //pinBuilder.fromMakiIconId("hospital", Color.RED, 48),
      viewer.entities.add({
        position : Cartesian3.fromDegrees(element.coordinates[0], element.coordinates[1]),
        name: "imageViewer-" + element.id,
        billboard : {
          image : pinBuilder.fromMakiIconId('star', Color.GREEN, 48),
          width : 32,
          height : 32,
        },
        label : {
          // text: element.id.toString(),
          font : '14pt monospace',
          style: LabelStyle.FILL_AND_OUTLINE,
          outlineWidth : 2,
          verticalOrigin : VerticalOrigin.TOP,
          pixelOffset : new Cartesian2(1, 32)
        }
      });
    })
    console.log(viewer.entities)
  }else{
    viewer.entities.removeAll();
  }
}
