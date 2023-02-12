import {call, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {requestProduct} from '../request/axios';
import {getProductSuccess} from '../../reducers/products';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface ProductResponse {
  data: [];
}

function* handleGetProduct() {
  try {
    const {data: response}: AxiosResponse<ProductResponse> = yield call(
      requestProduct,
    );

    const products: Product[] = response.map((item: Product) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      description: item.description,
    }));

    yield put(getProductSuccess(products));
  } catch (err) {
    console.log(err);
  }
}

function* productSaga() {
  yield takeLatest('product/getProduct', handleGetProduct);
}

export default productSaga;
