import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    isLoading: true,
    userData: null as any,
  },
  reducers: {
    login: state => {
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.userData = null;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, setUserData } = authenticationSlice.actions;

export default authenticationSlice.reducer;
