import { useDispatch, useSelector } from "react-redux";

import { RootState, onCheckingJob, onSelectJob } from "../../store";

import { useSpinner } from "../spinner/useSpinner";

export const useJobStore = () => {
  const { addLoading, removeLoading } = useSpinner();

  const { statusJob, job, errorMessageJob } = useSelector(
    (state: RootState) => state.job
  );
  const dispatch = useDispatch();

  const startJob = async (id: string) => {
    dispatch(onCheckingJob());

    try {
      addLoading();
      dispatch(onSelectJob({ id }));
    } catch (error) {
      console.error("error - startJob: ", { error });
    } finally {
      removeLoading();
    }
  };

  return {
    statusJob,
    job,
    errorMessageJob,
    startJob,
  };
};
