import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils";
import { persistedDataNameConstants } from "../../constants/persistedDataName/persistedDataName.constants";

export enum POSITION_STATUS {
  SELECTED = "selected",
  NOT_SELECTED = "not_selected",
  CHECKING = "checking",
}

interface PositionInitialState {
  statusPosition?: POSITION_STATUS;
  position?: { [key: string]: any };
  errorMessagePosition?: string | undefined;
}

const initialState: PositionInitialState = {
  statusPosition:
    getLocalStorage(persistedDataNameConstants.POSITION_INFO)?.statusPosition ||
    POSITION_STATUS.NOT_SELECTED,
  position:
    getLocalStorage(persistedDataNameConstants.POSITION_INFO)?.positionID || {},
  errorMessagePosition: undefined,
};

export const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    onCheckingPosition: (state) => {
      state.statusPosition = POSITION_STATUS.CHECKING;
      state.position = {};
      state.errorMessagePosition = undefined;
    },
    onSelectPosition: (state, { payload }) => {
      state.statusPosition = POSITION_STATUS.SELECTED;
      state.position = payload;
      state.errorMessagePosition = undefined;
    },
    onErrorPosition: (state, { payload }) => {
      state.statusPosition = POSITION_STATUS.NOT_SELECTED;
      state.position = {};
      state.errorMessagePosition = payload;
    },
    clearErrorMessagePosition: (state) => {
      state.errorMessagePosition = undefined;
    },
    onResetPosition: (state) => {
      state.statusPosition = POSITION_STATUS.NOT_SELECTED;
      state.position = {};
      state.errorMessagePosition = undefined;
    },
  },
});

export const {
  onCheckingPosition,
  onSelectPosition,
  onErrorPosition,
  onResetPosition,
} = positionSlice.actions;
