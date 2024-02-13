import { useState } from "react";
import { Box, Button, FormControl, Grid, OutlinedInput, Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styles } from "./NotesStyles";
import { getDayMonthYEarForCandidate } from "../../../../utils";


type Props = {
  fullName: string;
  notes: string;
}

export const Notes = ({
  fullName,
  notes
}: Props) => {
  const date = getDayMonthYEarForCandidate();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleClickEditButton = () => {
    setIsDisabled((prevIsDisabled) => !prevIsDisabled);
  }

  return (
    <Grid container sx={styles.box}>
      <Box component="div" sx={styles.boxHeader}>
        <Typography sx={styles.boxHeaderName}>{fullName}</Typography>
        <Typography sx={styles.subtitle}>
          <AccessTimeIcon sx={styles.clockIcon} /> <Box component="span" sx={styles.date}>{date}</Box>
        </Typography>
      </Box>
      <Box component="div">
        <Box component="form">
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput
              id="outlined-multiline-static"
              multiline
              rows={14}
              defaultValue={notes}
              sx={styles.input}
              disabled={isDisabled}
            />
          </FormControl>
        </Box>
      </Box>
      <Box component="div" sx={styles.editIconContainer}>
        <Button
          startIcon={<CreateIcon sx={styles.editIcon} />}
          onClick={handleClickEditButton}
          sx={styles.editButton}
        />
      </Box>
    </Grid>
  )
}