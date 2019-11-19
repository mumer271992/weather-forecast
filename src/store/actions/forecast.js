import axios from 'axios';

import actiontypes from '../../helpers/actiontypes';

export const saveForecast = (forecast, unit) => {
  return {
    type: actiontypes.SAVE,
    forecast,
    unit,
  }
}

export const startLoading = () => {
  return {
    type: actiontypes.STARTLOADING,
  }
}

export const stopLoading = () => {
  return {
    type: actiontypes.STOPLOADING,
  }
}

export const selectIndex = (index) => {
  return {
    type: actiontypes.SELECTINDEX,
    selectedIndex: index,
  }
}

export const fetchForecast = (unit) => {
  return (dispatch) => {
    dispatch(startLoading());
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&units=${unit}&APPID=${process.env.REACT_APP_OPEN_WEATHER_API_ID}&cnt=40`)
      .then(function (response) {
        // handle success
        const arr = mapData(response)
        dispatch(saveForecast(arr, unit));
        dispatch(stopLoading());
      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
        dispatch(stopLoading());
      });
  }
}

const mapData = (response) => {
  const list = response && response.data && response.data.list ? response.data.list : [];
  let map = {};let arr = [];
  list.forEach((item) => {
    let date;let group;
    if (item && item.dt_txt) {
      date = item.dt_txt.split(' ');
    }
    if (date && date.length > 0) {
      group = map[date[0]];
      if (!group) {
        group = [];
      }
      group.push(item);
      map[date[0]] = group;
    }
  });
  let keys = Object.keys(map);
  keys.forEach((key) => {
    let list = map[key];
    let tempOfDay = {}; let temperature = 0;
    list.forEach((item) => {
      temperature = temperature + item.main.temp;
    });
    tempOfDay = {
      avgTemp: temperature / list.length,
      date: key,
      data: list,
    }
    arr.push(tempOfDay);
  });
  return arr;
}
