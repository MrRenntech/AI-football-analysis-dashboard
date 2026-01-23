// app/_stores/someSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const someSlice = createSlice({
  name: "some",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = someSlice.actions;

export default someSlice.reducer;
