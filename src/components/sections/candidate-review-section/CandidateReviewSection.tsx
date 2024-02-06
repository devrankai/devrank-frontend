import { Grid } from "@mui/material"
import { HeadlineH1 } from "../../ui/headlines/HeadlineH1"
import BasicTabs from "../../ui/tabs/BasicTabs"


export const CandidateReviewSection = () => {

  // TODO: hay que ver como pasamos los id desde la pagina anterior
  // Y con eso agarramos la info para mostrar

  return (
    <Grid container>
      <Grid item xs={12}>
        <HeadlineH1 text="Candidate Review" />
      </Grid>
      <Grid item xs={12}>
        <BasicTabs />
      </Grid>
    </Grid>
  )
}