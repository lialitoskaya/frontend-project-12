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
    updateMessages: messagesAdapter.setAll,
  },
  extraReducers: (build) => {
    build.addCase("channels/removeChannel", (state, { payload }) => {
      const deletedChannelId = payload;
      Object.values(state.entities).forEach((m) => {
        if (m.channelId === deletedChannelId) {
          messagesAdapter.removeOne(state, m.id);
        }
      });
    });
  },
});

export default messagesSlice.reducer;
export const { addMessages, addMessage, updateMessages } =
  messagesSlice.actions;
