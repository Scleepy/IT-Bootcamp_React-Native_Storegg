import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getProduct} from './reducers/products';
import {RootState} from './storeConfig';

export const useProductData = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return {products};
};
