import { Box, CircularProgress, Grid, LinearProgress } from "@mui/material";
import { styles } from "./CodeItemStyles";

type Props = {
  title: string;
  percent: number;
  primaryColor: string;
  secondaryColor: string;
};

export const CodeItem = ({
  title,
  percent,
  primaryColor,
  secondaryColor,
}: Props) => {
  return (
    <Grid container sx={styles.container}>
      <Grid item xs={6} sx={styles.titleWrapper}>
        <Box component="span" sx={styles.title}>
          {title}
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        pl={1}
        sx={styles.circularAndPercent}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: "12px",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={70}
            thickness={6}
            sx={{ color: secondaryColor }}
          />
          <CircularProgress
            variant="determinate"
            value={percent}
            size={70}
            thickness={6}
            sx={{ color: primaryColor, position: "absolute", top: 0, left: 0 }}
          />
        </div>
        <Grid item xs={4} mb={1} sx={styles.percentage}>
          <LinearProgress
            variant="determinate"
            value={100}
            sx={{ color: primaryColor, width: "12px" }}
          />
          <Box component="span">{percent} %</Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

/**
<Grid container sx={styles.container}>
      <Grid item xs={6} sx={styles.titleWrapper}>
        <Box component="span" sx={styles.title}>
          {title}
        </Box>
      </Grid>
      <Grid item xs={6} pl={1} sx={styles.circularAndPercent.sx}>
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: "12px",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={70}
            thickness={6}
            sx={{ color: secondaryColor }}
          />
          <CircularProgress
            variant="determinate"
            value={percent}
            size={70}
            thickness={6}
            sx={{ color: primaryColor, position: "absolute", top: 0, left: 0 }}
          />
        </div>
        <Grid item xs={4} mb={1} sx={styles.percentage}>
          <LinearProgress
            variant="determinate"
            value={100}
            sx={{ color: primaryColor, width: "12px" }}
          />
          <Box component="span">{percent} %</Box>
        </Grid>
      </Grid>
     
      </Grid>
 */
{
  /* <Grid item xs={2} mb={1} sx={styles.percentage}>
        <LinearProgress
          variant="determinate"
          value={100}
          sx={{ color: primaryColor, width: "12px" }}
        />
        <Box component="span">{percent} %</Box>
      </Grid> */
}
