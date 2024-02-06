import { Box, Grid, LinearProgress } from "@mui/material"

type Props = {
  title: string;
  percent: number;
}

export const CodeItem = ({ title, percent }: Props) => {
  return (
    <>
      <Grid item xs={12}>
        <Box component="span" sx={{ fontWeight: "400", fontSize: "10px", lineHeight: "16px", color: "#18181B" }}>
          {title}
        </Box>
      </Grid>
      <Grid item xs={9} mb={1}>
        <LinearProgress variant="determinate" value={percent} sx={{ height: "8px", backgroundColor: "#E8EDFF" }} />
      </Grid>
      <Grid item xs={2} ml={2} mb={1}>
        <Box component="span">{percent} %</Box>
      </Grid>
    </>
  )
}