import { ReactNode } from "react";
import { Grid } from "@mui/material";
import { HeadlineH1, PrimaryButtonWithNavigation } from "../../components";
import { styles } from "./TableLayoutStyles";

type Props = {
  headlineText: string;
  table: ReactNode;
  addNewButton: ReactNode;
  backButton?: boolean;
  backButtonURL?: string;
  nextButton: ReactNode;
  children?: ReactNode;
};

export const TableLayout = ({
  headlineText,
  table,
  addNewButton,
  backButton,
  backButtonURL,
  nextButton,
  children
}: Props) => {
  return (
    <Grid container sx={styles.container}>
      <Grid item xs={12} mb={2}>
        <HeadlineH1 text={headlineText} />
      </Grid>
      <Grid item mb={2} sx={styles.tableContainer}>
        {table}
      </Grid>
      <Grid item xs={12} sx={styles.btnAddNewClientContainer}>
        {addNewButton}
      </Grid>
      <Grid item xs={12} sx={styles.btnNextContainer}>
        {backButton && (
          <PrimaryButtonWithNavigation
            btnTxt="Back"
            btnUrl={backButtonURL ?? ""}
            btnVariant="outlined"
          />
        )}
        {nextButton}
      </Grid>
      {children}
    </Grid>
  );
};
