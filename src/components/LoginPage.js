import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import AuthService from '../services/AuthService.js';


const Login = ({ name, password, onChange, attemptLogin, error } )=> {
  return (
    <form onSubmit={ attemptLogin }>
      {
        error ? (
          <div className='alert alert-warning'>Bad username/password</div>
        ): (null)
      }
      <div className='form-group'>
        <input value={ name } className='form-control' name='name' onChange={ onChange }/>
      </div>
      <div className='form-group'>
        <input value={ password } className='form-control' name='password' onChange={ onChange }/>
      </div>
      <button className='btn btn-primary'>Login</button>
    </form>
  );
};

class LoginPage extends Component{
  constructor(){
    super();
    this.state = { name: '', password: '' };
    this.onChange = this.onChange.bind(this);
    this.attemptLogin = this.attemptLogin.bind(this);
  }
  onChange(ev){
    let change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  attemptLogin(ev){
    ev.preventDefault();
    AuthService.attemptLogin(this.state)
      .then( () => hashHistory.push('/products'))
      .catch(()=> this.setState({ error: true }));
  }
  componentDidMount(){

  }
  render(){
    const { name, password, error } = this.state;
    return (
      <Login error={error} attemptLogin={this.attemptLogin} name={ name } password={ password } onChange={ this.onChange }></Login>
    );
  }
}

export default LoginPage;
