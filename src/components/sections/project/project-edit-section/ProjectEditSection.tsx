import { Grid } from "@mui/material";
import { HeadlineWithSpan } from "../../..";
import { ProjectEditWithForm } from "../../../forms/project/ProjectEdit";
import { styles } from "./ProjectEditSectionStyles";

export const ProjectEditSection = () => {

  return (
    <Grid container sx={styles.container}>
      <Grid item xs={12}>
        <HeadlineWithSpan text="Edit" spanText="Project" />
        <ProjectEditWithForm />
      </Grid>
    </Grid>
  );
};
