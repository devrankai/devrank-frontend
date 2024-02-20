import { Grid } from "@mui/material";
import { CodeItem } from "./CodeItem";

type Props = {
  codingStandards: number;
  readability: number;
  modularity: number;
  testing: number;
}

export const CodeList = ({
  codingStandards,
  readability,
  modularity,
  testing,
}: Props) => {

  const codeItemsList = [
    { title: "Coding Standards", percent: codingStandards, primaryColor: "#165BAA", secondaryColor: "#63ABFD" },
    { title: "Unit Test", percent: testing, primaryColor: "#FB4A0C", secondaryColor: "#FFA98B" },
    { title: "Modularity", percent: modularity, primaryColor: "#009C06", secondaryColor: "#1EEC27" },
    { title: "Readability and Comments", percent: readability, primaryColor: "#FF1021", secondaryColor: "#FFBABF" },
  ]

  return (
    <Grid container sx={{ maxWidth: "360px", alignItems: "center" }}>
      {codeItemsList.map(item => (
        <CodeItem
          key={item.title}
          title={item.title}
          percent={item.percent}
          primaryColor={item.primaryColor}
          secondaryColor={item.secondaryColor}
        />
      ))}
    </Grid >
  )
}