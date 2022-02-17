import { selectedLayers, layerStatus } from "./listReducer"
import { combineReducers } from "redux"
import { cloneDeep } from 'lodash'

const initialState = {
  selectedLayers: ["2017-05-17-abi-13", "2017-05-17-track15", "2017-05-17-glm", "2017-05-17-isslis", "2017-05-17-crs", "2017-05-17-fegs", "2017-05-17-lip"],
  layerStatus:{
    inProgress: [],
    loaded: []
  }
}

const appReducer = combineReducers({
  selectedLayers,
  layerStatus,
})

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE"){
    return cloneDeep(initialState)
  }
  
  return appReducer(state, action)

}

export default rootReducer
export { rootReducer, initialState }
