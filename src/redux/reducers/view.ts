import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isFlatList: true,
};

const flatViewSlice = createSlice({
  name: 'isFlatList',
  initialState,
  reducers: {
    toggleList: state => {
      if (state.isFlatList === false) {
        state.isFlatList = true;
      } else {
        state.isFlatList = false;
      }
    },
  },
});

export const {toggleList} = flatViewSlice.actions;
export default flatViewSlice.reducer;
