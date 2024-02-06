import { Grid, Typography } from '@mui/material'

import { SignUpForm } from '../../forms/sign-up-form/SignUpForm'

import { styles } from './SignUpSectionStyles'
import { IMAGES } from '../../../constants/images/images.constants'

export const SignUpSection = () => {
  return (
    <Grid container sx={styles.container}>
      <Grid item>
        <img src={IMAGES.LOGO} alt="DevRank logo" width={222} height={90} />
      </Grid>
      <Grid item>
        <Typography component="h1" variant="h1" mb={2}>
          Sign up to continue
        </Typography>
      </Grid>
      <Grid item my={5}>
        <SignUpForm />
      </Grid>
    </Grid>
  )
}
