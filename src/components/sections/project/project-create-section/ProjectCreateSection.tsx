import { Grid } from "@mui/material";

import { styles } from "./ProjectCreateSectionStyles";
import { HeadlineWithSpan } from "../../..";
import { ProjectCreateWithForm } from "../../../forms/project/ProjectCreate";

export const ProjectCreateSection = () => {
  return (
    <Grid container sx={styles.container}>
      <Grid item xs={12}>
        <HeadlineWithSpan text="Register" spanText="New Project" />
      </Grid>
      <Grid item xs={12}>
        <ProjectCreateWithForm />
      </Grid>
    </Grid>
  );
};
