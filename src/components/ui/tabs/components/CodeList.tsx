import { Grid } from "@mui/material";
import { CodeItem } from "./CodeItem";

type Props = {
  codingStandards: number;
  readability: number;
  modularity: number;
  errorHandling: number;
  testing: number;
  documentation: number;
}

export const CodeList = ({
  codingStandards,
  readability,
  modularity,
  errorHandling,
  testing,
  documentation
}: Props) => {

  const codeItemsList = [
    { title: "Coding Standards", percent: codingStandards },
    { title: "Readability and Comments", percent: readability },
    { title: "Modularity", percent: modularity },
    { title: "Error Handlings", percent: errorHandling},
    { title: "Testing", percent: testing },
    { title: "Performance", percent: 80 },
    { title: "Documentation", percent: documentation }
  ]

  return (
    <Grid container sx={{ maxWidth: "300px", alignItems: "center" }}>
      {codeItemsList.map(item => <CodeItem key={item.title} title={item.title} percent={item.percent} />)}
    </Grid >
  )
}