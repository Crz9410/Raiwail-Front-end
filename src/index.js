import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import App from './App';
import axios from 'axios';

// axios.defaults.baseURL= 'http://localhost:3001';
// axios.defaults.baseURL= 'https://railwayback-production.up.railway.app/';
// axios.defaults.baseURL= 'https://api.spoonacular.com/recipes';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
