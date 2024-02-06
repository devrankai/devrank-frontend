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
import {
  alertFactory,
  convertDateToStringFormatYYYYMMDD,
  sortDescending,
} from "../../../utils";
import { http } from "../../../services";

import { PRIVATE_ROUTES } from "../../../routes";
import { PROJECT_URL } from "../../../constants";
import { ProjectTypes } from "./project-types";
import { styles } from "./ProjectTableStyles";
import { useSpinner } from "../../../hooks/spinner/useSpinner";
import { useClientStore } from "../../../hooks/client-store/useClientStore.hook";

type ProjectTableProps = {
  handleSelectedProject: (id: string) => void;
  selectedProject: string;
};

export const ProjectTable = ({
  handleSelectedProject,
  selectedProject,
}: ProjectTableProps) => {
  const { client } = useClientStore();

  const navigate = useNavigate();

  const { addLoading, removeLoading } = useSpinner();

  const [projectList, setProjectList] = useState<ProjectTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProjectList = async () => {
    try {
      addLoading();

      const request = await http.post({
        url: PROJECT_URL.PROJECT_INFO,
        urlWithApi: false,
        isPrivate: true,
        data: {
          project_id: "",
        },
      });

      if (request.status === "SUCCESS") {
        const parseProjectList = JSON.parse(request.Data).filter(
          (project: { [key: string]: any }) => project.active !== false
        );

        const orderProjectsById = sortDescending(
          parseProjectList,
          "project_id"
        );

        setProjectList([...orderProjectsById]);
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
      console.error("Error - getProjectList", error);
    } finally {
      removeLoading();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjectList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditProject = (id: string) =>
    navigate(`${PRIVATE_ROUTES.DASHBOARD}${PRIVATE_ROUTES.PROJECT_EDIT}${id}`);

  const handleCheckboxChange = (id: string) => handleSelectedProject(id);

  const postDeleteProject = async (projectToDelete: { [key: string]: any }) => {
    try {
      addLoading();

      const request = await http.post({
        url: PROJECT_URL.PROJECT_CREATE_DELETE_UPDATE,
        urlWithApi: false,
        isPrivate: true,
        data: projectToDelete,
      });

      if (request.status !== "SUCCESS") {
        return alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong while creating the project, please try again.",
            icon: "error",
          },
        });
      }

      alertFactory({
        type: "feedback",
        params: {
          title: "Project deleted succesfully",
        },
      });

      getProjectList();
    } catch (error) {
      console.error("Error - postNewProject", error);
    } finally {
      removeLoading();
    }
  };

  const handleDeleteProject = async (project: ProjectTypes) => {
    const confirmAction = await alertFactory({
      type: "confirm",
      params: { titleText: "Do you want to delete this project?" },
    });

    if (!confirmAction || !project.project_id) return;

    const projectToDelete = {
      project_id: project.project_id,
      client_id: client?.id,
      project_name: project.project_name,
      start_date: convertDateToStringFormatYYYYMMDD(project.start_date),
      team_struc_id: project.team_structure_id.toString(),
      team_exp_prosp_id: project.team_expansion_prospects_id.toString(),
      proj_lead: project.project_lead,
      proj_desc: project.project_desc,
      active: "0",
    };

    postDeleteProject(projectToDelete);
  };

  return (
    <Box sx={styles.box}>
      <Paper sx={styles.paper}>
        <TableContainer>
          <Table
            sx={styles.table}
            aria-labelledby="Select project table"
            size="small"
          >
            <TableHeader />
            <TableBody sx={styles.tableBody}>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} sx={styles.noProjectSpanContainer}>
                    <Box component="span" sx={styles.noProjectSpan}>
                      <CircularProgress size={20} /> Searching projects
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && projectList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Box component="span" sx={styles.noProjectSpan}>
                      No projects
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                projectList.map((project) => (
                  <TableRow key={project.project_id} sx={styles.tableRow}>
                    <TableCell sx={styles.tableCell}>
                      <Checkbox
                        checked={selectedProject === `${project.project_id}`}
                        onChange={() =>
                          handleCheckboxChange(`${project.project_id}`)
                        }
                        icon={<CircleOutlinedIcon />}
                        checkedIcon={<RadioButtonCheckedIcon color="primary" />}
                      />
                    </TableCell>
                    <TableCell sx={styles.tableCellProject}>
                      {project.project_name}
                    </TableCell>
                    <TableCell sx={styles.tableCellActions}>
                      <IconButton
                        aria-label={`Edit project ${project.project_name}`}
                        onClick={() =>
                          handleEditProject(`${project.project_id}`)
                        }
                      >
                        <ModeOutlinedIcon />
                      </IconButton>
                      <IconButton
                        aria-label={`Delete project ${project.project_name}`}
                        onClick={() => handleDeleteProject(project)}
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
