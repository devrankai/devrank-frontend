import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

import { JobHistory } from "../../../../models";

import { capitalizeFirstLetterOfEachWord, getMonthYearForExperience } from "../../../../utils";

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
                <Box sx={styles.containerPrimary}>
                  <Typography>
                    <Box component="span" sx={styles.companyTitle}>
                      {"\u2022"} {capitalizeFirstLetterOfEachWord(experience.company_name)}&nbsp;
                    </Box>
                    <Box component="span" sx={styles.dateTitle}>
                      {`(${getMonthYearForExperience(experience.exp_start_date)} - ${experience.exp_end_date ? getMonthYearForExperience(experience.exp_end_date) : "Present"
                        })`}
                    </Box>
                  </Typography>
                </Box>
              }
              secondary={capitalizeFirstLetterOfEachWord(experience.job_title)}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
