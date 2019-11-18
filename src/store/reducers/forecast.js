import actionTypes from '../../helpers/actiontypes';
// Fahrenheit use units=imperial
// Celsius use units=metric

const defaultState = {
  loading: false,
  temperatureUnit: 'metric',
  forecast: [],
  selectedIndex: 0,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SAVE: {
      const newState = {
        ...state,
        forecast: [...action.forecast],
        temperatureUnit: action.unit,
      };
      return newState;
    }
    case actionTypes.STARTLOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.STOPLOADING: {
      return {
        ...state,
        loading: false,
      }
    }
    case actionTypes.SELECTINDEX: {
      return {
        ...state,
        selectedIndex: action.selectedIndex,
      }
    }
    default:
      return state;
  }
};
