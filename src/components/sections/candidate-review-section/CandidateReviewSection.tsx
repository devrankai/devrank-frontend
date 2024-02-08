import { Grid } from "@mui/material";
import { HeadlineH1 } from "../../ui/headlines/HeadlineH1";
import { stringToArrayOfNumbers } from "../../../utils";
import { BasicTabs } from "../..";
import { useCandidateStore, useSpinner } from "../../../hooks";
import { useEffect, useState } from "react";

export const CandidateReviewSection = () => {
  const { candidate } = useCandidateStore();
  const { addLoading, removeLoading } = useSpinner();
  const [candidatesIdArray, setCandidatesIdArray] = useState<number[]>([]);

  useEffect(() => {
    addLoading();
    console.log("CANDIDATE", candidate?.selectedIds)
    const listOfCandidatesSelectedId: string = candidate?.selectedIds.join(',');
    const candidatesIdArray: number[] = stringToArrayOfNumbers(listOfCandidatesSelectedId);
    setCandidatesIdArray(candidatesIdArray);

    removeLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Grid container>
      {candidatesIdArray.length === 0 ?
        'Loading...'
        :
        <Grid container>
          <Grid item xs={12}>
            <HeadlineH1 text="Candidate Review" />
          </Grid>
          <Grid item xs={11.5} mb={4}>
            <BasicTabs candidatesId={candidatesIdArray} />
          </Grid>
        </Grid>
      }
    </Grid>
  )
}