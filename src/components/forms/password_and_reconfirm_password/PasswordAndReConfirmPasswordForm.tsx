import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useErrorsValidationForm } from "../../../hooks";
import {
  formsFieldsValidation,
  validationConfirmField,
  verificationPasswordFormSchema,
} from "../../../schemas";
import { styles } from "./PasswordAndReConfirmPasswordFormStyles";
import { useAuthStore } from "../../../hooks/auth-store/useAuthStore.hook";
import { CustomTextWithSpace } from "../..";
import { PUBLIC_ROUTES } from "../../../routes";

interface IFormInputs {
  fullName: string;
  password: string;
  confirmPassword: string;
}

export const PasswordAndReConfirmPasswordForm = () => {
  const navigate = useNavigate();

  const { errorsValidationForm } = useErrorsValidationForm();

  const { errorMessage, startChangePassword } = useAuthStore();

  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (!data.password || !state.email) return;

    const dataToSend = {
      username: state.email,
      password: data.password,
    };

    const sendPassword = await startChangePassword(dataToSend);

    if (sendPassword.status !== "SUCCESS") return;

    reset();

    navigate(PUBLIC_ROUTES.LOG_IN);
  };

  return (
    <Box component="form" sx={styles.box} onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <InputLabel id={verificationPasswordFormSchema.password.id}>
          {verificationPasswordFormSchema.password.label}
        </InputLabel>
        <OutlinedInput
          id={verificationPasswordFormSchema.password.id}
          {...register(
            verificationPasswordFormSchema.password.name,
            formsFieldsValidation[verificationPasswordFormSchema.password.name]
          )}
          type={verificationPasswordFormSchema.password.type}
        />
        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: verificationPasswordFormSchema.password.name,
          })}
      </FormControl>
      <FormControl>
        <InputLabel htmlFor={verificationPasswordFormSchema.confirmPassword.id}>
          {verificationPasswordFormSchema.confirmPassword.label}
        </InputLabel>
        <OutlinedInput
          id={verificationPasswordFormSchema.confirmPassword.id}
          {...register(
            verificationPasswordFormSchema.confirmPassword.name,
            validationConfirmField(getValues).confirmPassword
          )}
          type={verificationPasswordFormSchema.confirmPassword.type}
        />
        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: verificationPasswordFormSchema.confirmPassword.name,
          })}
      </FormControl>
      {errorMessage && (
        <CustomTextWithSpace
          textWithSpaceClass="LogInForm-wrapForgot-message"
          text={errorMessage || ""}
        />
      )}
      <Button variant="contained" color="primary" type="submit">
        Continue
      </Button>
    </Box>
  );
};
