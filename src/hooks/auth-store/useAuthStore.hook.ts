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

  //* register
  const startSignUp = async (dataToSend: Record<string, any>) => {
    dispatch(onChecking());

    try {
      addLoading();
      const sendData = await http.post({
        url: AUTH_URL.REGISTER,
        data: dataToSend,
        urlWithApi: false,
      });

      if (sendData.status !== "SUCCESS") {
        alertFactory({
          type: "feedback",
          params: {
            title: sendData.titleText || "Error",
            text: sendData.messageText || "Something unexpected happened",
            icon: "error",
          },
        });

        return sendData;
      }

      alertFactory({
        type: "feedback",
        params: {
          title: sendData.message || "Registration successful",
        },
      });

      return sendData;
    } catch (error) {
      console.error("error - startSignUp: ", { error });
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
        url: AUTH_URL.VERIFY_CODE,
        data: registerCodeVerify,
        urlWithApi: false,
      });

      // if (sendData.status !== "SUCCESS" || sendData.message === "NOTVALID") {
      if (sendData.status !== "SUCCESS") {
        const messageError =
          "Something went wrong, try again or contact the administrator.";

        alertFactory({
          type: "feedback",
          params: {
            title: sendData.titleText,
            text: sendData.messageText || messageError,
            icon: "error",
          },
        });

        return {
          status: "FAILURE",
          message: "NOTVALID",
        };
      }

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

  //* forgot pw

  const startForgotPwCodeVerify = async (
    forgotPwCodeVerify: Record<string, string>
  ) => {
    try {
      if (!forgotPwCodeVerify) return;

      addLoading();
      const sendData = await http.post({
        url: AUTH_URL.VERIFY_CODE,
        data: forgotPwCodeVerify,
        urlWithApi: false,
      });

      console.log("startForgotPwCodeVerify sendData res", sendData);

      if (sendData.status !== "SUCCESS") {
        const messageError =
          "Something went wrong, try again or contact the administrator.";

        alertFactory({
          type: "feedback",
          params: {
            title: sendData.titleText,
            text: sendData.messageText || messageError,
            icon: "error",
          },
        });

        return {
          status: "FAILURE",
          message: "NOTVALID",
        };
      }

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

  //* end forgot pw

  //* register and forgot
  const startCodeSend = async (email: string) => {
    try {
      if (!email) return;

      addLoading();

      const sendData = await http.post({
        url: AUTH_URL.SEND_CODE_BY_EMAIL,
        data: { username: email },
        urlWithApi: false,
      });

      console.log("SEND_CODE_BY_EMAIL - sendData", sendData);

      if (sendData.status !== "SUCCESS") {
        alertFactory({
          type: "feedback",
          params: {
            title: sendData.titleText,
            text: sendData.messageText,
            icon: "error",
          },
        });

        return sendData;
      }

      setCodeRegisterSended(true);

      alertFactory({
        type: "feedback",
        params: {
          title: "Code sended",
          text: "Please check the code in your email",
        },
      });

      return sendData;
    } catch (error) {
      console.error("error - startLogin: ", { error });
    } finally {
      removeLoading();
    }
  };

  const startChangePassword = async (dataToSend: Record<string, any>) => {
    dispatch(onChecking());

    try {
      addLoading();
      const sendData = await http.post({
        url: AUTH_URL.RESET_PASSWORD_WITH_CODE,
        data: dataToSend,
        urlWithApi: false,
      });

      if (!sendData || sendData.status !== "SUCCESS") {
        alertFactory({
          type: "feedback",
          params: {
            title: sendData.titleText || "Error",
            text: sendData.messageText || "Something unexpected happened",
            icon: "error",
          },
        });

        return sendData;
      }

      alertFactory({
        type: "feedback",
        params: {
          title: sendData.message || "Successful action",
        },
      });

      return sendData;
    } catch (error) {
      console.error("error - startSignUp: ", { error });
    } finally {
      removeLoading();
    }
  };

  //* end register and forgot

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
    codeRegisterSended,
    disabledRegisterRecoveryLink,
    handleDisabledRegisterRecoveryLink,
    handleCodeRegisterSended,
    startLogin,
    startSignUp,
    startLogout,
    startCodeSend,
    startRegisterCodeVerify,
    startForgotPwCodeVerify,
    startChangePassword,
    onAuthError,
    clearErrorMessage,
  };
};
