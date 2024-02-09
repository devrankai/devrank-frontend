import { Grid } from "@mui/material";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { AddNewButton, PrimaryButtonCheckedSelection } from "../..";
import { useClientStore } from "../../../hooks/client-store/useClientStore.hook";
import { TableLayout } from "../../../layouts";
import { PRIVATE_ROUTES } from "../../../routes/private-routes/routes";
import { ClientTable } from "../../tables";
import { persistLocalStorage } from "../../../utils";
import { persistedDataNameConstants } from "../../../constants/persistedDataName/persistedDataName.constants";
import { CLIENT_STATUS } from "../../../store";

export const ClientSection = () => {
  const { client, startClient } = useClientStore();
  const navigate = useNavigate();

  const handleSelectedClient = (id: string) => {
    persistLocalStorage(persistedDataNameConstants.CLIENT_INFO, {
      clientID: { id },
      statusClient: CLIENT_STATUS.SELECTED,
    });
    startClient(id);
  };

  const handleNavigate: MouseEventHandler<HTMLButtonElement> = () => {
    navigate(`${PRIVATE_ROUTES.DASHBOARD}${PRIVATE_ROUTES.PROJECT}`);
  };

  return (
    <Grid sx={{ position: "absolute", zIndex: 1 }}>
      <TableLayout
        headlineText="Select Client"
        table={
          <ClientTable
            selectedClient={client?.id}
            handleSelectedClient={handleSelectedClient}
          />
        }
        addNewButton={
          <AddNewButton
            addNewButtonText="Add New Client"
            navigateUrl={`${PRIVATE_ROUTES.DASHBOARD}${PRIVATE_ROUTES.CLIENT_CREATE}`}
          />
        }
        nextButton={
          <PrimaryButtonCheckedSelection
            handleNavigate={handleNavigate}
            disabled={client?.id === undefined}
            tooltipTitle="Should select a client to continue"
          />
        }
      ></TableLayout>
    </Grid>
  );
};
