import {createSlice} from '@reduxjs/toolkit';

interface Product {
  price: number;
  id: string;
  image: string;
  url: string;
  title: string;
  category: string;
  description: string;
}

interface initialInterface {
  products: Product[];
  isLoading: boolean;
}

const initialState: initialInterface = {
  products: [],
  isLoading: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProduct: state => {
      state.isLoading = true;
    },
    getProductSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    getProductError: state => {
      state.isLoading = false;
    },
  },
});

export const {getProduct, getProductSuccess, getProductError} =
  productSlice.actions;
export default productSlice.reducer;
