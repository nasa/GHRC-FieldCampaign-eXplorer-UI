import React from "react"
import ReactDOM from "react-dom"
import { Ion } from "cesium"
import App from "./components/app"
import { Provider } from "react-redux"
import store from "./state/store"
import { cesiumDefaultAccessToken } from "./config"
import { createBrowserHistory } from "history"
import "./css/index.css"

/*
  Useful link(s): 
  https://skryvets.com/blog/2018/09/20/an-elegant-solution-of-deploying-react-app-into-a-subdirectory/
*/
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
})

Ion.defaultAccessToken = cesiumDefaultAccessToken

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
