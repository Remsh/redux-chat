import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import ChatExampleData from './api/ChatExampleData.js'

import { getRawMessages, getThreads, getOrderedThreads, receiveAllMessages, getThreadMessages, receiveCurrentID } from './actions'
import App from './containers/App'
require("./css/chatapp.css");

ChatExampleData.init(); 

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger() ]

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

store.dispatch(getRawMessages());
store.dispatch(getThreads());
store.dispatch(getOrderedThreads());
store.dispatch(receiveCurrentID());
store.dispatch(receiveAllMessages());
store.dispatch(getThreadMessages());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)