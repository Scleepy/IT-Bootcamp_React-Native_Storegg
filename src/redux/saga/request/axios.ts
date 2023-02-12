import axios from 'axios';

export const requestProduct = () => {
  return axios.get('https://fakestoreapi.com/products');
};
