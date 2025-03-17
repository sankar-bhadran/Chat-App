import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiverId: "",
  onlineUsers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setReceiverId: (state, action) => {
      state.receiverId = action.payload;
    },
    setOnlineUsers: (state, action) => {
      console.log("action", action.payload);
      state.onlineUsers = action.payload; // Update online users state
    },
  },
});

export const { setReceiverId, setOnlineUsers } = chatSlice.actions;
export default chatSlice.reducer;
