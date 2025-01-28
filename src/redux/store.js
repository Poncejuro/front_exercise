import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      isAuthenticated: false,
      token: null,
      user: null,
      error: null,
    },
    reducers: {
      loginSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      },
      loginFailure: (state, action) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload;
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = null;
      },
    },
  });
  
  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
  });
  
  export const { loginSuccess, loginFailure, logout } = authSlice.actions;
  
  export default store;