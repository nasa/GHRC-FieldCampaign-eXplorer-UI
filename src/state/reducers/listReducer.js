// New way of writing reducers with the component itself,
// and importing it here
import {onTriggeredSubsettingTool} from "../../components/subsettingTool/redux";
import {progressbarSubsettingTool} from "../../components/subsettingTool/redux/wsMessage";
import {downloadListSubsettingTool} from "../../components/subsettingTool/redux/subsetDownloadList";
import { histogramTool } from "../../components/instrumentsHistogram/redux";

// Old way of writing the reducers in one place
const selectedLayers = (state = ["a"], action) => {
  if (action.type === "ADD_DEFAULT_SELECTED_LAYERS"){
    return [...action.defaultSelectedLayers]
  }

  if (action.type === "HANDLE_TOGGLE") {
    if (!state.some(ele => ele === action.layerId)) {
      return [...state, action.layerId]
    } else {
      return state.filter((id) => {
        return id !== action.layerId
      })
    }
  } else if (action.type === "REMOVE_LAYER_BY_DATE") {
    return state.filter((id) => {
      return id.indexOf(action.date) === -1
    })
  }
  return state
}

const layerStatus = (state = { inProgress: [], loaded: [] }, action) => {
  if (action.type === "MARK_LOADING") {
    return { inProgress: [...state.inProgress, action.layerId], loaded: [...state.loaded] }
  }

  if (action.type === "MARK_LOADED") {
    return {
      inProgress: state.inProgress.filter((id) => {
        return id !== action.layerId
      }),
      loaded: state.loaded.some(ele => ele === action.layerId) ?
        [...state.loaded] :
        [...state.loaded, action.layerId],
    }
  }
  
  if (action.type === "MARK_UNLOADED") {
    return {
      inProgress: [...state.inProgress],
      loaded: state.loaded.filter((id) => {
        return id !== action.layerId
      }),
    }
  }
  return state
}

const allReducers =  { selectedLayers, layerStatus, onTriggeredSubsettingTool, progressbarSubsettingTool, downloadListSubsettingTool, histogramTool }

export default allReducers;