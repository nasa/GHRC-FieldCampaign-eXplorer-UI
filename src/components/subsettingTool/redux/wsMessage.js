// Handles websocket message for progress bar.

// ACTION_TYPE DEFINATOPMS
export const Resources = {
    progressbarSubsettingTool: {
      asyncActions: {
        init: 'progressbar_INIT',
        success: 'progressbar_SUCCESS',
        error: 'progressbar_ERROR',
      },
    }
  };
  
// Initial State Reference for reducers
const initialState = {
        rand12345: [
            {"wstokenid": "rand12345", "message": "subsetting FEGS done.", "fegs": "false"},
            {"wstokenid": "rand12345", "message": "subsetting LIS done.", "lis": "false"},
            {"wstokenid": "rand12345", "message": "subsetting GLM done.", "glm": "false"},
            {"wstokenid": "rand12345", "message": "subsetting LIP done.", "lip": "false"},
            {"wstokenid": "rand12345", "message": "subsetting LMA done.", "lma": "false"}
        ]
    };
  
// Reducer
export function progressbarSubsettingTool(state = initialState, action = {}) {
const {init, success, error} = Resources.progressbarSubsettingTool.asyncActions;

switch (action.type) {
    case init: {
    return {
        ...state
    };
    }

    case success: {
    const { wstokenid } = action.payload;
    return {
        ...state,
        [`${wstokenid}`]: state[`${wstokenid}`] ? [...state[`${wstokenid}`], action.payload] : [action.payload]
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
const { progressbarSubsettingTool } = state;
return { progressbarSubsettingTool };
};
  
// action dispatchers
  
const initProgressbar = (payload) => {
  const {init} = Resources.progressbarSubsettingTool.asyncActions;
  return (dispatch, getState) => {
    dispatch({type: init, payload});
  };
};

const updateProgressbar = (payload) => {
  const {success} = Resources.progressbarSubsettingTool.asyncActions;
  return (dispatch, getState) => {
    dispatch({type: success, payload});
  };
};

const errorProgressbar = (payload) => {
  const {error} = Resources.progressbarSubsettingTool.asyncActions;
  return (dispatch, getState) => {
    dispatch({type: error, payload});
  };
};

export const actionDispatchers = {
  initProgressbar,
  updateProgressbar,
  errorProgressbar
};
  