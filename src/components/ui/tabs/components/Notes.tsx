import { useState } from "react";
import { Box, Button, FormControl, Grid, OutlinedInput, Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styles } from "./NotesStyles";
import { getDayMonthYEarForCandidate } from "../../../../utils";
import { useCandidateNotes } from "../../../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  fullName: string;
  notes: string;
  candidateId: number;
}

interface FormValues {
  notesFromInterviewer: string;
}

export const Notes = ({
  fullName,
  notes,
  candidateId
}: Props) => {
  const date = getDayMonthYEarForCandidate();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { notesFromInterviewer, postCandidateNotes } = useCandidateNotes(notes);

  const { register, handleSubmit } = useForm<FormValues>();

  const handleClickEditButton: SubmitHandler<{ notesFromInterviewer: string }> = async (data) => {
    setIsDisabled((prevIsDisabled) => !prevIsDisabled);
    postCandidateNotes(candidateId, data.notesFromInterviewer);
  };

  return (
    <Grid container sx={styles.box}>
      <Box component="div" sx={styles.boxHeader}>
        <Typography sx={styles.boxHeaderName}>{fullName}</Typography>
        <Typography sx={styles.subtitle}>
          <AccessTimeIcon sx={styles.clockIcon} /> <Box component="span" sx={styles.date}>{date}</Box>
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(handleClickEditButton)}
        sx={{ width: "100%" }}
      >
        <Box component="div" sx={styles.formContainer}>
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput
              id="outlined-multiline-static"
              multiline
              rows={14}
              defaultValue={notesFromInterviewer}
              {...register("notesFromInterviewer")}
              sx={styles.input}
              disabled={isDisabled}
            />
          </FormControl>
        </Box>
        <Box component="div" sx={styles.editIconContainer}>
          <Button
            type="submit"
            startIcon={<CreateIcon sx={styles.editIcon} />}
            sx={styles.editButton}
          />
        </Box>
      </Box>
    </Grid>
  )
}