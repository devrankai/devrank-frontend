import { useDispatch, useSelector } from "react-redux";

import { User } from "../../models";
import { http } from "../../services";
import {
  RootState,
  onChecking,
  onLogin,
  onLogout,
  onAuthError,
  clearErrorMessage,
  onResetCandidate,
  onResetClient,
  onResetProject,
  onResetPosition,
} from "../../store";
import {
  alertFactory,
  clearLocalStorage,
  persistLocalStorage,
} from "../../utils";
import { useSpinner } from "../spinner/useSpinner";
import { persistedDataNameConstants } from "../../constants/persistedDataName/persistedDataName.constants";

export const useAuthStore = () => {
  const { addLoading, removeLoading } = useSpinner();

  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const startLogin = async (dataToSend: Record<string, any>) => {
    dispatch(onChecking());

    try {
      addLoading();
      const sendData = await http.post({
        url: "login",
        data: dataToSend,
        urlWithApi: true,
      });

      if (sendData.status !== "SUCCESS") {
        return alertFactory({
          type: "feedback",
          params: {
            title: sendData.titleText,
            text: sendData.messageText,
            icon: "error",
          },
        });
      }
      const adaptingUser = new User({
        token: sendData.token,
      });

      if (adaptingUser.token) {
        persistLocalStorage("USER_TK", { userToken: adaptingUser.token });
        persistLocalStorage(persistedDataNameConstants.TOKEN_INIT_DATE, {
          tokenInitDate: new Date().getTime(),
        });
      }

      alertFactory({
        type: "feedback",
        params: {
          title: "Session start succesfully",
        },
      });

      dispatch(onLogin({ ...adaptingUser }));
    } catch (error) {
      console.error("error - startLogin: ", { error });
    } finally {
      removeLoading();
    }
  };

  const startSignUp = async (dataToSend: Record<string, any>) => {
    dispatch(onChecking());

    try {
      const sendData = await http.post({
        url: "login_info/register",
        data: dataToSend,
        urlWithApi: false,
      });

      console.log({ sendData });

      if (sendData.status !== "SUCCESS") {
        dispatch(onAuthError(sendData.messageText));

        setTimeout(() => {
          dispatch(clearErrorMessage());
        }, 2500);

        return alertFactory({
          type: "feedback",
          params: {
            title: sendData.titleText,
            text: sendData.messageText,
            icon: "error",
          },
        });
      }

      throw new Error();
      const adaptingUser = new User({
        token: sendData.token,
      });

      if (adaptingUser.token) {
        persistLocalStorage("USER_TK", { userToken: adaptingUser.token });
        persistLocalStorage(persistedDataNameConstants.TOKEN_INIT_DATE, {
          tokenInitDate: new Date().getTime(),
        });
      }

      alertFactory({
        type: "feedback",
        params: {
          title: "Session start succesfully",
        },
      });

      dispatch(onLogin({ ...adaptingUser }));
    } catch (error) {
      console.error("error - startSignUp: ", { error });
    }
  };

  const startLogout = () => {
    clearLocalStorage(persistedDataNameConstants.USER_TK);
    clearLocalStorage(persistedDataNameConstants.TOKEN_INIT_DATE);
    clearLocalStorage(persistedDataNameConstants.USER_INFO);
    clearLocalStorage(persistedDataNameConstants.CLIENT_INFO);
    clearLocalStorage(persistedDataNameConstants.PROJECT_INFO);
    clearLocalStorage(persistedDataNameConstants.POSITION_INFO);
    clearLocalStorage(persistedDataNameConstants.CANDIDATE_INFO);
    dispatch(onResetCandidate());
    dispatch(onResetClient());
    dispatch(onResetProject());
    dispatch(onResetPosition());
    dispatch(onLogout());
  };

  return {
    status,
    user,
    errorMessage,

    startLogin,
    startSignUp,
    startLogout,
    onAuthError,
    clearErrorMessage,
  };
};
