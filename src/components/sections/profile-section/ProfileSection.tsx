import { Grid } from "@mui/material";
import { styles } from "./PositionSectionStyles";
import { HeadlineH1 } from "../..";

export const ProfileSection = () => {
  return (
    <Grid container sx={styles.container}>
      <Grid item xs={12} mb={2}>
        <HeadlineH1 text="Profile" />
      </Grid>
    </Grid>
  )
}