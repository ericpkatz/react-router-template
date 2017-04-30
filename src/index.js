import React, { Component} from 'react';
import { render } from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import ProductsPage from './components/ProductsPage'; 
import LoginPage from './components/LoginPage'; 
import Home from './Home';



const root = document.getElementById('root');

const routes = (
  <Router history={ hashHistory }>
    <Route path='/' component={ App }>
      <IndexRoute component={ Home } />
      <Route path='products' component={ProductsPage} />
      <Route path='login' component={LoginPage} />
    </Route>
  </Router>
);


render(routes, root);
