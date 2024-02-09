import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { styles } from "./CandidateStyles";
import { CodeList } from "./CodeList";
import { Profile } from "./Profile";
import { Notes } from "./Notes";
import {
  useCandidateList,
  usePositionStore,
  useSpinner,
} from "../../../../hooks";
import { capitalizeFirstLetterOfEachWord } from "../../../../utils";

type Props = {
  candidateId: number;
};

export const Candidate = ({ candidateId }: Props) => {
  const [value, setValue] = useState("code");
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
    candidateModelList[0]?.full_name ?? ""
  );
  const jobTitle = candidateModelList[0]?.job_title;
  const overallReview = candidateModelList[0]?.overall_review;
  const codingStandards = candidateModelList[0]?.coding_standards;
  const readability = candidateModelList[0]?.readability;
  const modularity = candidateModelList[0]?.modularity;
  const errorHandling = candidateModelList[0]?.error_handling;
  const testing = candidateModelList[0]?.testing;
  const documentation = candidateModelList[0]?.documentation;
  const linkedInImg = candidateModelList[0]?.front_end_image_link;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Grid container>
      {candidateModelList.length === 0 ? (
        "Loading candidate..."
      ) : (
        <>
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="Code review or LinkedIn profile"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="code"
                  control={<Radio />}
                  label="Code Review"
                />
                <FormControlLabel
                  value="profile"
                  control={<Radio />}
                  label="LinkedIn Profile"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={styles.info}> {fullName}</Typography>
            <Typography sx={styles.info}>{jobTitle}</Typography>
            <Typography sx={styles.info}>{overallReview}</Typography>
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
          <Grid item xs={12} sx={{ display: "flex" }}>
            <Grid container sx={styles.wrapperCodeProfile} >
              <Grid item xs={12} md={5.5} mr={2}>
                {value === "profile" && <Profile linkedInImg={linkedInImg} />}
                {value === "code" && (
                  <CodeList
                    codingStandards={codingStandards}
                    readability={readability}
                    modularity={modularity}
                    errorHandling={errorHandling}
                    testing={testing}
                    documentation={documentation}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={5.5}>
                <Notes fullName={fullName} />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};
