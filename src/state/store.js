import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk';
import { rootReducer, initialState } from "./reducers"
import { cloneDeep } from 'lodash'

const store = createStore(rootReducer,
    applyMiddleware(thunk),
// cloneDeep(initialState),
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store