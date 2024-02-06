import { Grid } from "@mui/material";
import { styles } from "./PositionCreateStyles";
import { HeadlineWithSpan, PositionForm } from "../../..";

export const PositionCreateSection = () => {
  return (
    <Grid container sx={styles.container}>
      <Grid item xs={12}>
        <HeadlineWithSpan text='Register' spanText='New Position' />
      </Grid>
      <Grid item xs={12}>
        <PositionForm />
      </Grid>
    </Grid>
  )
}