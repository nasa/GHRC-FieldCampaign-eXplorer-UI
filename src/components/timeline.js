import React from "react"
import { useSelector } from "react-redux"
import moment from "moment"
import { getLayer } from "../helpers/utils"
import Timeline from "../customized-components/react-timeline-9000/src/timeline"
import "../customized-components/react-timeline-9000/src/style.css"

//https://github.com/BHP-DevHub/react-timeline-9000
//https://codesandbox.io/s/op9tg

const { TIMELINE_MODES } = Timeline

function FcxTimeline({ campaign }) {
  const state = useSelector((state) => state)

  let layerDate
  let startDate
  let endDate

  let selectedItems = []
  let timelineMode = TIMELINE_MODES.SELECT | TIMELINE_MODES.DRAG | TIMELINE_MODES.RESIZE

  const list = []
  const groups = []
  const snap = 1
  let rowIndex = 0

  groups.push({ id: rowIndex, title: `` })

  for (const [selectedLayerIndex, selectedLayerValue] of state.selectedLayers.entries()) {
    let layer = getLayer(selectedLayerValue, campaign)

    if (!layerDate || layerDate !== layer.date) {
      let layerDate = layer.date
      const viewerStart = `${layerDate}T00:00:00Z`
      const viewerEnd = `${layerDate}T23:59:59Z`
      startDate = moment.utc(viewerStart)
      endDate = moment.utc(viewerEnd)
    }

    let color = "red"
    let start = moment.utc(layer.start)
    let end = moment.utc(layer.end)

    // Round to the nearest snap distance
    const roundedStartMinutes = Math.floor(start.minute() / snap) * snap
    const roundedEndMinutes = Math.floor(end.minute() / snap) * snap
    start.minute(roundedStartMinutes).second(0)
    end.minute(roundedEndMinutes).second(0)

    if (layer.type === "track") {
      color = campaign.legends["track"].color
    } else {
      color = campaign.legends[layer.shortName].color
    }

    list.push({
      key: `timelineItem${selectedLayerIndex}`,
      title: layer.displayName,
      color: color,
      row: rowIndex,
      start: start,
      end: end,
    })
  }

  const rowLayers = []
  for (let i = 0; i < list.length; i += 1) {
    let curDate = startDate.clone()
    rowLayers.push({
      start: curDate.clone(),
      end: curDate.clone().add(0, "days"),
      style: { backgroundColor: "red", opacity: "0.3" },
      rowNumber: i,
    })
  }

  let handleItemClick = (e, key) => {}
  let handleItemDoubleClick = (e, key) => {}
  let handleItemContextClick = (e, key) => {}
  let handleRowDoubleClick = (e, rowNumber, clickedTime, snappedClickedTime) => {}
  let handleRowContextClick = (e, rowNumber, clickedTime, snappedClickedTime) => {}
  let handleInteraction = (type, changes, items) => {}
  let handleRowClick = (e, rowNumber, clickedTime, snappedClickedTime) => {}

  return (
    <Timeline
      shallowUpdateCheck
      items={list}
      groups={groups}
      startDate={startDate}
      endDate={endDate}
      rowLayers={rowLayers}
      selectedItems={selectedItems}
      timelineMode={timelineMode}
      snapMinutes={snap}
      onItemClick={handleItemClick}
      onItemDoubleClick={handleItemDoubleClick}
      onItemContextClick={handleItemContextClick}
      onInteraction={handleInteraction}
      onRowClick={handleRowClick}
      onRowContextClick={handleRowContextClick}
      onRowDoubleClick={handleRowDoubleClick}
    />
  )
}

export default FcxTimeline
