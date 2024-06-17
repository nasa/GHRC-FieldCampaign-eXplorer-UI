import { toast } from 'react-toastify';

import APICall from "../../../constants/ApiCall";
import { histogramToolApiUrl, histogramToolApikey } from "../../../config";

import { dataExtractorFEGS } from "../helper/handleFEGSdata";
import { dataExtractorLIP } from "../helper/handleLIPdata";
import { dataExtractorCRS, dataExtractorCRSparams } from "../helper/handleCRSdata";
import { dataExtractorCPL, dataExtractorCPLparams } from "../helper/handleCPLdata";

const apiCaller = new APICall();
apiCaller.setHeader(histogramToolApikey);

export const Post = Resources => {
  /**
   * API POST CALL, in the "redux-thunk" way.
   * The dispatch is done automatically, when Post call is resolved.
   * i.e. as per the Async actions mentioned in the resource.
   *
   * Usage:
   * Use these functions as a map_reducer_to_props in redux connect first,
   * Then, simply use these functions in the component (accessible though props).
  **/
  const {init, success, error, paramLoaded} = Resources.asyncActions; // as actions for all the resource is same
  const {instrument_type, data_type} = Resources.body.data.attributes; 
  return async (dispatch, getState) => {
    // starting toast notification
    if (!data_type) {
      handleInitParams(null, instrument_type);
    } else {
      handleInit(null, instrument_type);
    }
    return apiCaller.post(histogramToolApiUrl, Resources.body)
      .then(res => {
        if (!data_type) {
          // the API req is for paramList
          let extractedData = dataExtractorParams(res, instrument_type);
          if (extractedData.error) {
            handleError(400, "Something went wrong.")
          } else {
            handleSuccess(res.status);
          }
          return dispatch(paramLoadedDispatchAction(paramLoaded, extractedData));
        }
        // Else, now preprocess according to type of instrument and then dispatch the success action
        let extractedData = dataExtractorInstrument(res, instrument_type);
        handleSuccess(res.status);
        dispatch(successDispatchAction(success, extractedData));
        return extractedData;
      })
      .catch(err => {
        handleError(400, "Something went wrong. Call Support.");
        dispatch(errorDispatchAction(error, err));
        return err;
      });
  };
};

export const Reset = Resources => {
  const {init} = Resources.asyncActions; // as actions for all the resource is same
  return async (dispatch, getState) => {
    dispatch(initDispatchAction(init, undefined));
  };
};

// @utils

// dispatch actions
const initDispatchAction = (type, payload) => ({type, payload});
const successDispatchAction = (type, payload) => ({type, payload});
const errorDispatchAction = (type, payload) => ({type, payload});
const paramLoadedDispatchAction = (type, payload) => ({type, payload});

// data_extractor instrument data
function dataExtractorInstrument(res, instrument_type) {
  switch(instrument_type) {
    case "FEGS":
        return dataExtractorFEGS(res);
    case "LIP":
        return dataExtractorLIP(res);
    case "CRS":
        return dataExtractorCRS(res);
    case "CPL":
        return dataExtractorCPL(res);
    default:
        return dataExtractorFEGS(res);
  }
}

// data_extractor params
function dataExtractorParams(res, instrument_type) {
  switch(instrument_type) {
    case "CRS":
        return dataExtractorCRSparams(res);
    case "CPL":
        return dataExtractorCPLparams(res);
    default:
        return dataExtractorCRSparams(res);
  }
}

// Toast notifications

const handleInit = (status, instrument) => {
  toast.success(`Fetching ${instrument} data for Histogram.`, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}

const handleInitParams = (status, instrument) => {
  toast.success(`Fetching ${instrument} data params (z-axis) for Histogram.`, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}

const handleSuccess = (status) => {
  if (200 <= status < 300) {
    toast.success('Fetching Complete.', {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
}

const handleError = (status, body) => {
  toast.error(body, {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}
