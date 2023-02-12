import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Product {
  price: number;
  id: number;
  image: string;
  title: string;
  description: string;
}

interface initialInterface {
  myProducts: Product[];
  currentId: number;
}

const initialState: initialInterface = {
  myProducts: [],
  currentId: 0,
};

const myProductSlice = createSlice({
  name: 'myProduct',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.currentId += 1;
      state.myProducts = [...state.myProducts, action.payload];
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      state.myProducts = state.myProducts.filter(
        product => product.id !== action.payload.id,
      );
    },
  },
});

export const {addProduct, removeProduct} = myProductSlice.actions;
export default myProductSlice.reducer;
