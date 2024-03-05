import { useLocation } from "react-router-dom";

import { Grid, Typography } from "@mui/material";

import { PasswordAndReConfirmPasswordForm } from "../../password_and_reconfirm_password/PasswordAndReConfirmPasswordForm";
import { IMAGES } from "../../../../constants/images/images.constants";

import { styles } from "./SignUpPasswordSectionStyles";

export const SignUpPasswordSection = () => {
  const { state } = useLocation();

  return (
    <Grid container sx={styles.container}>
      <Grid item>
        <img src={IMAGES.LOGO} alt="DevRank logo" width={222} height={90} />
      </Grid>
      <Grid item>
        <Typography component="h1" sx={styles.title}>
          Email address verified
          <img src="/assets/register/check-mark.png" alt="check icon" />
        </Typography>
        <Typography align="center">Finish setting up your account</Typography>
      </Grid>

      <Grid item my={2}>
        <Grid item sx={styles.gridEmail}>
          <Typography variant="body1" sx={styles.text1}>
            Email Address:
          </Typography>
          <Typography sx={styles.text2}>{state?.email}</Typography>
        </Grid>
        <Grid item sx={styles.gridFullName}>
          <Typography variant="body1" sx={styles.text1}>
            Full name:
          </Typography>
          <Typography sx={styles.text2}>{state?.full_name ? state?.full_name : "N/A"}</Typography>
        </Grid>
        <PasswordAndReConfirmPasswordForm />
      </Grid>
    </Grid>
  );
};
