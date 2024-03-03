import { Box, Button, Grid, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router-dom";
import {  useLocation, useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../../../routes";
import { formsFieldsValidation, resetPasswordForm } from "../../../../schemas";
// import { alertFactory, copyNumberWithCharactersUtils } from "../../../../utils";
import { alertFactory } from "../../../../utils";
import { styles } from "./VerificationCodeRegisterFormStyles";
import { useAuthStore, useSecondsCounter } from "../../../../hooks";
// import ContentPasteIcon from "@mui/icons-material/ContentPaste";

interface IFormInputs {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
}

let countEnabledResentRecoveryLink: NodeJS.Timeout;
const waitingTimeToResendCode: number = 10000;

export const VerificationCodeRegisterForm = () => {
  const navigate = useNavigate();

  const [clickResentRecovery, setClickResentRecovery] = useState(false);

  // const { count, handleResetCount, handleStartCount } = useSecondsCounter();
  const { handleStartCount } = useSecondsCounter();
  const {
    codeRegisterSended,
    // disabledRegisterRecoveryLink,
    handleDisabledRegisterRecoveryLink,
    startRegisterCodeVerify,
    startRegisterCodeSend,
    handleCodeRegisterSended,
  } = useAuthStore();

  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    // setValue,
    reset,
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

  useEffect(() => {

    // startRegisterCodeSend(state?.email);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (codeRegisterSended) {
      countEnabledResentRecoveryLink = setTimeout(() => {
        handleStartCount(false);
        handleCodeRegisterSended(false);
        handleDisabledRegisterRecoveryLink(false);
      }, waitingTimeToResendCode);
    }

    return () => {
      clearTimeout(countEnabledResentRecoveryLink);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeRegisterSended]);

  const handleClickResentRecovery = () => {
    startRegisterCodeSend(state?.email);
    reset();
    // handleResetCount(10);
    // handleStartCount(true);
    // handleDisabledRegisterRecoveryLink(true);
    // setClickResentRecovery(true);
  };

  // const handlePaste = async () => {
  //   try {
  //     const text = await navigator.clipboard.readText();

  //     const numberInArray = copyNumberWithCharactersUtils(text, 6);

  //     if (numberInArray.length === 0 || numberInArray.length > 6) return;

  //     setValue("code1", numberInArray[0]);
  //     setValue("code2", numberInArray[1]);
  //     setValue("code3", numberInArray[2]);
  //     setValue("code4", numberInArray[3]);
  //     setValue("code5", numberInArray[4]);
  //     setValue("code6", numberInArray[5]);
  //   } catch (error) {

  //     if (error instanceof Error) {
  //       const messageError: string = error.message;
  //       return alertFactory({
  //         type: "feedback",
  //         params: {
  //           title: "Error To Copy",
  //           text: messageError,
  //           icon: "error",
  //         },
  //       });
  //     } else {
  //       console.error("Unknown error:", error);
  //       return null;
  //     }
  //   }
  // };

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
      },
    });
  };

  // const disabledRegisterResentRecoveryCode = disabledRegisterRecoveryLink;

  return (
    <Box
      component="form"
      sx={styles.container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container gap={1.5} justifyContent="center" mb={2}>
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
      {/* <Grid item >
        <Button onClick={handlePaste}>
          <ContentPasteIcon /> Paste
        </Button>
      </Grid> */}
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
        <Button
          onClick={handleClickResentRecovery}
          // disabled={disabledRegisterResentRecoveryCode}
          sx={styles.resendButton}
        >
          Resend it
        </Button>
      </Grid>
    </Box>
  );
};
