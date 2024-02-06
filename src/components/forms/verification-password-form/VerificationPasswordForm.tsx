// import { useLocation, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
import { styles } from "./VerificationPasswordFormStyles";
// import { http } from "../../../services";
import { useAuthStore } from "../../../hooks/auth-store/useAuthStore.hook";
import { CustomTextWithSpace } from "../..";

interface IFormInputs {
  fullName: string;
  password: string;
  confirmPassword: string;
}

export const VerificationPasswordForm = () => {
  // const navigate = useNavigate();

  const { errorsValidationForm } = useErrorsValidationForm();

  // const { status, errorMessage, startSignUp } = useAuthStore();

  const { errorMessage, startSignUp } = useAuthStore();

  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    // reset,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>();

  // useEffect(() => {
  //   if (status === "authenticated" && user?.token) {
  //     navigate(PRIVATE_ROUTES.DASHBOARD);
  //   }
  // }, [status, user]);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    console.log("SUBMIT", { data, state });

    if (!data.fullName || !data.password || !state.email) return;

    const emailTest = "aeplager4@yahoo.com";

    const dataToSend = {
      // username: state?.email,
      username: emailTest,
      full_name: data.fullName,
      password: data.password,
    };

    // TODO: CALL TO API ... if is SUCCESS -> reset and go to login view ...else show error

    // const sendData = await http.post({ url: "login", data });
    startSignUp(dataToSend);

    // reset();

    //TODO: got to login
    // navigate(PRIVATE_ROUTES.LOG_IN);
  };

  return (
    <Box component="form" sx={styles.box} onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <InputLabel htmlFor={verificationPasswordFormSchema.fullName.id}>
          {verificationPasswordFormSchema.fullName.label}
        </InputLabel>
        <OutlinedInput
          id={verificationPasswordFormSchema.fullName.id}
          {...register(
            verificationPasswordFormSchema.fullName.name,
            formsFieldsValidation[verificationPasswordFormSchema.fullName.name]
          )}
          type={verificationPasswordFormSchema.fullName.type}
        />
        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: verificationPasswordFormSchema.fullName.name,
          })}
      </FormControl>
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
      <CustomTextWithSpace
        textWithSpaceClass="LogInForm-wrapForgot-message"
        text={errorMessage || ""}
      />
      <Button variant="contained" color="primary" type="submit">
        Continue
      </Button>
    </Box>
  );
};
