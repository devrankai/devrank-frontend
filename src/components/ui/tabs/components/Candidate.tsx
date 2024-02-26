import { useEffect } from "react";

import { Button, Grid, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { CodeList } from "./CodeList";
import { Notes } from "./Notes";
import { useCandidate, usePositionStore, useSpinner } from "../../../../hooks";

import { capitalizeFirstLetterOfEachWord } from "../../../../utils";
import { styles } from "./CandidateStyles";
import { Experience } from "./Experience";

type Props = {
  candidateId: number;
};

export const Candidate = ({ candidateId }: Props) => {
  const { candidateSelected, postOneCandidate } = useCandidate();

  const { position } = usePositionStore();
  const { addLoading, removeLoading } = useSpinner();

  useEffect(() => {
    addLoading();
    postOneCandidate(Number(position?.id), candidateId);
    removeLoading();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateId]);

  const fullName =
    candidateSelected?.Data &&
    capitalizeFirstLetterOfEachWord(
      candidateSelected?.Data[0]?.full_name ?? ""
    );
  const jobTitle =
    candidateSelected?.Data &&
    capitalizeFirstLetterOfEachWord(candidateSelected?.Data[0].job_title ?? "");
  const overallReview =
    candidateSelected?.Data && candidateSelected?.Data[0]?.overall_review;
  const codingStandards =
    candidateSelected?.Data && candidateSelected?.Data[0]?.coding_standards;
  const readability =
    candidateSelected?.Data && candidateSelected?.Data[0]?.readability;
  const modularity =
    candidateSelected?.Data && candidateSelected?.Data[0]?.modularity;
  const testing =
    candidateSelected?.Data && candidateSelected?.Data[0]?.testing;
  const linkedInUrl =
    candidateSelected?.Data && candidateSelected?.Data[0]?.linkedin_url;
  const notes =
    candidateSelected?.Data &&
    candidateSelected?.Data[0]?.notes_from_interviewer;

  return (
    <Grid container sx={styles.container}>
      {candidateSelected.Data === null ? (
        "Loading candidate..."
      ) : (
        <>
          <Grid item xs={12} className="grid-candidate">
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
              codingStandards={codingStandards || 0}
              readability={readability || 0}
              modularity={modularity || 0}
              testing={testing || 0}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid item>
                <Experience jobHistory={candidateSelected?.Job_History} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", height: "430px" }}>
                <Notes
                  fullName={fullName || ""}
                  notes={notes || ""}
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
