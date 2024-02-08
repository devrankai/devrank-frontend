import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils";
import { persistedDataNameConstants } from "../../constants/persistedDataName/persistedDataName.constants";

export enum JOB_STATUS {
  SELECTED = "selected",
  NOT_SELECTED = "not_selected",
  CHECKING = "checking",
}

interface JobInitialState {
  statusJob?: JOB_STATUS;
  job?: { [key: string]: any };
  errorMessageJob?: string | undefined;
}

const initialState: JobInitialState = {
  statusJob:
    getLocalStorage(persistedDataNameConstants.JOB_INFO)?.statusJob ||
    JOB_STATUS.NOT_SELECTED,
  job: getLocalStorage(persistedDataNameConstants.JOB_INFO)?.jobID || {},
  errorMessageJob: undefined,
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    onCheckingJob: (state) => {
      state.statusJob = JOB_STATUS.CHECKING;
      state.job = {};
      state.errorMessageJob = undefined;
    },
    onSelectJob: (state, { payload }) => {
      state.statusJob = JOB_STATUS.SELECTED;
      state.job = payload;
      state.errorMessageJob = undefined;
    },
    onErrorJob: (state, { payload }) => {
      state.statusJob = JOB_STATUS.NOT_SELECTED;
      state.job = {};
      state.errorMessageJob = payload;
    },
    clearErrorMessageJob: (state) => {
      state.errorMessageJob = undefined;
    },
  },
});

export const { onCheckingJob, onSelectJob, onErrorJob } = jobSlice.actions;
