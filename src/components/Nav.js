import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import ProductService from '../services/ProductService';
import AuthService from '../services/AuthService';
import PubSubService from '../services/PubSubService';


const _Nav = ({ numberOfProducts, user, logout } )=> {
  return (
    <div className='container'>
      <Link to='/'>Home</Link>
      { ' | ' }
      <Link to='/products'>Products ({ numberOfProducts})</Link>
      { ' | ' }
      {
        !user ? (
          <Link to='/login'>Login</Link>
        ) : (
          <span>
            <a onClick={ logout }>Logout ({ user.name })</a>
            { ' | ' }
            <Link to='/settings'>Settings</Link>
          </span>
        )
      }
    </div>
  );
};

class Nav extends Component{
  constructor(){
    super();
    this.state = { numberOfProducts: 0, user: null };
    this.logout = this.logout.bind(this);
  }
  logout(){
    AuthService.logout()
      .then( user => this.setState({ user: null }))
      .then( ()=> hashHistory.push('/'));
  }
  componentDidMount(){
    AuthService.exchangeTokenForUser()
      .then( user => this.setState({ user }));

    ProductService.getProducts()
      .then( products => this.setState({ numberOfProducts: products.length }));

    this.unsubscribe = PubSubService.subscribe({ type: 'LOGIN', fn: ( user ) => this.setState({ user }) }); 

  }
  render(){
    const { numberOfProducts, user } = this.state;
    return (
      <_Nav numberOfProducts={ numberOfProducts } user={ user } logout={ this.logout }></_Nav>
    );
  }
}

export default Nav;

