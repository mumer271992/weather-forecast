import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import HomeHOC from './HomeHOC';
import Home from './Home';
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
      <HomeHOC />
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
    expect(wrapper.props().forecast).not.toBeNull();
    expect(wrapper.props().temperatureUnit).not.toBeNull();
    expect(wrapper.props().fetchforecast).not.toBeNull();
  });

  it('should call change handler on clicking radio button', () => {
    const spy = jest.spyOn(Home.prototype, 'onChangeHandler');
    const wrapper = shallow(<Home fetchforecast={jest.fn()} />);
    const handler = wrapper.find('[data-test="radio-group"]');
    handler.simulate('change', {
      target: {
        name: 'position',
        value: 'imperial'
      }
    });
    expect(spy).toHaveBeenCalled();
  });
});
