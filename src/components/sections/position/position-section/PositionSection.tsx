import { Grid } from "@mui/material";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddNewButton,
  NotSelected,
  PrimaryButtonCheckedSelection,
} from "../../..";
import { useClientStore } from "../../../../hooks/client-store/useClientStore.hook";
import { usePositionStore } from "../../../../hooks/position-store/usePositionStore.hook";
import { useProjectStore } from "../../../../hooks/project-store/useProjectStore.hook";
import { TableLayout } from "../../../../layouts";
import { PRIVATE_ROUTES } from "../../../../routes";
import { PositionTable } from "../../../tables";
import { persistLocalStorage } from "../../../../utils";
import { persistedDataNameConstants } from "../../../../constants/persistedDataName/persistedDataName.constants";
import { POSITION_STATUS } from "../../../../store";

export const PositionSection = () => {
  const { client } = useClientStore();
  const { project } = useProjectStore();
  const { position, startPosition } = usePositionStore();

  const navigate = useNavigate();

  const handleSelectedPosition = (id: string) => {
    persistLocalStorage(persistedDataNameConstants.POSITION_INFO, {
      positionID: { id },
      statusPosition: POSITION_STATUS.SELECTED,
    });
    startPosition(id);
  };

  const handleNavigate: MouseEventHandler<HTMLButtonElement> = () => {
    navigate(`${PRIVATE_ROUTES.DASHBOARD}${PRIVATE_ROUTES.SEARCH_RESULTS}`);
  };

  const isClientOrProjectNotSelected = client?.id
    ? project?.id
      ? "true"
      : PRIVATE_ROUTES.PROJECT
    : PRIVATE_ROUTES.CLIENT;

  return (
    <Grid sx={{ position: "absolute", zIndex: 1 }}>
      {isClientOrProjectNotSelected === "true" ? (
        <TableLayout
          headlineText="Select Position"
          table={
            <PositionTable
              selectedPosition={position?.id}
              handleSelectedPosition={handleSelectedPosition}
            />
          }
          addNewButton={
            <AddNewButton
              addNewButtonText="Add New Position"
              navigateUrl={`${PRIVATE_ROUTES.DASHBOARD}${PRIVATE_ROUTES.JOB_INFO}`}
            />
          }
          backButton
          backButtonURL={`${PRIVATE_ROUTES.DASHBOARD}${PRIVATE_ROUTES.PROJECT}`}
          nextButton={
            <PrimaryButtonCheckedSelection
              handleNavigate={handleNavigate}
              disabled={client?.id === undefined || project?.id === undefined}
              tooltipTitle="Should select a client and/or project to continue"
            />
          }
        ></TableLayout>
      ) : (
        <NotSelected
          titleText="Select a client and/or project"
          messageText="You forgot to select a client and/or project, please go back and select a client and/or project to continue with the process.."
          navigateTo={isClientOrProjectNotSelected}
        />
      )}
    </Grid>
  );
};
