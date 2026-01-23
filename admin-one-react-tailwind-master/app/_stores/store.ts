import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./mainSlice";
import darkModeReducer from "./darkModeSlice"; // ✅ NEW

export const store = configureStore({
  reducer: {
    main: mainReducer,
    darkMode: darkModeReducer, // ✅ NEW
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
