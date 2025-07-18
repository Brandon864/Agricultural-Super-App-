import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import communityAPI from './communityAPI';

export const fetchCommunities = createAsyncThunk(
  'communities/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await communityAPI.getAll();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const joinCommunity = createAsyncThunk(
  'communities/join',
  async (communityId, { rejectWithValue }) => {
    try {
      return await communityAPI.join(communityId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const communitySlice = createSlice({
  name: 'communities',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    joined: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(joinCommunity.fulfilled, (state, action) => {
        state.joined.push(action.payload.communityId);
      });
  }
});

export default communitySlice.reducer;