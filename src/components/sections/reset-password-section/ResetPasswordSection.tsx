import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IMAGES } from "../../../constants";
import { alertFactory } from "../../../utils";
import { styles } from "./ResetPasswordSectionStyles";
import { PUBLIC_ROUTES } from "../../../routes";
import { ResetPasswordForm } from "../../forms/reset-password/reset-password-form/ResetPasswordForm";

export const ResetPasswordSection = () => {
  const { state } = useLocation();

  console.log(state);

  const navigate = useNavigate();
  console.log({ email: state?.email });
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
  }, []);

  return (
    <Grid container sx={styles.container}>
      <Grid item>
        <img src={IMAGES.LOGO} alt="DevRank logo" width={222} height={90} />
      </Grid>
      <Grid item>
        <Typography component="h1" variant="h1">
          Can't log in?
        </Typography>
      </Grid>
      <Grid item>
        <img
          src={IMAGES.LOGIN_OPENED_ENVELOPE}
          alt="Open envelop"
          width={134}
          height={134}
        />
      </Grid>
      <Grid item>
        <Typography variant="body1" sx={styles.text1}>
          We send a recovery link to you at
        </Typography>
        {/* CHANGE TO USER PASSWORD*/}
        <Typography sx={styles.text2}>{state?.email}</Typography>
      </Grid>
      <Grid item mb={1}>
        <ResetPasswordForm />
      </Grid>
    </Grid>
  );
};
