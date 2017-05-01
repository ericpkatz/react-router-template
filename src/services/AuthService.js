import axios from 'axios';
import PubSubService from '../services/PubSubService';


let _userPromise;

const exchangeTokenForUser = ()=> {
  const token = localStorage.getItem('token');
  if(token){
    if(!_userPromise){
      _userPromise = axios.get(`/api/auth/${token}`)
        .then( response => response.data)
        .catch( er => { throw er });
    }
    return _userPromise;
  }
  else {
    return Promise.resolve();
  }

}
const attemptLogin = (credentials)=> {
  return axios.post('/api/auth', credentials)
    .then(response => response.data)
    .then(({ token })=> localStorage.setItem('token', token))
    .then(()=> exchangeTokenForUser())
    .then( user => {
      PubSubService.publish('LOGIN', user);
      return user;
    })
    .catch((er)=> {
      localStorage.removeItem('token');
      throw er;
    });
};

const updateUser = (credentials)=> {
  const token = localStorage.getItem('token');
  return axios.put(`/api/auth/${token}`, credentials)
    .then(()=> _userPromise = null)
    .then(()=> exchangeTokenForUser())
    .then( user => {
      PubSubService.publish('LOGIN', user);
      return user;
    });
};

const logout = ()=> {
  localStorage.removeItem('token');
  _userPromise = null;
  return Promise.resolve();
}

export default {
  attemptLogin,
  exchangeTokenForUser,
  logout,
  updateUser
};
