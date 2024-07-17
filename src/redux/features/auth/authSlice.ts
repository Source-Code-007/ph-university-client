import { createSlice } from "@reduxjs/toolkit";
import { TDecodedUser } from "../../../types/index.type";

type TInitialAuthState = {
  user: null | TDecodedUser;
  isAuthLoading: boolean;
  token: null | string;
};

const initialState: TInitialAuthState = {
  user: null,
  isAuthLoading: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, signOut } = authSlice.actions;
export default authSlice.reducer;
