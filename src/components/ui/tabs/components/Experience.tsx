import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

import { JobHistory } from "../../../../models";

import { styles } from "./ExperienceStyles";

type Props = {
  jobHistory: JobHistory[] | null;
};

export const Experience = ({ jobHistory }: Props) => {
  return (
    <>
      <Typography component="h2" sx={styles.title}>
        Professional Experience:
      </Typography>
      <List>
        {jobHistory?.map((experience, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>
                    {"\u2022"} {experience.company_name}&nbsp;
                  </Typography>
                  <Typography color="text.secondary">
                    {`(${experience.exp_start_date} - ${
                      experience.exp_end_date || "Present"
                    })`}
                  </Typography>
                </Box>
              }
              secondary={experience.job_title}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
