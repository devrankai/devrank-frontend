import { useDispatch, useSelector } from "react-redux";

import { RootState, onCheckingCandidate, onSelectCandidate } from "../../store";

import { useSpinner } from "../spinner/useSpinner";

export const useCandidateStore = () => {
  const { addLoading, removeLoading } = useSpinner();

  const { statusCandidate, candidate, errorMessageCandidate } = useSelector(
    (state: RootState) => state.candidate
  );
  const dispatch = useDispatch();

  const startCandidate = async (selectedIds: string[]) => {
    dispatch(onCheckingCandidate());

    try {
      addLoading();
      dispatch(onSelectCandidate(selectedIds));
    } catch (error) {
      console.error("error - startCandidate: ", { error });
    } finally {
      removeLoading();
    }
  };

  return {
    statusCandidate,
    candidate,
    errorMessageCandidate,
    startCandidate,
  };
};
