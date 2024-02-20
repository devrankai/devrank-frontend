import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { JOB_DESCRIPTION_URL, POSITION_URL } from "../../../constants";
import { useProjectStore } from "../../../hooks/project-store/useProjectStore.hook";
import { useSpinner } from "../../../hooks/spinner/useSpinner";
import { Position } from "../../../models";
import { PRIVATE_ROUTES } from "../../../routes";
import { http } from "../../../services";
import { alertFactory, sortDescending } from "../../../utils";
import { styles } from "./PositionTableStyles";
import { TableHeader } from "./TableHeader";

type PositionTableProps = {
  handleSelectedPosition: (id: string) => void;
  selectedPosition: string;
};

export const PositionTable = ({
  handleSelectedPosition,
  selectedPosition,
}: PositionTableProps) => {
  const navigate = useNavigate();
  const { project } = useProjectStore();

  const { addLoading, removeLoading } = useSpinner();
  const [positionList, setPositionList] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPositionList = async () => {
    try {
      addLoading();

      const request = await http.post({
        url: POSITION_URL.POST_POSITION_LIST_WIDTH_PROJECT_ID,
        urlWithApi: false,
        isPrivate: true,
        data: {
          project_id: project?.id,
          active: "1"
        },
      });

      if (request.status === "SUCCESS") {
        const parsePositionList = JSON.parse(request.Data).filter(
          (position: { [key: string]: any }) => position.active !== false
        );

        const sortPositionList = sortDescending(
          parsePositionList,
          "ModifiedDate"
        );

        setPositionList([...sortPositionList]);
      } else {
        return alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - getPositionList", error);
    } finally {
      removeLoading();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPositionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditPosition = (id: string) => {
    navigate(
      `${PRIVATE_ROUTES.DASHBOARD}${PRIVATE_ROUTES.JOB_INFO_EDIT}/${id}`
    );
  };

  const handleCheckboxChange = (id: string) => handleSelectedPosition(id);

  const postDeletePosition = async (positionToDelete: object) => {
    try {
      addLoading();

      console.log("positionToDelete", positionToDelete);

      const request = await http.post({
        url: JOB_DESCRIPTION_URL.JOB_DESCRIPTION_DELETE,
        urlWithApi: false,
        isPrivate: true,
        data: positionToDelete,
      });

      if (request.status !== "SUCCESS") {
        return alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong while deleting the position, please try again.",
            icon: "error",
          },
        });
      }

      if (request.status === "SUCCESS") {
        alertFactory({
          type: "feedback",
          params: {
            title: "Position deleted successfully",
          },
        });
      }

      getPositionList();
    } catch (error) {
      console.error("Error - postDeletePosition", error);
    } finally {
      removeLoading();
    }
  };

  const handleDeletePosition = async (position: Position) => {
    const confirmAction = await alertFactory({
      type: "confirm",
      params: { titleText: "Do you want to delete this position?" },
    });

    if (!confirmAction) return;

    const positionDelete = {
      job_desc_id: position.job_desc_id,
      active: 0,
    };

    postDeletePosition(positionDelete);
  };

  return (
    <Box sx={styles.box}>
      <Paper sx={styles.paper}>
        <TableContainer>
          <Table
            sx={styles.table}
            aria-labelledby="Select client table"
            size="small"
          >
            <TableHeader />
            <TableBody sx={styles.tableBody}>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} sx={styles.noPositionSpanContainer}>
                    <Box component="span" sx={styles.noPositionSpan}>
                      <CircularProgress size={20} /> Searching positions
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && positionList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} sx={styles.noPositionSpanCell}>
                    <Box component="span" sx={styles.noPositionSpan}>
                      No positions
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                positionList.map((position) => (
                  <TableRow
                    key={position.job_desc_id + "position"}
                    sx={styles.tableRow}
                  >
                    <TableCell sx={styles.tableCell}>
                      <Checkbox
                        checked={selectedPosition === `${position.job_desc_id}`}
                        onChange={() =>
                          handleCheckboxChange(`${position.job_desc_id}`)
                        }
                        icon={<CircleOutlinedIcon />}
                        checkedIcon={<RadioButtonCheckedIcon color="primary" />}
                        sx={{ padding: "0px 9px" }}
                      />
                    </TableCell>
                    <TableCell sx={styles.tableCellPosition}>
                      {position.role_name}
                    </TableCell>
                    <TableCell sx={styles.tableCellLevel}>
                      {position.skill_level_name}
                    </TableCell>
                    <TableCell sx={styles.tableCellActions}>
                      <IconButton
                        aria-label={`Edit position ${position.job_desc_id}`}
                        onClick={() =>
                          handleEditPosition(`${position.job_desc_id}`)
                        }
                      >
                        <ModeOutlinedIcon />
                      </IconButton>
                      <IconButton
                        aria-label={`Delete position ${position.job_desc_id}`}
                        onClick={() => handleDeletePosition(position)}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
