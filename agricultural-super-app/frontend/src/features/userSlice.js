import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from './userAPI';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      return await userAPI.getProfile(userId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/update',
  async (profileData, { rejectWithValue }) => {
    try {
      return await userAPI.update(profileData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    profiles: {},
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles[action.meta.arg] = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  }
});

export default userSlice.reducer;