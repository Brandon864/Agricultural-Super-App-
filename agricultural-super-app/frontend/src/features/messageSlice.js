import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messageAPI from './messageAPI';

export const fetchMessages = createAsyncThunk(
  'messages/fetchAll',
  async (threadId, { rejectWithValue }) => {
    try {
      return await messageAPI.getByThread(threadId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'messages/send',
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      return await messageAPI.create(threadId, content);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    threads: {},
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threads[action.meta.arg] = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const threadId = action.meta.arg.threadId;
        if (!state.threads[threadId]) {
          state.threads[threadId] = [];
        }
        state.threads[threadId].push(action.payload);
      });
  }
});

export default messageSlice.reducer;