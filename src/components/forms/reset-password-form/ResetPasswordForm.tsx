import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Grid, OutlinedInput, Typography } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { PUBLIC_ROUTES } from "../../../routes";
import { formsFieldsValidation, resetPasswordForm } from "../../../schemas";
import { alertFactory } from "../../../utils";
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
  const [clickResentRecovery, setClickResentRecovery] = useState(false);

  const navigate = useNavigate();

  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>();

  useEffect(() => {
    // TODO: call to endpoint API -->> send code by email
    // TODO: and show feedback -->> email sended
  }, []);

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
    } else if (clickResentRecovery) {
      alertFactory({
        type: "feedback",
        params: {
          title: "Code sended",
          text: "Please check the code in your email",
        },
      });

      console.log("call API -> endpoint 'send code by email'");
      // TODO: call API -> endpoint "send code by email"
    }

    return () => {
      setClickResentRecovery(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.email, clickResentRecovery]);

  const handleClickResentRecovery = () => {
    reset();
    setClickResentRecovery(true);
  };

  const handleClickBackToLogIn = () => {
    navigate(PUBLIC_ROUTES.LOG_IN)
  }

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    // TODO: handle de data
    // TODO: call API -> endpoint "check number entered"

    console.log("onSubmit click", { data });

    const formatValuesData = Object.values(data).join("");

    console.log("======= ResetPasswordForm ========");
    console.log("formatValuesData", { formatValuesData });

    // reset()

    // TODO: success -> feedback y navigate a login ... error --> show message error
    navigate(PUBLIC_ROUTES.LOG_IN);
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
