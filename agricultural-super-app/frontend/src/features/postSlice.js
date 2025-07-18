import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from './postAPI';

export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await postAPI.getAll();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default postSlice.reducer;