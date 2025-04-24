import { createSlice } from "@reduxjs/toolkit";

interface DarkModeState {
  isEnabled: boolean;
}

const initialState: DarkModeState = {
  isEnabled: false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isEnabled = !state.isEnabled;
    },
    setDarkMode(state, action) {
      state.isEnabled = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
