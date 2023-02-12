import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  coins: 500,
};

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      state.coins += action.payload;
    },
    deduct: (state, action: PayloadAction<number>) => {
      state.coins -= action.payload;
    },
  },
});

export const {add, deduct} = coinSlice.actions;
export default coinSlice.reducer;
