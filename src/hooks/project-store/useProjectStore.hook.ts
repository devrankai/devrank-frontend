import { useDispatch, useSelector } from "react-redux";

import { RootState, onCheckingProject, onSelectProject } from "../../store";

import { useSpinner } from "../spinner/useSpinner";

export const useProjectStore = () => {
  const { addLoading, removeLoading } = useSpinner();

  const { statusProject, project, errorMessageProject } = useSelector(
    (state: RootState) => state.project
  );
  const dispatch = useDispatch();

  const startProject = async (id: string) => {
    dispatch(onCheckingProject());

    try {
      addLoading();
      dispatch(onSelectProject({ id }));
    } catch (error) {
      console.error("error - startProject: ", { error });
    } finally {
      removeLoading();
    }
  };

  return {
    statusProject,
    project,
    errorMessageProject,
    startProject,
  };
};
