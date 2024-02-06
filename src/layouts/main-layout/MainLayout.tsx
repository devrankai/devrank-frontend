import { Grid, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { styles } from './MainLayoutStyles'

type Props = {
  imgSrc: string
  children: ReactNode
}

export const MainLayout = ({ imgSrc, children }: Props) => {
  return (
    <main className="main" id="main">
      <Grid container sx={styles.layoutContainer} id="main-container">
        <Grid item xs={11} md={5.8} sx={styles.formContainer} id="main-container-section-1">
          {children}
        </Grid>
        <Grid
          item
          xs={11}
          md={5.8}
          sx={{ ...styles.textContainer, backgroundImage: `url(${imgSrc})` }}
          id="main-container-section-2">
          <Typography sx={styles.title1}>Welcome to</Typography>
          <Typography sx={styles.title2}>DEVRANK AI</Typography>
        </Grid>
      </Grid>
    </main>
  )
}
