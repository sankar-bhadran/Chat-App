import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../lib/redux/chatSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

// Infer the correct dispatch type
export type AppDispatch = typeof store.dispatch;

//  If needed, infer the entire store type
export type AppState = ReturnType<typeof store.getState>;
