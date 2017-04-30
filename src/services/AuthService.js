import axios from 'axios';


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
    .catch((er)=> {
      localStorage.removeItem('token');
      throw er;
    });
};

const logout = ()=> {
  localStorage.removeItem('token');
  return Promise.resolve();
}

export default {
  attemptLogin,
  exchangeTokenForUser,
  logout
};
