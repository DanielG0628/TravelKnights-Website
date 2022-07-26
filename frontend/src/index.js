import React from 'react';
import ReactDom from 'react-dom/client';
import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './App';

const store = configureStore({ reducer: reducers, thunk: thunk });
const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
