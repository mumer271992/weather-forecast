import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import App from './App';
import { italic } from 'ansi-colors';

const mockStore = configureStore();
const list = [
  {
    avgTemp: 32,
    date: '2019-11-18',
    data: [],
  },
  {
    avgTemp: 32,
    date: '2019-11-19',
    data: [],
  },
  {
    avgTemp: 32,
    date: '2019-11-20',
    data: [],
  },
  {
    avgTemp: 32,
    date: '2019-11-21',
    data: [],
  },
  {
    avgTemp: 32,
    date: '2019-11-22',
    data: [],
  }
];

function shallowSetup() {
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
      <App />
    </Provider>
  );
  return wrapper;
}

describe('renders app without crashing', () => {
  it('App renders properly', () => {
    const wrapper = shallowSetup();
    expect(wrapper.length).toEqual(1);
  });
});
