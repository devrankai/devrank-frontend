import { Grid, Typography } from "@mui/material";
import { styles } from "./SignUpPasswordSectionStyles";
import { VerificationPasswordForm } from "../../forms/verification-password-form/VerificationPasswordForm";
import { IMAGES } from "../../../constants/images/images.constants";
import { useLocation } from "react-router-dom";

export const SignUpPasswordSection = () => {
  const { state } = useLocation();

  return (
    <Grid container sx={styles.container}>
      <Grid item>
        <img src={IMAGES.LOGO} alt="DevRank logo" width={222} height={90} />
      </Grid>
      <Grid item>
        <Typography component="h1" variant="h1">
          Email address verified
        </Typography>
        <Typography>Finish setting up your account</Typography>
      </Grid>

      <Grid item my={5}>
        <Grid item sx={styles.gridEmail}>
          <Typography variant="body1" sx={styles.text1}>
            Email Address:
          </Typography>
          <Typography sx={styles.text2}>{state?.email}</Typography>
        </Grid>
        <VerificationPasswordForm />
      </Grid>
    </Grid>
  );
};
