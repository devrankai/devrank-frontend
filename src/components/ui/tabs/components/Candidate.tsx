import { useEffect } from "react";

import { Button, Grid, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { CodeList } from "./CodeList";
import { Notes } from "./Notes";
import {
  useCandidateList,
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
  const { candidateModelList, postCandidateList } = useCandidateList();
  const { position } = usePositionStore();
  const { addLoading, removeLoading } = useSpinner();

  useEffect(() => {
    addLoading();
    postCandidateList(Number(position?.id), candidateId);
    removeLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateId]);

  const fullName = capitalizeFirstLetterOfEachWord(
    candidateModelList[0]?.Data[0]?.full_name ?? ""
  );
  const jobTitle = capitalizeFirstLetterOfEachWord(
    candidateModelList[0]?.Data[0].job_title ?? ""
  );
  const overallReview = candidateModelList[0]?.Data[0]?.overall_review;
  const codingStandards = candidateModelList[0]?.Data[0]?.coding_standards;
  const readability = candidateModelList[0]?.Data[0]?.readability;
  const modularity = candidateModelList[0]?.Data[0]?.modularity;
  const testing = candidateModelList[0]?.Data[0]?.testing;
  const linkedInUrl = candidateModelList[0]?.Data[0]?.linkedin_url;
  const notes = candidateModelList[0]?.Data[0]?.notes_from_interviewer;

  return (
    <Grid container sx={styles.container}>
      {candidateModelList.length === 0 ? (
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
                <Experience jobHistory={candidateModelList[0]?.Job_History} />
              </Grid>
              <Grid item xs={12}>
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
