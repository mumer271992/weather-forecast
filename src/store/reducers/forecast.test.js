import reducer from './forecast';
import { list, unit } from '../../helpers/mockedData';
import actiontypes from '../../helpers/actiontypes';

describe('forecast reducer', () => {
  const initialState = {
    loading: false,
    temperatureUnit: 'metric',
    forecast: [],
    selectedIndex: 0,
  }
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      temperatureUnit: 'metric',
      forecast: [],
      selectedIndex: 0,
      });
  });

  it('should handle save forecast list', () => {
    const expectedState = {...initialState, forecast: list};
    expect(
      reducer(initialState, {
        type: actiontypes.SAVE,
        forecast: list,
        unit,
      })
    ).toEqual(expectedState);
  });

  it('should handle start loading state change', () => {
    const expectedState = {...initialState, loading: true};
    expect(
      reducer(initialState, {
        type: actiontypes.STARTLOADING,
      })
    ).toEqual(expectedState);
  });

  it('should handle stop loading state change', () => {
    const expectedState = {...initialState, loading: false};
    expect(
      reducer(initialState, {
        type: actiontypes.STOPLOADING,
      })
    ).toEqual(expectedState);
  });

  it('should handle select weather card', () => {
    const expectedState = {...initialState, selectedIndex: 2};
    expect(
      reducer(initialState, {
        type: actiontypes.SELECTINDEX,
        selectedIndex: 2,
      })
    ).toEqual(expectedState);
  });
});