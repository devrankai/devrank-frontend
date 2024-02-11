import { Grid } from "@mui/material";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddNewButton,
  NotSelected,
  PrimaryButtonCheckedSelection,
} from "../../..";
import { useClientStore } from "../../../../hooks/client-store/useClientStore.hook";
import { useProjectStore } from "../../../../hooks/project-store/useProjectStore.hook";
import { TableLayout } from "../../../../layouts";
import { PRIVATE_ROUTES } from "../../../../routes";
import { ProjectTable } from "../../../tables";
import { persistedDataNameConstants } from "../../../../constants/persistedDataName/persistedDataName.constants";
import { PROJECT_STATUS } from "../../../../store";
import { persistLocalStorage } from "../../../../utils";

export const ProjectSection = () => {
  const { client } = useClientStore();
  const { project, startProject } = useProjectStore();

  const navigate = useNavigate();

  const handleSelectedProject = (id: string) => {
    persistLocalStorage(persistedDataNameConstants.PROJECT_INFO, {
      projectID: { id },
      statusProject: PROJECT_STATUS.SELECTED,
    });
    startProject(id);
  };

  const handleNavigate: MouseEventHandler<HTMLButtonElement> = () => {
    navigate(`${PRIVATE_ROUTES.DASHBOARD}${PRIVATE_ROUTES.POSITION}`);
  };

  return (
    <Grid sx={{ position: "absolute", zIndex: 1 }}>
      {client?.id ? (
        <TableLayout
          headlineText="Select Project"
          table={
            <ProjectTable
              selectedProject={project?.id}
              handleSelectedProject={handleSelectedProject}
            />
          }
          addNewButton={
            <AddNewButton
              addNewButtonText="Add New Project"
              navigateUrl={`${PRIVATE_ROUTES.DASHBOARD}${PRIVATE_ROUTES.PROJECT_CREATE}`}
            />
          }
          backButton
          backButtonURL={`${PRIVATE_ROUTES.DASHBOARD}${PRIVATE_ROUTES.CLIENT}`}
          nextButton={
            <PrimaryButtonCheckedSelection
              handleNavigate={handleNavigate}
              disabled={client?.id === undefined || project?.id === undefined}
              tooltipTitle="Should select a project to continue"
            />
          }
        />
      ) : (
        <NotSelected
          titleText="Select a client"
          messageText="You forgot to select a client, please go back and select a client to continue with the process.."
          navigateTo={PRIVATE_ROUTES.CLIENT}
        />
      )}
    </Grid>
  );
};
