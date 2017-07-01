import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './app';
import reducer from './reducers/index';
import './app.css';

const images = JSON.parse(window.images).data.children;
const initialState = {
  currentImage: '',
  images: images || [],
  modalVisible: false,
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={ store }>
    <App store={ store } />
  </Provider>,
  document.getElementById('root')
);
