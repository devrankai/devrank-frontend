import { useState } from "react";
import { Box, Button, FormControl, Grid, OutlinedInput, Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styles } from "./NotesStyles";
import { getDayMonthYEarForCandidate } from "../../../../utils";


type Props = {
  fullName: string;
}

export const Notes = ({ fullName }: Props) => {
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
              rows={4}
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin commodo lacus id est sollicitudin dapibus. Mauris accumsan varius tortor, id bibendum est faucibus eget. Sed a est eros. Aenean pretium facilisis ligula eu pulvinar. Proin convallis mauris non accumsan mollis. Nunc nec lorem non felis consectetur semper eu vel risus. Nullam rutrum, augue quis aliquet tincidunt, nisl justo mattis purus, lacinia placerat mauris risus id sem. Pellentesque viverra nisl sit amet purus aliquet cursus."
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