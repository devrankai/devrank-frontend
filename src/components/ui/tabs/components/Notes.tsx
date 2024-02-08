import { Box, FormControl, Grid, OutlinedInput, Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styles } from "./NotesStyles";

type Props = {
  fullName: string;
}

export const Notes = ({ fullName }: Props) => {
  return (
    <Grid container sx={styles.box}>
      <Box component="div" sx={styles.boxHeader}>
        <Typography sx={styles.boxHeaderName}>{fullName}</Typography>
        <Typography>
          <AccessTimeIcon />
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
            />
          </FormControl>
        </Box>
      </Box>
      <Box component="div" sx={styles.editIconContainer}>
        <CreateIcon sx={styles.editIcon} />
      </Box>
    </Grid>
  )
}