import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { BasicTabs, NotSelected } from "../..";
import { useCandidateStore, useSpinner } from "../../../hooks";
import { HeadlineH1 } from "../../ui/headlines/HeadlineH1";
import { PRIVATE_ROUTES } from "../../../routes";

export const CandidateReviewSection = () => {
  const { candidate } = useCandidateStore();
  const { addLoading, removeLoading } = useSpinner();
  const [candidatesIdArray, setCandidatesIdArray] = useState<number[]>([]);

  useEffect(() => {
    addLoading();
    console.log("candidate en efffff", candidate);
    setCandidatesIdArray(candidate?.map((item: string) => Number(item.trim())));

    removeLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      {candidate?.length > 0 ? (
        candidatesIdArray?.length === 0 ? (
          "Loading..."
        ) : (
          <Grid container>
            <Grid item xs={12}>
              <HeadlineH1 text="Candidate Review" />
            </Grid>
            <Grid item xs={11.5} mb={4}>
              <BasicTabs candidatesId={candidatesIdArray} />
            </Grid>
          </Grid>
        )
      ) : (
        <NotSelected
          titleText="Select candidates"
          messageText="You forgot to select candidates, please go back and select one or more candidates to continue with the process.."
          navigateTo={PRIVATE_ROUTES.SEARCH_RESULTS}
        />
      )}
    </Grid>
  );
};
