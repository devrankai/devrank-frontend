import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid } from '@mui/material'
import { PrimaryButtonWithNavigation } from '../../ui/buttons/PrimaryButtonWithNavigation'
import { MouseEventHandler, useState } from "react";
import { PRIVATE_ROUTES } from "../../../routes/private-routes/routes";
import { HeadlineWithSpan } from "../../ui/headlines/HeadlineWithSpan";
import { NotSelected, SearchResultTable } from "../..";
import { styles } from "./SearchResultsSectionStyles";

export const SearchResultsSection = () => {
  const navigate = useNavigate();

  const [showNeedSelectedMessage, setShowNeedSelectedMessage] =
    useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleNext: MouseEventHandler<HTMLButtonElement> = () => {
    if (selectedIds.length > 0) {
      setShowNeedSelectedMessage(false);
      //TODO: despues cuando pasemos los datos de la tabla de un endpoint hay que ver que aca esta al lista de 
      // id de los candidatos seleccionados, que hay que pasarla a la proxima pagina
      navigate(PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.CANDIDATE_REVIEW);
    }

    if (selectedIds.length === 0) {
      setShowNeedSelectedMessage(true);
    }
  }

  return (
    <Box component="div" sx={{ position: "absolute", zIndex: 1 }}>
      <Grid container sx={styles.wrapper}>
        <Grid item xs={12}>
          <HeadlineWithSpan text="Candidate" spanText="Search Results" fontWeightText="400" fontWeightSpan="700" />
        </Grid>
        <Grid item xs={12}>
          <SearchResultTable selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        </Grid>
        <Grid item xs={12} sx={styles.btnsContainer}>
          <PrimaryButtonWithNavigation
            btnTxt="Back"
            btnUrl={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.POSITION}
            btnVariant="outlined"
          />
          {/* <PrimaryButtonWithNavigation btnTxt="Next" btnUrl={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.CANDIDATE_REVIEW} />
           */}
          <Button variant='contained' onClick={handleNext} sx={{ width: '202px' }}>
            Next
          </Button>
        </Grid>
      </Grid>
      {showNeedSelectedMessage && (
        <NotSelected
          titleText="Please select a candidate"
          messageText="You forgot to select a candidate, please go back to continue with the process."
          navigateTo='/position'
        />
      )}
    </Box>

  )
}
