import { Grid } from "@mui/material"
import { CodeItem } from "./CodeItem"

export const CodeList = () => {
  const codeItemsList = [
    { title: "Coding Standards", percent: 80 },
    { title: "Readability and Comments", percent: 70 },
    { title: "Modularity", percent: 70 },
    { title: "Error Handlings", percent: 90 },
    { title: "Testing", percent: 70 },
    { title: "Performance", percent: 80 },
    { title: "Documentation", percent: 60 }
  ]

  return (
    <Grid container sx={{ maxWidth: "300px", alignItems: "center" }}>
      {codeItemsList.map(item => <CodeItem key={item.title} title={item.title} percent={item.percent} />)}
    </Grid >
  )
}