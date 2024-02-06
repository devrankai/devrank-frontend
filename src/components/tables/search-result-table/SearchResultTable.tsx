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
  TableRow
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { TableHeader } from "./TableHeader";
import { styles } from "./SearchResultTableStyles";
import { Data, data } from "./constants";

type Props = {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SearchResultTable = ({ selectedIds, setSelectedIds }: Props) => {
  const [searchResultList, setSearchResultList] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visibleResults, setVisibleResults] = useState<number>(5);

  useEffect(() => {
    const getSearchResultList = () => {
      //TODO: use the endpoint and setSearchResultList
      setSearchResultList(data);
      setIsLoading(false);
    }

    getSearchResultList();
  }, []);

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  }

  const handleClick = () => setVisibleResults(prevVisibleResults => prevVisibleResults + 5);

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
                  {
                    isLoading &&
                    <TableRow>
                      <TableCell colSpan={4} sx={styles.noSearchResultSpanContainer}>
                        <Box component="span" sx={styles.noSearchResultSpan}>
                          <CircularProgress size={20} /> Loading search results
                        </Box>
                      </TableCell>
                    </TableRow>
                  }
                  {
                    !isLoading && searchResultList.length === 0 ?
                      (
                        <TableRow>
                          <TableCell colSpan={4} sx={{ display: "flex", py: 3 }}>
                            <Box component="span" sx={styles.noSearchResultSpan}>
                              No results
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                      :
                      (
                        searchResultList.slice(0, visibleResults).map((result) => (
                          <TableRow key={result.id} sx={styles.tableRow}>
                            <TableCell sx={styles.tableCellName}>
                              {result.name}
                            </TableCell>
                            <TableCell sx={styles.tableCellYears}>
                              {result.years}
                            </TableCell>
                            <TableCell sx={styles.tableCellRating}>
                              {result.rating}
                            </TableCell>
                            <TableCell sx={styles.tableCellSelect}>
                              <Checkbox
                                checked={selectedIds.includes(result.id)}
                                onChange={() => handleCheckboxChange(result.id)}
                                icon={<CircleOutlinedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon color="primary" />}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      )
                  }
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
        >
          Generate results
        </Button>
      </Grid>
    </Grid >
  )
}