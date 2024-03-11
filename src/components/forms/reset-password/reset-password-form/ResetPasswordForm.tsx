import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, Button, Grid, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore, useEventListenerPaste } from "../../../../hooks";
import { PUBLIC_ROUTES } from "../../../../routes";
import { formsFieldsValidation, resetPasswordForm } from "../../../../schemas";
import { alertFactory } from "../../../../utils";
import { styles } from "./ResetPasswordFormStyles";

interface IFormInputs {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
}

export const ResetPasswordForm = () => {
  const { startCodeSend } = useAuthStore();
  const { startForgotPwCodeVerify } = useAuthStore();
  const { textInArray } = useEventListenerPaste();

  const [clickResentRecovery, setClickResentRecovery] = useState(false);

  const navigate = useNavigate();

  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>();

  useEffect(() => {
    if (clickResentRecovery) {
      startCodeSend(state?.email);
      setClickResentRecovery(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickResentRecovery]);

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

    return () => {
      setClickResentRecovery(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.email]);

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
    reset();
    setClickResentRecovery(true);
  };

  const handleClickBackToLogIn = () => {
    navigate(PUBLIC_ROUTES.LOG_IN);
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const joinFormNumbers = Object.values(data).join("");

    const dataToVerify = {
      username: state?.email,
      verification_code: joinFormNumbers,
    };

    const registerCodeVerify = await startForgotPwCodeVerify(dataToVerify);

    if (registerCodeVerify.status !== "SUCCESS") return;

    reset();

    navigate(PUBLIC_ROUTES.SIGN_UP_PASSWORD, {
      state: {
        email: state?.email,
        from: "forgot",
      },
    });
  };

  return (
    <Box
      component="form"
      sx={styles.container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container gap={1.5} justifyContent="center" mb={1}>
        <Grid item xs={1.2}>
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
        <Grid item xs={1.2}>
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
        <Grid item xs={1.2}>
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
        <Grid item xs={1.2}>
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
        <Grid item xs={1.2}>
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
        <Grid item xs={1.2}>
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
      <Grid item sx={styles.buttonsWrapper}>
        <Button onClick={handleClickBackToLogIn} sx={styles.returnLogInButton}>
          Return to Log In
        </Button>
        <FiberManualRecordIcon sx={styles.dotButton} />
        <Button onClick={handleClickResentRecovery} sx={styles.recoveryButton}>
          Resend recovery link
        </Button>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={styles.continueButton}
        type="submit"
      >
        Continue
      </Button>
    </Box>
  );
};
