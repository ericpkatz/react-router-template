import axios from 'axios';

let _productsPromise;

const getProducts = ()=> {
  if(!_productsPromise){
    _productsPromise = axios.get('/api/products')
    .then( response => response.data );
  }
  return _productsPromise;
};

export default {
  getProducts
};
