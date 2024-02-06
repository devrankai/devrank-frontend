import { useState } from "react";
import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { styles } from "./CandidateStyles";
import { CodeList } from "./CodeList";
import { Profile } from "./Profile";
import { Notes } from "./Notes";

export const Candidate = () => {
  const [value, setValue] = useState('profile');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="code review or LinkedIn profile"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="code" control={<Radio />} label="Code Review" />
            <FormControlLabel value="profile" control={<Radio />} label="LinkedIn Profile" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={styles.info}>Zander Whitehurst</Typography>
        <Typography sx={styles.info}>IT Specialist</Typography>
        <Typography sx={styles.info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus eros eu vehicula interdum.</Typography>
      </Grid>
      <Grid item xs={12} sx={styles.buttonContainer}>
        <Button variant="contained" startIcon={<PersonAddAlt1Icon />} sx={styles.button}>
          Contact information
        </Button>
        <Button variant="outlined" startIcon={<LockIcon />} sx={styles.button}>
          Send a message
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex" }}>
        <Grid container sx={{ height: "100%", gap: "12px", marginBottom: "24px" }}>
          <Grid item xs={12} md={5.5} mr={2} >
            {value === "profile" && <Profile />}
            {value === "code" && <CodeList />}
          </Grid>
          <Grid item xs={12} md={5.5} >
            <Notes />
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  )
}