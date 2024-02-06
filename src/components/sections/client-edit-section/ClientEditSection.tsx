import { Grid } from "@mui/material";
import { ClientEdit, HeadlineWithSpan } from "../..";
import { styles } from "./ClientEditSectionStyles";

export const ClientEditSection = () => {
  return (
    <Grid container sx={styles.container}>
      <Grid item xs={12}>
        <HeadlineWithSpan text="Edit" spanText="client" />
      </Grid>
      <Grid item xs={12}>
        <ClientEdit />
      </Grid>
    </Grid>
  );
};
