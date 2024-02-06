import { Grid } from "@mui/material";
import { ClientCreate, HeadlineWithSpan } from "../..";
import { styles } from "./ClientCreateSectionStyles";

export const ClientCreateSection = () => {
  return (
    <Grid container sx={styles.container}>
      <Grid item xs={12}>
        <HeadlineWithSpan text="Register" spanText="New Client" />
      </Grid>
      <Grid item xs={12}>
        <ClientCreate />
      </Grid>
    </Grid>
  );
};
