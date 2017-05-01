import React, { Component } from 'react';
import { Link } from 'react-router';
import AuthService from '../services/AuthService';
import PubSubService from '../services/PubSubService';


const _Settings = ({ name, password, onChange, error, updateUser, success } )=> {
  return (
    <form className='well' onSubmit={ updateUser }>
      {
        error ? (
          <div className='alert alert-warning'>Error? Is this name taken?</div>
        ): (null)
      }
      {
        success ? (
          <div className='alert alert-success'>Success!</div>
        ): (null)
      }
      <div className='form-group'>
        <input value={ name } className='form-control' name='name' onChange={ onChange }/>
      </div>
      <div className='form-group'>
        <input value={ password } className='form-control' name='password' onChange={ onChange }/>
      </div>
      <button className='btn btn-primary' disabled={ !name || !password}>Update Settings</button>
    </form>
  );
};

class Settings extends Component{
  constructor(){
    super();
    this.state = { name: '', password: '', error: null, success: null };
    this.onChange = this.onChange.bind(this);
    this.updateUser = this.updateUser.bind(this); 
  }
  onChange(ev){
    let change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  updateUser(ev){
    ev.preventDefault();
    AuthService.updateUser({ name: this.state.name, password: this.state.password })
      .then( ()=> this.setState({ success: true, error: null }))
      .catch((er)=> this.setState({ error: 'error', success: null }));
  }
  componentDidMount(){
    AuthService.exchangeTokenForUser()
      .then( user => this.setState({ name: user.name, password: user.password }));

  }
  render(){
    const { name, password, error, success } = this.state;
    return (
      <_Settings error={ error } name={ name } success={ success} password={ password } onChange={ this.onChange } updateUser={ this.updateUser }></_Settings>
    );
  }
}

export default Settings;

