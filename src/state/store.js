import { createStore } from "redux"
import { rootReducer, initialState } from "./reducers"
import { cloneDeep } from 'lodash'

const store = createStore(rootReducer, cloneDeep(initialState), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
