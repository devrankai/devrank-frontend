import { Grid, Typography } from "@mui/material";
import { styles } from "./SignUpPasswordSectionStyles";
import { RegisterForm } from "../../forms/sign-up/register-form/RegisterForm";
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
        <Typography component="h1" sx={styles.title}>
          Email address verified <img src="/assets/register/check-mark.png"  alt="check icon"/>
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
        <RegisterForm />
      </Grid>
    </Grid>
  );
};
