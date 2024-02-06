import { useDispatch, useSelector } from "react-redux";

import { RootState, onCheckingClient, onSelectClient } from "../../store";

import { useSpinner } from "../spinner/useSpinner";

export const useClientStore = () => {
  const { addLoading, removeLoading } = useSpinner();

  const { statusClient, client, errorMessageClient } = useSelector(
    (state: RootState) => state.client
  );
  const dispatch = useDispatch();

  const startClient = async (id: string) => {
    dispatch(onCheckingClient());

    try {
      addLoading();
      dispatch(onSelectClient({ id }));
    } catch (error) {
      console.error("error - startClient: ", { error });
    } finally {
      removeLoading();
    }
  };

  return {
    statusClient,
    client,
    errorMessageClient,
    startClient,
  };
};
