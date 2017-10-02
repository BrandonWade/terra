import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './app';
import './app.css';

const initialState = {
  currentImage: '',
  images: window.images || [],
  modalVisible: false,
};

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
