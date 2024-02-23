import { useEffect } from "react";

import { Button, Grid, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { CodeList } from "./CodeList";
import { Notes } from "./Notes";
import {
  useCandidateWithIdList,
  usePositionStore,
  useSpinner,
} from "../../../../hooks";

import { capitalizeFirstLetterOfEachWord } from "../../../../utils";
import { styles } from "./CandidateStyles";
import { Experience } from "./Experience";

type Props = {
  candidateId: number;
};

export const Candidate = ({ candidateId }: Props) => {
  const { candidateWithIdModelList, postCandidateWithIdList } = useCandidateWithIdList();

  const { position } = usePositionStore();
  const { addLoading, removeLoading } = useSpinner();

  useEffect(() => {
    addLoading();

    postCandidateWithIdList(Number(position?.id), candidateId);

    removeLoading();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateId]);

  const fullName = capitalizeFirstLetterOfEachWord(
    candidateWithIdModelList[0]?.Data[0]?.full_name ?? ""
  );
  const jobTitle = capitalizeFirstLetterOfEachWord(
    candidateWithIdModelList[0]?.Data[0].job_title ?? ""
  );
  const overallReview = candidateWithIdModelList[0]?.Data[0]?.overall_review;
  const codingStandards = candidateWithIdModelList[0]?.Data[0]?.coding_standards;
  const readability = candidateWithIdModelList[0]?.Data[0]?.readability;
  const modularity = candidateWithIdModelList[0]?.Data[0]?.modularity;
  const testing = candidateWithIdModelList[0]?.Data[0]?.testing;
  const linkedInUrl = candidateWithIdModelList[0]?.Data[0]?.linkedin_url;
  const notes = candidateWithIdModelList[0]?.Data[0]?.notes_from_interviewer;

  return (
    <Grid container sx={styles.container}>
      {candidateWithIdModelList.length === 0 ? (
        "Loading candidate..."
      ) : (
        <>
          <Grid item xs={12}>
            <Typography sx={styles.info}>
              {fullName} -{" "}
              <a
                href={`https:${linkedInUrl}`}
                target="_blank"
                className="link"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon sx={{ color: "#0B86CA" }} /> Profile
              </a>
            </Typography>
            <Typography sx={styles.infoJob}>{jobTitle}</Typography>
          </Grid>
          <Grid item xs={12} sx={styles.buttonContainer}>
            <Button
              variant="contained"
              startIcon={<PersonAddAlt1Icon />}
              sx={styles.button}
              disabled
            >
              Contact information
            </Button>
            <Button
              variant="outlined"
              startIcon={<LockIcon />}
              sx={styles.button}
              disabled
            >
              Send a message
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <CodeList
              codingStandards={codingStandards}
              readability={readability}
              modularity={modularity}
              testing={testing}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid item>
                <Experience jobHistory={candidateWithIdModelList[0]?.Job_History} />
              </Grid>
              <Grid item xs={12} sx={{display: "flex", height: "430px"}}>
                <Notes
                  fullName={fullName}
                  notes={notes}
                  candidateId={candidateId}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={styles.summary}>Summary</Typography>
            <Typography sx={styles.summaryText}>{overallReview}</Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
};
