import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { TableHeader } from "./TableHeader";
import { styles } from "./SearchResultTableStyles";
import { useCandidateList, usePositionStore } from "../../../hooks";
import { capitalizeFirstLetterOfEachWord } from "../../../utils";

type Props = {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export const SearchResultTable = ({ selectedIds, setSelectedIds }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visibleResults, setVisibleResults] = useState<number>(5);

  const { position } = usePositionStore();
  const { candidateModelList, postCandidateList } = useCandidateList();

  useEffect(() => {
    const getPositionsList = async () => {
      try {
        await postCandidateList(Number(position?.id));
      } catch (error) {
        console.error("Error search result table - getPositionsList");
      } finally {
        setIsLoading(false);
      }
    };

    if (position?.id) {
      getPositionsList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const handleClick = () => {
    setVisibleResults((prevVisibleResults) => prevVisibleResults + 5);
  };

  return (
    <Grid container mt={3}>
      <Grid item xs={12}>
        <Box sx={styles.box}>
          <Paper sx={styles.paper}>
            <TableContainer>
              <Table
                sx={styles.table}
                aria-labelledby="Select search result table"
                size="small"
              >
                <TableHeader />
                <TableBody sx={styles.tableBody}>
                  {isLoading && (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        sx={styles.noSearchResultSpanContainer}
                      >
                        <Box component="span" sx={styles.noSearchResultSpan}>
                          <CircularProgress size={20} /> Loading search results
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                  {!isLoading &&
                  candidateModelList &&
                  candidateModelList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} sx={styles.noSearchResultCell}>
                        <Box component="span" sx={styles.noSearchResultSpan}>
                          No results
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    candidateModelList
                      .slice(0, visibleResults)
                      .map((candidate) => (
                        <TableRow
                          key={
                            candidate.full_name + candidate.candidate_info_id
                          }
                          sx={styles.tableRow}
                        >
                          <TableCell sx={styles.tableCellName}>
                            {capitalizeFirstLetterOfEachWord(
                              candidate.full_name
                            )}
                          </TableCell>
                          <TableCell sx={styles.tableCellYears}>
                            {candidate.years_of_experience} Years
                          </TableCell>
                          <TableCell sx={styles.tableCellRating}>
                            {candidate.skill_level_name}
                          </TableCell>
                          <TableCell sx={styles.tableCellSelect}>
                            <Checkbox
                              checked={selectedIds.includes(
                                `${candidate.candidate_info_id}`
                              )}
                              onChange={() =>
                                handleCheckboxChange(
                                  `${candidate.candidate_info_id}`
                                )
                              }
                              icon={<CircleOutlinedIcon />}
                              checkedIcon={
                                <RadioButtonCheckedIcon color="primary" />
                              }
                              sx={{ padding: "0px 9px" }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={12} sx={styles.buttonContainer}>
        <Button
          variant="outlined"
          endIcon={<AddCircleOutlineIcon />}
          aria-labelledby="Generate results button"
          onClick={handleClick}
          disabled={candidateModelList.length < 5}
        >
          Generate results
        </Button>
      </Grid>
    </Grid>
  );
};
