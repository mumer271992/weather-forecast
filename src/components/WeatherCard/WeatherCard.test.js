import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import WeatherCardHOC from './WeatherCardHOC';
import WeatherCard from './WeatherCard';
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
      <WeatherCardHOC />
    </Provider>
  );
  return wrapper;
}

describe('renders weather card without crashing', () => {
  it('should renders properly', () => {
    const wrapper = mountSetup();
    expect(wrapper.length).toEqual(1);
  });

  it('should recieve state in props', () => {
    const wrapper = mountSetup();
    expect(wrapper.props().temperatureUnit).not.toBeNull();
    expect(wrapper.props().fetchforecast).not.toBeNull();
  });

  it('should call change handler on clicking radio button', () => {
    const spy = jest.spyOn(WeatherCard.prototype, 'handleClick').mockImplementation(jest.fn());
    const wrapper = shallow(<WeatherCard item={list[0]}/>);
    const handler = wrapper.find('.weather-card');
    handler.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
