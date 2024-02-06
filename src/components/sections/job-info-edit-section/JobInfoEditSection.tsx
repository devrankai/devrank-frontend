import { Grid } from "@mui/material";
import { HeadlineWithSpan } from "../../ui/headlines/HeadlineWithSpan";
import { JobInfoEdit } from "../../forms/job-info/JobInfoEdit";

export const JobInfoEditSection = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <HeadlineWithSpan
          text="Job"
          spanText="Description:"
          fontWeightText="400"
          fontWeightSpan="700"
        />
      </Grid>
      <Grid item xs={12}>
        <JobInfoEdit />
      </Grid>
    </Grid>
  );
};
