import { createSlice, authSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = auth.actions;

export default auth.reducers;

export const selectCurrentUser = (state) => state.auth.user;

export const selectCurrentToken = (state) => state.auth.token;
