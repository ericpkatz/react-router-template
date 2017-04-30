import React, { Component } from 'react';
import { Link } from 'react-router';
import ProductService from '../services/ProductService';


const _Nav = ({ numberOfProducts } )=> {
  return (
    <div className='container'>
      <Link to='/'>Home</Link>
      { ' | ' }
      <Link to='/products'>Products ({ numberOfProducts})</Link>
    </div>
  );
};

class Nav extends Component{
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
      <_Nav numberOfProducts={ numberOfProducts}></_Nav>
    );
  }
}

export default Nav;

