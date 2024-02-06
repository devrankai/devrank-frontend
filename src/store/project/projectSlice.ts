import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils";
import { persistedDataNameConstants } from "../../constants/persistedDataName/persistedDataName.constants";

export enum PROJECT_STATUS {
  SELECTED = "selected",
  NOT_SELECTED = "not_selected",
  CHECKING = "checking",
}

interface ProjectInitialState {
  statusProject?: PROJECT_STATUS;
  project?: { [key: string]: any };
  errorMessageProject?: string | undefined;
}

const initialState: ProjectInitialState = {
  statusProject:
    getLocalStorage(persistedDataNameConstants.PROJECT_INFO)?.statusProject ||
    PROJECT_STATUS.NOT_SELECTED,
  project:
    getLocalStorage(persistedDataNameConstants.PROJECT_INFO)?.projectID || {},
  errorMessageProject: undefined,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    onCheckingProject: (state) => {
      state.statusProject = PROJECT_STATUS.CHECKING;
      state.project = {};
      state.errorMessageProject = undefined;
    },
    onSelectProject: (state, { payload }) => {
      state.statusProject = PROJECT_STATUS.SELECTED;
      state.project = payload;
      state.errorMessageProject = undefined;
    },
    onErrorProject: (state, { payload }) => {
      state.statusProject = PROJECT_STATUS.NOT_SELECTED;
      state.project = {};
      state.errorMessageProject = payload;
    },
    clearErrorMessageProject: (state) => {
      state.errorMessageProject = undefined;
    },
  },
});

export const { onCheckingProject, onSelectProject, onErrorProject } =
  projectSlice.actions;
