import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));
store.subscribe(() => {
    const state = store.getState();
    console.log("Store: ", state);
    // localStorage.setItem('weather', JSON.stringify(state));
});

export default store;
