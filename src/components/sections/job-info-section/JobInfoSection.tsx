import { Grid } from "@mui/material";
import { JobInfoCreate } from "../../forms/job-info/JobInfoCreate";
import { HeadlineWithSpan } from "../../ui/headlines/HeadlineWithSpan";

export const JobInfoSection = () => {

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
        <JobInfoCreate />
      </Grid>
    </Grid>
  );
};
