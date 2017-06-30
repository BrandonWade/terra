import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './app';
import card from './reducers/card';
import './app.css';

const images = JSON.parse(window.images).data.children;
const initialState = {
  currentImage: '',
  images: images || [],
}

const store = createStore(card, initialState);

ReactDOM.render(
  <Provider store={ store }>
    <App store={ store } />
  </Provider>,
  document.getElementById('root')
);
