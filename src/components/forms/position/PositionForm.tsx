import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PrimaryButtonWithNavigation } from "../..";
import { PRIVATE_ROUTES } from "../../../routes";
import { styles } from "./PositionFormStyles";

export const PositionForm = () => {
  const navigate = useNavigate();

  const handleSubmit = () => { navigate(PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.POSITION) }

  return (
    <Grid container mt={3} sx={{ maxWidth: '760px' }}>
      <Box component='form' onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={styles.btnContainer}>
            <PrimaryButtonWithNavigation
              btnVariant='outlined'
              btnTxt="Back"
              btnUrl={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.POSITION}
            />
            <Button variant='contained' sx={{ width: '202px' }} type="submit">Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}