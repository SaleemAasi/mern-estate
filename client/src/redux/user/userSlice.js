import { createSlice } from "@reduxjs/toolkit";

// Retrieve token from localStorage if available
const tokenFromStorage = localStorage.getItem('authToken');

const initialState = {
  user: null,
  token: tokenFromStorage || null,  // Persist token if available in localStorage
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;  // Save user data
      state.token = action.payload.token; // Save token
      localStorage.setItem('authToken', action.payload.token);  // Store token in localStorage
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null; // Clear token on sign-out
      localStorage.removeItem('authToken');  // Remove token from localStorage
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error=null
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  signInStart, 
  signInSuccess, 
  signInFailure, 
  signOut, 
  updateUserStart, 
  updateUserSuccess, 
  updateFailure 
} = userSlice.actions;

export default userSlice.reducer;
