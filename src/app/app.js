import React from 'react';
import ReactDOM from 'react-dom';
import Card from './components/card/card'
import './app.css';

const cards = [
    {},
    {},
    {},
    {},
];

const App = () => (
  <div id={ 'container' }>
    {
      cards.map(card => {
        return <Card />;
      })
    }
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
