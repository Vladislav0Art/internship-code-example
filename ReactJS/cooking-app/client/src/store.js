
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reduces/index';

const initialState = {};

const middlewares = [thunk];


const store = createStore(
  rootReducer, 
  initialState,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
  );

export default store;