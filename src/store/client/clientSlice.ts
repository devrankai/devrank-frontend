import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils";
import { persistedDataNameConstants } from "../../constants/persistedDataName/persistedDataName.constants";

export enum CLIENT_STATUS {
  SELECTED = "selected",
  NOT_SELECTED = "not_selected",
  CHECKING = "checking",
}

interface ClientInitialState {
  statusClient?: CLIENT_STATUS;
  client?: { [key: string]: any };
  errorMessageClient?: string | undefined;
}

const initialState: ClientInitialState = {
  statusClient:
    getLocalStorage(persistedDataNameConstants.CLIENT_INFO)?.statusClient ||
    CLIENT_STATUS.NOT_SELECTED,
  client:
    getLocalStorage(persistedDataNameConstants.CLIENT_INFO)?.clientID || {},
  errorMessageClient: undefined,
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    onCheckingClient: (state) => {
      state.statusClient = CLIENT_STATUS.CHECKING;
      state.client = {};
      state.errorMessageClient = undefined;
    },
    onSelectClient: (state, { payload }) => {
      state.statusClient = CLIENT_STATUS.SELECTED;
      state.client = payload;
      state.errorMessageClient = undefined;
    },
    onErrorClient: (state, { payload }) => {
      state.statusClient = CLIENT_STATUS.NOT_SELECTED;
      state.client = {};
      state.errorMessageClient = payload;
    },
    clearErrorMessageClient: (state) => {
      state.errorMessageClient = undefined;
    },
    onResetClient: (state) => {
      state.statusClient = CLIENT_STATUS.NOT_SELECTED;
      state.client = {};
      state.errorMessageClient = undefined;
    },
  },
});

export const {
  onCheckingClient,
  onSelectClient,
  onErrorClient,
  onResetClient,
} = clientSlice.actions;
