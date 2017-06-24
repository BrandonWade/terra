import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { viewImage, setImage, deleteImage } from './actions/card';
import Card from './components/card/card';
import card from './reducers/card';
import './app.css';

const initialState = {
  currentImage: '',
  images: [{}, {}, {}, {}, {}, {}],
}
const store = createStore(card, initialState);

const App = () => (
  <div id={ 'container' }>
    {
      store.getState().images.map((card, index) => {
        return (
          <Card key={ index }
                viewImage={ () => store.dispatch(viewImage(index)) }
                setImage={ () => store.dispatch(setImage(index)) }
                deleteImage={ () => store.dispatch(deleteImage(index)) } />
        );
      })
    }
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
