import { useDispatch, useSelector } from "react-redux";

import { RootState, onCheckingPosition, onSelectPosition } from "../../store";

import { useSpinner } from "../spinner/useSpinner";

export const usePositionStore = () => {
  const { addLoading, removeLoading } = useSpinner();

  const { statusPosition, position, errorMessagePosition } = useSelector(
    (state: RootState) => state.position
  );
  const dispatch = useDispatch();

  const startPosition = async (id: string) => {
    dispatch(onCheckingPosition());

    try {
      addLoading();
      dispatch(onSelectPosition({ id }));
    } catch (error) {
      console.error("error - startPosition: ", { error });
    } finally {
      removeLoading();
    }
  };

  return {
    statusPosition,
    position,
    errorMessagePosition,
    startPosition,
  };
};
