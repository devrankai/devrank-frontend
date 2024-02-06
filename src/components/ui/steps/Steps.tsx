import { Box } from "@mui/material";
import { styles } from "./StepsStyles";

type Props = {
  step: number;
};

export const Steps = ({ step }: Props) => {
  return (
    <Box component="div" sx={styles.container}>
      <Box component="span" sx={styles.step1}>
        1
      </Box>
      <Box component="span" sx={styles.line}></Box>
      <Box component="span" sx={step === 1 ? styles.step2 : styles.step3}>
        2
      </Box>
    </Box>
  );
};
