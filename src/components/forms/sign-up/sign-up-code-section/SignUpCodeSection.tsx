import { VerificationCodeRegisterForm } from "../../..";

import { IMAGES } from "../../../../constants/images/images.constants";
import { Grid, Typography } from "@mui/material";
import { styles } from "./SignUpCodeSectionStyles";

export const SignUpCodeSection = () => {
  return (
    <>
      <Grid container sx={styles.container}>
        <Grid item>
          <img src={IMAGES.LOGO} alt="DevRank logo" width={222} height={90} />
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h2">
            We've emailed you a code
          </Typography>
        </Grid>
        <Grid item my={5}>
          <VerificationCodeRegisterForm />
        </Grid>
      </Grid>
    </>
  );
};
