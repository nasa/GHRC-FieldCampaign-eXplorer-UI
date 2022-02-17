import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import { MemoryRouter } from "react-router";

import VizContainer from "./VizContainer";
import PageNotFound from "./pageNotFound";
import Header from "./Header";
import MissionsCards from "./MissionCards/MissionsCards";
import { missions } from "./MissionCards/missions.json"
import { supportEmail } from "../config"
import { basePath } from '../constants/enum'

class App extends Component {

  render() {
    return (
      <MemoryRouter>
        <Header />
        <Switch>
          <Route
            exact path={`${basePath}/:id`}
            render={(props) => {
              return <VizContainer
                missions={missions}
                {...props}
              />
            }}
          />
          <Route
            // exact path={`${basePath}`}
            path={`*`}
            render={() => <MissionsCards missions={missions}/>}
          />
          <Route
            path="*"
            status={404}
            render={() => (
              <PageNotFound
                title={`Page Not Found`}
                message={`404 Error`}
                description={`This page doesn't exists! Please check the url and try again. Please contact support team at ${supportEmail}`}
              />
            )}
          />
        </Switch>
      </MemoryRouter>
    )
  }
}

export default App
