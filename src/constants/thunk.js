import APICall from "./ApiCall";
import { subsettingApiKey } from "../config";
import { toast } from 'react-toastify';
import Jsona from 'jsona';

const dataFormatter = new Jsona();
const apiCaller = new APICall();
apiCaller.setHeader(subsettingApiKey);

/**
 * API CALLING functions (GET, POST), which follows the "redux-thunk" way.
 * The dispatch is done automatically by the functions,
 * i.e. according to the Async actions mentioned in the resource.
 *
 * Usage:
 * Use these functions as a map_reducer_to_props in redux connect first,
 * Then, simply use these functions in the component (accessible though props).
 *
 * This Enables "Clean API calls and Async actions handling in React Component
 *
 * Note:
 * Redux actions are automatically dispatched according to the response of API calls.
 * The Actions needed to be dispatch are expected as an asyncActions in Resources.
 * About the reducers that gets called when a action is dispatched, it should be combined using "combineCreducer".
 * (ref. redux of subsettingTool for usage)
 * */

export const Get = Resources => {
  const {init, success, error} = Resources.asyncActions; // as actions for all the resource is same
  return async (dispatch, getState) => {
    dispatch(initDispatchAction(init, undefined));
    return apiCaller.get(Resources.url)
      .then(res => {
        let jsonApiSpecificationData = res.data;
        let deserializedData = dataFormatter.deserialize(jsonApiSpecificationData);
        handleSuccess(res.status, deserializedData);
        dispatch(successDispatchAction(success, deserializedData));
        return deserializedData;
      })
      .catch(err => {
        handleError(err.status, "Something went wrong. Contact Support.");
        dispatch(errorDispatchAction(error, err));
        return err;
      });
  };
};

export const Post = Resources => {
  const {init, success, error} = Resources.asyncActions; // as actions for all the resource is same
  return async (dispatch, getState) => {
    dispatch(initDispatchAction(init, undefined));
    return apiCaller.post(Resources.url, Resources.body)
      .then(res => {
        let jsonApiSpecificationData = res.data;
        let deserializedData = dataFormatter.deserialize(jsonApiSpecificationData);
        handleSuccess(res.status, deserializedData);
        dispatch(successDispatchAction(success, deserializedData));
        return deserializedData;
      })
      .catch(err => {
        handleError(400, "Something went wrong. Contact Support.");
        dispatch(errorDispatchAction(error, err));
        return err;
      });
  };
};

// @utils

const initDispatchAction = (type, payload) => ({type, payload});
const successDispatchAction = (type, payload) => ({type, payload});
const errorDispatchAction = (type, payload) => ({type, payload});

const handleSuccess = (status, body) => {
  if (200 <= status < 300) {
    toast.success('Subsetting invocation successful. It will take some time to finish subsetting. Please look inside subsets tab.', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  //TODO: add cases for 400, 500, 300, 100 status codes.
}

const handleError = (status, body) => {
  toast.error(body, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}
