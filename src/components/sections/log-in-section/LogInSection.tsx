import { Link } from 'react-router-dom'

import { Grid, Typography } from '@mui/material'
import { styles } from './LogInSectionStyles'

import { PUBLIC_ROUTES } from '../../../routes/public-routes/routes'
import { LogInForm } from '../../forms/log-in-form/LogInForm'
import { IMAGES } from '../../../constants/images/images.constants'

export const LogInSection = () => {
  return (
    <Grid container sx={styles.container}>
      <Grid item>
        <img src={IMAGES.LOGO} alt="DevRank logo" width={222} height={90} />
      </Grid>
      <Grid item>
        <Typography component="h1" variant="h1">
          Log in
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" mb={2}>
          Don't have an account?{' '}
          <Link to={PUBLIC_ROUTES.SIGN_UP} className="link">
            Sign up
          </Link>
        </Typography>
      </Grid>
      <Grid item mb={5}>
        <LogInForm />
      </Grid>
    </Grid>
  )
}
