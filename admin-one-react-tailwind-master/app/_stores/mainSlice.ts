import { createSlice } from "@reduxjs/toolkit";

interface MainState {
  userName: string;
}

const initialState: MainState = {
  userName: "Guest",
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload;
    },
  },
});

export const { setUserName } = mainSlice.actions;
export default mainSlice.reducer;
