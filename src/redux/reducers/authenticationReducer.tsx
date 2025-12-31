import {createSlice} from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    isLoading: true,
  },
  reducers: {
    login: state => {
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.isLoading = false;
    },
  },
});

export const {login, logout} = authenticationSlice.actions;

export default authenticationSlice.reducer;
