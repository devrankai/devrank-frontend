import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils";
import { persistedDataNameConstants } from "../../constants/persistedDataName/persistedDataName.constants";

export enum CANDIDATE_STATUS {
  SELECTED = "selected",
  NOT_SELECTED = "not_selected",
  CHECKING = "checking",
}

interface CandidateInitialState {
  statusCandidate?: CANDIDATE_STATUS;
  candidate?: { [key: string]: any };
  errorMessageCandidate?: string | undefined;
}

const initialState: CandidateInitialState = {
  statusCandidate:
    getLocalStorage(persistedDataNameConstants.CANDIDATE_INFO)?.statusCandidate ||
    CANDIDATE_STATUS.NOT_SELECTED,
  candidate:
    getLocalStorage(persistedDataNameConstants.CANDIDATE_INFO)?.candidateID || {},
  errorMessageCandidate: undefined,
};

export const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    onCheckingCandidate: (state) => {
      state.statusCandidate = CANDIDATE_STATUS.CHECKING;
      state.candidate = {};
      state.errorMessageCandidate = undefined;
    },
    onSelectCandidate: (state, { payload }) => {
      state.statusCandidate = CANDIDATE_STATUS.SELECTED;
      state.candidate = payload;
      state.errorMessageCandidate = undefined;
    },
    onErrorCandidate: (state, { payload }) => {
      state.statusCandidate = CANDIDATE_STATUS.NOT_SELECTED;
      state.candidate = {};
      state.errorMessageCandidate = payload;
    },
    clearErrorMessageCandidate: (state) => {
      state.errorMessageCandidate = undefined;
    },
  },
});

export const { onCheckingCandidate, onSelectCandidate, onErrorCandidate } =
  candidateSlice.actions;
