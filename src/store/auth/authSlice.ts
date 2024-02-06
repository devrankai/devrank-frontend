import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../models";
import { getLocalStorage } from "../../utils";

export enum USER_STATUS {
  AUTHENTICATED = "authenticated",
  NOT_AUTHENTICATED = "not-authenticated",
  CHEKING = "checking",
}

interface UserInitialState {
  status?: USER_STATUS;
  user?: UserInterface;
  errorMessage?: string | undefined;
}

const initialState: UserInitialState = {
  status: getLocalStorage("user-info")?.status || USER_STATUS.NOT_AUTHENTICATED,
  user: getLocalStorage("user-info")?.user || ({} as UserInterface),
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = USER_STATUS.CHEKING;
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = USER_STATUS.AUTHENTICATED;
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state) => {
      state.status = USER_STATUS.NOT_AUTHENTICATED;
      state.user = {};
      state.errorMessage = undefined;
    },
    onAuthError: (state, { payload }) => {
      state.status = USER_STATUS.NOT_AUTHENTICATED;
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, onAuthError, clearErrorMessage } =
  authSlice.actions;
