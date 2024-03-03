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
import { AUTH_URL } from "../../constants";
import { useState } from "react";

export const useAuthStore = () => {
  const { addLoading, removeLoading } = useSpinner();

  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();
  // TODO: dejar false
  const [codeRegisterSended, setCodeRegisterSended] = useState<boolean>(false);
  // const [codeRegisterSended, setCodeRegisterSended] = useState<boolean>(true);
  const [disabledRegisterRecoveryLink, setDisabledRegisterRecoveryLink] =
    useState<boolean>(true);

  // const [codeForgotPwSended, setCodeForgotPwSended] = useState<boolean>(false);
  // const [disabledForgotPwRecoveryLink, setDisabledForgotPwRecoveryLink] =
  //   useState<boolean>(true);

  const startLogin = async (dataToSend: Record<string, any>) => {
    dispatch(onChecking());

    try {
      addLoading();
      const sendData = await http.post({
        url: AUTH_URL.LOGIN,
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
          title: "Session start successfully",
        },
      });

      dispatch(onLogin({ ...adaptingUser }));
    } catch (error) {
      console.error("error - startLogin: ", { error });
    } finally {
      removeLoading();
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

  //* register
  const startSignUp = async (dataToSend: Record<string, any>) => {
    dispatch(onChecking());

    try {
      const sendData = await http.post({
        url: AUTH_URL.REGISTER,
        data: dataToSend,
        urlWithApi: false,
      });

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
          title: "Session start successfully",
        },
      });

      dispatch(onLogin({ ...adaptingUser }));
    } catch (error) {
      console.error("error - startSignUp: ", { error });
    }
  };

  const startRegisterCodeSend = async (email: string) => {
    try {
      if (!email) return;

      addLoading();
      const sendData = await http.post({
        url: AUTH_URL.REGISTER_SEND_CODE_BY_EMAIL,
        data: { username: email },
        urlWithApi: false,
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
      setCodeRegisterSended(true);

      alertFactory({
        type: "feedback",
        params: {
          title: "Code sended",
          text: "Please check the code in your email",
        },
      });
    } catch (error) {
      console.error("error - startLogin: ", { error });
    } finally {
      removeLoading();
    }
  };

  const startRegisterCodeVerify = async (
    registerCodeVerify: Record<string, string>
  ) => {
    try {
      if (!registerCodeVerify) return;

      addLoading();
      const sendData = await http.post({
        url: AUTH_URL.REGISTER_CHECK_CODE_SENDED,
        data: registerCodeVerify,
        urlWithApi: false,
      });

      console.log("startCodeSend sendData res", sendData);

      if (sendData.status !== "SUCCESS" || sendData.message === "NOTVALID") {
        const messageError =
          sendData.status !== "SUCCESS"
            ? "An unexpected error occurred, please try again."
            : sendData.message === "NOTVALID"
            ? "Invalid code"
            : "Something went wrong, try again or contact the administrator.";

        alertFactory({
          type: "feedback",
          params: {
            title: sendData.titleText,
            text: messageError,
            icon: "error",
          },
        });

        return {
          status: "FAILURE",
          message: "NOTVALID",
        };
      }

      setCodeRegisterSended(true);

      alertFactory({
        type: "feedback",
        params: {
          title: "Correct code",
        },
      });

      return sendData;
    } catch (error) {
      console.error("error - startLogin: ", { error });
    } finally {
      removeLoading();
    }
  };

  const handleDisabledRegisterRecoveryLink = (value: boolean) => {
    setDisabledRegisterRecoveryLink(value);
  };

  const handleCodeRegisterSended = (value: boolean) => {
    setCodeRegisterSended(value);
  };

  //* end register

  return {
    status,
    user,
    errorMessage,
    codeRegisterSended,
    disabledRegisterRecoveryLink,
    handleDisabledRegisterRecoveryLink,
    handleCodeRegisterSended,
    startLogin,
    startSignUp,
    startLogout,
    startRegisterCodeSend,
    startRegisterCodeVerify,
    onAuthError,
    clearErrorMessage,
  };
};
