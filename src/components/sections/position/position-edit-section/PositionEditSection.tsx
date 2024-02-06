import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { HeadlineWithSpan, PositionForm } from "../../..";
import { styles } from "./PositionEditSectionStyles";

export const PositionEditSection = () => {
  const { id } = useParams();

  return (
    <Grid container sx={styles.container}>
      <Grid item xs={12}>
        <HeadlineWithSpan text='Edit' spanText={`Position ${id}`} />
        <PositionForm />
      </Grid>
    </Grid>
  )
}