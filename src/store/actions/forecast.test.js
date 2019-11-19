import { fetchForecast, saveForecast, startLoading, stopLoading, selectIndex } from './forecast';
import actionTypes from '../../helpers/actiontypes';
import { list } from '../../helpers/mockedData';
import axios from 'axios';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actiontypes from '../../helpers/actiontypes';


describe('actions creators should return proper actions', () => {
  it('should return save forecase action', () => {
    const unit = 'metric';
    const expectedAction = {
      type: actionTypes.SAVE,
      forecast: list,
      unit,
    }
    expect(saveForecast(list, unit)).toEqual(expectedAction);
  });
  it('should return start loading action', () => {
    const expectedAction = {
      type: actionTypes.STARTLOADING,
    }
    expect(startLoading()).toEqual(expectedAction);
  });
  it('should return stop loading action', () => {
    const expectedAction = { 
      type: actionTypes.STOPLOADING,
    }
    expect(stopLoading()).toEqual(expectedAction);
  });
  it('should return select weather card action', () => {
    const expectedAction = {
      type: actionTypes.SELECTINDEX,
      selectedIndex: 1,
    }
    expect(selectIndex(1)).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('it dispaatched fetch forecast action which will send api call to open weather', () => {
    const payload = {
      list,
    };
    moxios.wait(() => {
      const request = moxios.requests.at(0);
      request.respondWith({
        status: 200,
        response: payload,
      });
    });

    const expectedActions = [actionTypes.STARTLOADING, actionTypes.SAVE, actionTypes.STOPLOADING];
    // configure Mock store
    const defaultState = {
      loading: false,
      temperatureUnit: 'metric',
      forecast: [],
      selectedIndex: 0,
    };
    const store = mockStore(defaultState);
    
    // call the getBucketLists async action creator
    return store.dispatch(fetchForecast('metric')).then(() => {
      const dispatchedActions = store.getActions();
      const calledActionTypes = dispatchedActions.map(action => action.type);
      expect(calledActionTypes).toEqual(expectedActions);
    },
    );
  });
});