import { useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { PrimaryButtonWithNavigation } from "../../ui/buttons/PrimaryButtonWithNavigation";
import { MouseEventHandler, useEffect, useState } from "react";
import { PRIVATE_ROUTES } from "../../../routes/private-routes/routes";
import { HeadlineWithSpan } from "../../ui/headlines/HeadlineWithSpan";
import { NotSelected, SearchResultTable } from "../..";
import { styles } from "./SearchResultsSectionStyles";
import { persistLocalStorage } from "../../../utils";
import { persistedDataNameConstants } from "../../../constants";
import { CANDIDATE_STATUS } from "../../../store";
import { useCandidateStore } from "../../../hooks";

export const SearchResultsSection = () => {
  const { candidate } = useCandidateStore();
  const navigate = useNavigate();
  const { startCandidate } = useCandidateStore();

  const [showNeedSelectedMessage, setShowNeedSelectedMessage] =
    useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (candidate?.length > 0) {
      setSelectedIds(candidate);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext: MouseEventHandler<HTMLButtonElement> = () => {
    if (selectedIds.length > 0) {
      setShowNeedSelectedMessage(false);

      persistLocalStorage(persistedDataNameConstants.CANDIDATE_INFO, {
        candidateID: selectedIds,
        statusCandidate: CANDIDATE_STATUS.SELECTED,
      });

      startCandidate(selectedIds);

      navigate(PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.CANDIDATE_REVIEW);
    }

    if (selectedIds.length === 0) {
      setShowNeedSelectedMessage(true);
    }
  };

  return (
    <Box component="div" sx={{ position: "absolute", zIndex: 1 }}>
      <Grid container sx={styles.wrapper}>
        <Grid item xs={12}>
          <HeadlineWithSpan
            text="Candidate"
            spanText="Search Results"
            fontWeightText="400"
            fontWeightSpan="700"
          />
        </Grid>
        <Grid item xs={12}>
          <SearchResultTable
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </Grid>
        <Grid item xs={12} sx={styles.btnsContainer}>
          <PrimaryButtonWithNavigation
            btnTxt="Back"
            btnUrl={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.POSITION}
            btnVariant="outlined"
          />
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ width: "202px" }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      {showNeedSelectedMessage && (
        <NotSelected
          titleText="Please select a candidate"
          messageText="You forgot to select a candidate, please go back to continue with the process."
          navigateTo="/position"
        />
      )}
    </Box>
  );
};
