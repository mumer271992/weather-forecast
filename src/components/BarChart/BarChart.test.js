import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import BarChartHOC from './BarChartHOC';
import { list } from '../../helpers/mockedData';

const mockStore = configureStore();


function mountSetup() {
  const store = mockStore({
    forecast: {
      loading: false,
      temperatureUnit: 'metric',
      forecast: list,
      selectedIndex: 0,
    }
  });
  const wrapper = shallow(
    <Provider store={store}>
      <BarChartHOC />
    </Provider>
  );
  return wrapper;
}

describe('renders home without crashing', () => {
  it('should renders properly', () => {
    const wrapper = mountSetup();
    expect(wrapper.length).toEqual(1);
  });

  it('should recieve state in props', () => {
    const wrapper = mountSetup();
    expect(wrapper.props().selectedItem).not.toBeNull();
  });
});
