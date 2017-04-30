import React, { Component } from 'react';
import ProductService from '../services/ProductService';

const _ProductsPage = ({ products })=> (
  <div className='well'>
    <ul className='list-group'>
      {
        products.map( product => {
          return (
            <li className='list-group-item' key={ product.id}>{ product.name }</li>
          );
        })
      }
    </ul>
  </div>
);

class ProductsPage extends Component{
  constructor(){
    super();
    this.state = { products: []};
  }
  componentDidMount(){
    ProductService.getProducts()
      .then( products => {
        this.setState({ products });
      });

  }
  render(){
    const { products } = this.state;
    return (
      <_ProductsPage products={ products }></_ProductsPage>
    );
  }
}



export default ProductsPage;

