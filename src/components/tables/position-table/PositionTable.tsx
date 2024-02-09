import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { TableHeader } from "./TableHeader";
import { styles } from "./PositionTableStyles";
import { http } from "../../../services";
import {
  alertFactory,
  convertDateToStringFormatDDMMYYYY,
} from "../../../utils";
import { Position } from "../../../models";
import { useSpinner } from "../../../hooks/spinner/useSpinner";
import { PRIVATE_ROUTES } from "../../../routes";
import { JOB_DESCRIPTION_URL, POSITION_URL } from "../../../constants";
import { useProjectStore } from "../../../hooks/project-store/useProjectStore.hook";

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
        url: POSITION_URL.POST_POSITIONS_LIST,
        urlWithApi: false,
        isPrivate: true,
        data: {
          job_desc_id: "0",
        },
      });

      if (request.status === "SUCCESS") {
        console.log("request", request);

        const parsePositionList = JSON.parse(request.Data).filter(
          (position: { [key: string]: any }) => position.active !== false
        );

        setPositionList([...parsePositionList]);
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
    console.log("postDeletePosition", positionToDelete);
    try {
      addLoading();

      const request = await http.post({
        url: JOB_DESCRIPTION_URL.JOB_DESCRIPTION_CREATE_DELETE_UPDATE,
        urlWithApi: false,
        isPrivate: true,
        data: positionToDelete,
      });
      console.log("request", { request });
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
            title: "Position deleted succesfully",
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

    console.log("position", { position });

    const positionDelete = {
      job_desc_id: `${position.job_desc_id}`,
      project_id: project?.id,
      role_id: `${position.role_id}`,
      number_of_positions: `${position.number_of_positions}`,
      test_task_id: `${position.test_task_id}`,
      skill_level_id: `${position.skill_level_id}`,
      dev_methodology_id: `${position.dev_methodology_id}`,
      meeting_frequency_id: `${position.meeting_frequency_id}`,
      location_id: `${position.location_id}`,
      earliest_start_date: convertDateToStringFormatDDMMYYYY(
        position.earliest_start_date as Date
      ),
      closed_by_date: convertDateToStringFormatDDMMYYYY(
        position.closed_by_date as Date
      ),
      probation_period_id: `${position.probation_period_id}`,
      contract_model_id: `${position.contract_model_id}`,
      contract_period_id: position.contract_period_id.toString(),
      time_tracking_id: `${position.time_tracking_id}`,
      active: "0",
      tech_must_to_have: [{ technologies_id: 1 }],
      tech_nice_to_have: [{ technologies_id: 3 }],
      skills_must_to_have: [{ skills_id: 1 }],
      skills_nice_to_have: [{ skills_id: 4 }],
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
                  <TableCell colSpan={4}>
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
