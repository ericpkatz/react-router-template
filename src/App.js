import React, { Component } from 'react';
import { Link } from 'react-router';
import ProductService from './services/ProductService';

const _App = ({ children, numberOfProducts })=> (
  <div className='container'>
    <h1>React Redux Template</h1>
    <div className='container'>
    <Link to='/'>Home</Link>
    { ' | ' }
    <Link to='/products'>Products ({ numberOfProducts})</Link>
    </div>
    { children }
  </div> 
);

class App extends Component{
  constructor(){
    super();
    this.state = { numberOfProducts: 0 };
  }
  componentDidMount(){
    ProductService.getProducts()
      .then( products => this.setState({ numberOfProducts: products.length }));

  }
  render(){
    const { numberOfProducts } = this.state;
    return (
      <_App numberOfProducts={ numberOfProducts}>{ this.props.children }</_App>
    );
  }
}

export default App;
