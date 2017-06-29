import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './app';
import card from './reducers/card';
import './app.css';

const initialState = {
  currentImage: '',
  images: [{ i:0 }, { i:1 }, { i:2 }, { i:3 }, { i:4 }, { i:5 }],
}

const store = createStore(card, initialState);

ReactDOM.render(
  <Provider store={ store }>
    <App store={ store } />
  </Provider>,
  document.getElementById('root')
);
