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
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&units=${unit}&APPID=1a1c7c80e65078165ef7f68ca56ebdf0&cnt=40`)
      .then(function (response) {
        // handle success
        const arr = mapData(response)
        console.log(arr);
        dispatch(saveForecast(arr, unit));
        dispatch(stopLoading());
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        dispatch(stopLoading());
      });
  }
}

const mapData = (response) => {
  const list = response.data.list;
  let map = {};let arr = [];
  list.forEach((item) => {
    const date = item.dt_txt.split(' ');
    let group = map[date[0]];
    if (!group) {
      group = [];
    }
    group.push(item);
    map[date[0]] = group;
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
