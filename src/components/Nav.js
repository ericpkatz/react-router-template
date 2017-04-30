import React, { Component } from 'react';
import { Link } from 'react-router';
import ProductService from '../services/ProductService';
import AuthService from '../services/AuthService';


const _Nav = ({ numberOfProducts } )=> {
  return (
    <div className='container'>
      <Link to='/'>Home</Link>
      { ' | ' }
      <Link to='/products'>Products ({ numberOfProducts})</Link>
      { ' | ' }
      <Link to='/login'>Login</Link>
    </div>
  );
};

class Nav extends Component{
  constructor(){
    super();
    this.state = { numberOfProducts: 0 };
  }
  componentDidMount(){
    AuthService.exchangeTokenForUser()
      .then( user => console.log(user));

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

