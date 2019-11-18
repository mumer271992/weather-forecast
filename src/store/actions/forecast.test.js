import { saveForecast, startLoading, stopLoading, selectIndex } from './forecast';
import actionTypes from '../../helpers/actiontypes';
import { list } from '../../helpers/mockedData';

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
  // TODO: test async action creators
});