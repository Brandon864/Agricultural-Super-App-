import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import postReducer from './features/post/postSlice';
import communityReducer from './features/community/communitySlice';
import messageReducer from './features/message/messageSlice';
import userReducer from './features/user/userSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    communities: communityReducer,
    messages: messageReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});