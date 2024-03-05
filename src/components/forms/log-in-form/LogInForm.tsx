import { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../hooks/auth-store/useAuthStore.hook";

import { useErrorsValidationForm } from "../../../hooks";
import { formsFieldsValidation, loginFormSchema } from "../../../schemas";

import { PUBLIC_ROUTES } from "../../../routes/public-routes/routes";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { CustomTextWithSpace } from "../..";
import { PRIVATE_ROUTES } from "../../../routes";
import { styles } from "./LogInFormStyles";
import { persistLocalStorage } from "../../../utils";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { persistedDataNameConstants } from "../../../constants/persistedDataName/persistedDataName.constants";

interface IFormInputs {
  username: string;
  password: string;
}

export const LogInForm = () => {
  const [forgotPasswordMessageError, setForgotPasswordMessageError] =
    useState<string>("");
  const [clickForgotPassword, setClickForgotPassword] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const { status, user, startLogin, startCodeSend } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>();

  const { errorsValidationForm } = useErrorsValidationForm();

  const navigate = useNavigate();

  useEffect(() => {
    const sendData = async () => {
      const { username } = getValues();

      const sendData = await startCodeSend(username, "forgot");

      if (sendData.status !== "SUCCESS") return;

      navigate(PUBLIC_ROUTES.RESET_PASSWORD, {
        state: {
          email: username,
        },
      });
    };

    if (clickForgotPassword && !forgotPasswordMessageError) {
      sendData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgotPasswordMessageError, clickForgotPassword]);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const dataToSend = { username: data.username, password: data.password };

    startLogin(dataToSend);

    reset();
  };

  useEffect(() => {
    if (status === "authenticated" && user?.token) {
      persistLocalStorage(persistedDataNameConstants.USER_INFO, {
        status,
        user,
      });
      navigate(PRIVATE_ROUTES.DASHBOARD);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user]);

  const handleResetPassword = () => {
    const { username } = getValues();

    setClickForgotPassword(true);
    setForgotPasswordMessageError(
      !username ? "Must add email and click again" : ""
    );
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box component="form" sx={styles.box} onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={styles.wrapEMail}>
        <InputLabel htmlFor={loginFormSchema.username.id}>
          {loginFormSchema.username.text}
        </InputLabel>
        <OutlinedInput
          id={loginFormSchema.username.id}
          label={loginFormSchema.username.label}
          {...register(
            loginFormSchema.username.name,
            formsFieldsValidation[loginFormSchema.username.name]
          )}
          type={loginFormSchema.username.type}
        />
        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: loginFormSchema.username.name,
          })}
      </FormControl>
      <FormControl>
        <InputLabel htmlFor={loginFormSchema.password.id}>
          {loginFormSchema.password.text}
        </InputLabel>
        <IconButton
          onClick={handleTogglePasswordVisibility}
          sx={styles.passwordIcon}
        >
          {showPassword ? (
            <>
              <Visibility />
              <Box component="span" sx={styles.passwordIconText}>
                Show
              </Box>
            </>
          ) : (
            <>
              <VisibilityOff />
              <Box component="span" sx={styles.passwordIconText}>
                Hide
              </Box>
            </>
          )}
        </IconButton>
        <OutlinedInput
          id={loginFormSchema.password.id}
          label={loginFormSchema.password.label}
          {...register(
            loginFormSchema.password.name,
            formsFieldsValidation[loginFormSchema.password.name]
          )}
          type={showPassword ? "text" : "password"}
        />
        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: loginFormSchema.password.name,
          })}
      </FormControl>
      <Box className="LogInForm-wrapForgot" sx={styles.wrapForgotPassword}>
        <Button
          className="LogInForm-wrapForgot-button"
          onClick={handleResetPassword}
          sx={styles.btnResetPass}
        >
          Forgot your password
        </Button>
        <CustomTextWithSpace
          textWithSpaceClass="LogInForm-wrapForgot-message"
          text={forgotPasswordMessageError}
        />
      </Box>

      <Button variant="contained" color="primary" type="submit">
        Log in
      </Button>
    </Box>
  );
};
