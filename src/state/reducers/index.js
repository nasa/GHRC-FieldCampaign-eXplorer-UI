import reducers from "./listReducer"
import { combineReducers } from "redux"
import { cloneDeep } from 'lodash'

const initialState = {
  selectedLayers: [],
  layerStatus:{
    inProgress: [],
    selectedLayers: [],
    loaded: []
  }
}

const appReducer = combineReducers({...reducers});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE"){
    return cloneDeep(initialState)
  }
  
  return appReducer(state, action)

}

export default rootReducer
export { rootReducer, initialState }
