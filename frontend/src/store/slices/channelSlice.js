import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channel: null,
  loading: false,
  error: null,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload;
      state.loading = false;
    },
    setChannelLoading: (state, action) => {
      state.loading = action.payload;
    },
    setChannelError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearChannel: (state) => {
      state.channel = null;
    },
  },
});

export const { setChannel, setChannelLoading, setChannelError, clearChannel } = channelSlice.actions;
export default channelSlice.reducer;
