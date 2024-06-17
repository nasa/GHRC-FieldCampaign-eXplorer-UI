import { subsetFilenamesListEndpoint } from "../../../config";

// Handles download list for completed subsets.

// ACTION_TYPE DEFINATOPMS
export const Resources = {
    downloadListSubsettingTool: {
        url: subsetFilenamesListEndpoint,
        body: { wsTokenId: "token-123" },
        asyncActions: {
            init: 'subsetlist_INIT',
            success: 'subsetlist_SUCCESS',
            error: 'subsetlist_ERROR',
        },
    }
  };
  
// Initial State Reference for reducers
const initialState = {
        rand12345: [
            {"name": "rand12345", "url": "https://d1q93ngquhxm63.cloudfront.net/subsets/subset-221202110051-ac6b71d6-06ed-47f7-a032-a46a3838237e/GLM/OR_GLM-L2-LCFA_G16_s20171370548000_e20171370548200_c20171370548229.nc"},
        ]
    };
  
// Reducer
export function downloadListSubsettingTool(state = initialState, action = {}) {
const {init, success, error} = Resources.downloadListSubsettingTool.asyncActions;

switch (action.type) {
    case init: {
    return {
        ...state
    };
    }

    case success: {
    let {wstokenid} = action.payload;
    const newDownloadList = action.payload.downloadList.length > 0 && action.payload.downloadList.map(url => ({
        name: url.split("/").slice(-1)[0],
        url
    }));
    return {
        ...state,
        [`${wstokenid}`]: newDownloadList
    };
    }

    case error: {
    return {...state};
    }

    default: {
    return {...state};
    }
}
}
  
// map state to props
export const mapStateToProps = state => {
const { downloadListSubsettingTool } = state;
return { downloadListSubsettingTool };
};
  
// action dispatchers

// action dispatchers

const initProgressbar = (payload) => {
    const {init} = Resources.downloadListSubsettingTool.asyncActions;
    return (dispatch, getState) => {
      dispatch({type: init, payload});
    };
  };

const updateProgressbar = (payload) => {
    const {success} = Resources.downloadListSubsettingTool.asyncActions;
    return (dispatch, getState) => {
        dispatch({type: success, payload});
    };
};

const errorProgressbar = (payload) => {
    const {error} = Resources.downloadListSubsettingTool.asyncActions;
    return (dispatch, getState) => {
        dispatch({type: error, payload});
    };
};

export const actionDispatchers = {
initProgressbar,
updateProgressbar,
errorProgressbar
};