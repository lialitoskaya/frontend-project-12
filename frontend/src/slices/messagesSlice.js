import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const messagesAdapter = createEntityAdapter();

export const axiosMessages = async (token) => {
  const messagesRes = await axios.get("/api/v1/messages", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return messagesRes.data;
};

const messagesSlice = createSlice({
  name: "messages",
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    updateMessages: messagesAdapter.setAll
  },
})

export default messagesSlice.reducer;
export const { addMessages, addMessage, updateMessages } = messagesSlice.actions;
