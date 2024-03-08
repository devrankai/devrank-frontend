import { Box, Button, Grid, OutlinedInput, Typography } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../../../routes";
import { formsFieldsValidation, resetPasswordForm } from "../../../../schemas";
import { useAuthStore, useEventListenerPaste } from "../../../../hooks";
import { alertFactory } from "../../../../utils";
import { styles } from "./VerificationCodeRegisterFormStyles";

interface IFormInputs {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
}

export const VerificationCodeRegisterForm = () => {
  const navigate = useNavigate();

  const { textInArray } = useEventListenerPaste();
  const { startRegisterCodeVerify, startSignUp } = useAuthStore();

  const { state } = useLocation();

  console.log("state en VerificationCodeRegisterForm", state);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>();

  useEffect(() => {
    if (!state?.email) {
      alertFactory({
        type: "feedback",
        params: {
          title: "Email doesn't exist!",
          text: "Add your email address and try again",
          icon: "error",
        },
      });

      navigate(PUBLIC_ROUTES.LOG_IN, { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.email]);

  useEffect(() => {
    const startingUserRegistration = async () => {
      const startingSignUp = await startSignUp({
        username: state?.email,
        full_name: state.full_name || "N/A",
      });

      if (startingSignUp.status !== "SUCCESS")
        return navigate(PUBLIC_ROUTES.SIGN_UP, { replace: true });
    };

    startingUserRegistration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (textInArray && textInArray.length === 6) {
      setValue("code1", textInArray[0]);
      setValue("code2", textInArray[1]);
      setValue("code3", textInArray[2]);
      setValue("code4", textInArray[3]);
      setValue("code5", textInArray[4]);
      setValue("code6", textInArray[5]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textInArray]);

  const handleClickResentRecovery = () => {
    // TODO: que endpoint usamos si tocamos "resent it"
    // startRegisterCodeSend(state?.email);
    reset();
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const joinFormNumbers = Object.values(data).join("");

    const dataToVerify = {
      username: state?.email,
      verification_code: joinFormNumbers,
    };

    const registerCodeVerify = await startRegisterCodeVerify(dataToVerify);

    if (registerCodeVerify.status !== "SUCCESS") return;

    reset();

    navigate(PUBLIC_ROUTES.SIGN_UP_PASSWORD, {
      state: {
        email: state?.email,
        full_name: state?.full_name,
        from: "register",
      },
    });
  };

  return (
    <Box
      component="form"
      sx={styles.container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container gap={1.5} justifyContent="center" mb={2}>
        <Grid item xs={1.3}>
          <OutlinedInput
            id={resetPasswordForm.code1.id}
            {...register(
              resetPasswordForm.code1.name,
              formsFieldsValidation[resetPasswordForm.code1.name]
            )}
            type={resetPasswordForm.code1.type}
            inputProps={{ maxLength: 1 }}
          />
        </Grid>
        <Grid item xs={1.3}>
          <OutlinedInput
            id={resetPasswordForm.code2.id}
            {...register(
              resetPasswordForm.code2.name,
              formsFieldsValidation[resetPasswordForm.code2.name]
            )}
            type={resetPasswordForm.code2.type}
            inputProps={{ maxLength: 1 }}
          />
        </Grid>
        <Grid item xs={1.3}>
          <OutlinedInput
            id={resetPasswordForm.code3.id}
            {...register(
              resetPasswordForm.code3.name,
              formsFieldsValidation[resetPasswordForm.code3.name]
            )}
            type={resetPasswordForm.code3.type}
            inputProps={{ maxLength: 1 }}
          />
        </Grid>
        <Grid item xs={1.3}>
          <OutlinedInput
            id={resetPasswordForm.code4.id}
            {...register(
              resetPasswordForm.code4.name,
              formsFieldsValidation[resetPasswordForm.code4.name]
            )}
            type={resetPasswordForm.code4.type}
            inputProps={{ maxLength: 1 }}
          />
        </Grid>
        <Grid item xs={1.3}>
          <OutlinedInput
            id={resetPasswordForm.code5.id}
            {...register(
              resetPasswordForm.code5.name,
              formsFieldsValidation[resetPasswordForm.code5.name]
            )}
            type={resetPasswordForm.code5.type}
            inputProps={{ maxLength: 1 }}
          />
        </Grid>
        <Grid item xs={1.3}>
          <OutlinedInput
            id={resetPasswordForm.code6.id}
            {...register(
              resetPasswordForm.code6.name,
              formsFieldsValidation[resetPasswordForm.code6.name]
            )}
            type={resetPasswordForm.code6.type}
            inputProps={{ maxLength: 1 }}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          className="LogInForm-wrapForgot-message"
          sx={styles.errorCodeMessage}
        >
          {Object.keys(errors).length > 0 &&
            "Must search your email for the code and add it. The value must be single numeric character from 0 to 9."}
        </Typography>
      </Grid>
      <Grid item mt={4}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ width: "200px", mb: 2 }}
          type="submit"
        >
          Verify
        </Button>
      </Grid>
      <Grid item>
        Don't get the code?
        <Button onClick={handleClickResentRecovery} sx={styles.resendButton}>
          Resend it
        </Button>
      </Grid>
    </Box>
  );
};
