import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { styles } from "./ExperienceStyles";

type Props = {
  jobHistory: [{ [key: string]: any }];
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
                  <Typography>
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
