import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"

import Viz from "./Viz"

import { getCampaignInfo, getDefaultLayers } from "../layers/layers"
import { deepFreeze } from "../helpers/objectHelpers"
import PageNotFound from "./pageNotFound"
import { status, failure, notFoundPath } from "../constants/enum"
import { missionExists } from "../helpers/apiHelpers"

import store from "../state/store"
import allActions from "../state/actions"

const VizContainer = (props) => {
  const id = props.location.pathname.split('/').pop()
  const [validationStatus, setValidationStatus] = useState({
    status: status.pending,
    details: null
  })
  const [campaign, setCampaign] = useState({})
  
  useEffect(() => {
    if(!missionExists(props.missions, id)) return

    const campaign = getCampaignInfo(id)
    if(campaign){
      store.dispatch(
        allActions.listActions.addDefaultSelectedLayers(
            getDefaultLayers(id)
        ))
      setValidationStatus({
        status: status.success,
        details: null
      })
      deepFreeze(campaign)
      setCampaign(campaign)
    }else{
      setValidationStatus({
        status: status.failure,
        details: failure.undefined
      })
    } 
  }, [props.missions, id])

  if (!missionExists(props.missions, id)){
    return(
      <Redirect
        to={{
          pathname: notFoundPath,
          state: {
            from: props.location
          }
        }}
      />
    )
  }

  if (validationStatus.status === status.success){
    return <Viz campaign={campaign}/>
  }else if (validationStatus.status === status.failure){
    return <PageNotFound
      title={`UNDER CONSTRUCTION`}
      message={``}
      description={`We are working to bring this page to life!`}          
    />
  }else{
    return null
  }
}

export default VizContainer