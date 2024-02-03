import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const channelsAdapter = createEntityAdapter();

export const axiosChannels = async (token) => {
  const channelsRes = await axios.get("/api/v1/channels", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return channelsRes.data;
};

export const axiosRenameChannel = async (values, id, token) => {
  await axios.patch(`/api/v1/channels/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const axiosAddChannel = async (values, token) => {
  await axios.post("/api/v1/channels", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

const channelsSlice = createSlice({
  name: "channels",
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
  },
});

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
export const { addChannels, addChannel, renameChannel, removeChannel } = channelsSlice.actions;
