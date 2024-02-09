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
import { alertFactory, sortDescending } from "../../../utils";
import { styles } from "./ClientTableStyles";
import { http } from "../../../services";
import { CLIENT_URL } from "../../forms/client/client-form-constants";
import { ClientTableTypes } from "./client-table-types";
import { useSpinner } from "../../../hooks/spinner/useSpinner";

type ClientTableProps = {
  handleSelectedClient: (id: string) => void;
  selectedClient: string;
};

export const ClientTable = ({
  handleSelectedClient,
  selectedClient,
}: ClientTableProps) => {
  const navigate = useNavigate();

  const { addLoading, removeLoading } = useSpinner();

  const [clientList, setClientList] = useState<ClientTableTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getClientList = async () => {
    try {
      addLoading();

      const request = await http.post({
        url: CLIENT_URL.CLIENT,
        urlWithApi: false,
        isPrivate: true,
        data: {
          client_id: "",
        },
      });

      if (request.status === "SUCCESS") {
        const parseClientList = JSON.parse(request.Data).filter(
          (client: { [key: string]: any }) => client.active !== false
        );

        const orderClientsById = sortDescending(parseClientList, "client_id");

        setClientList([...orderClientsById]);
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
      console.error("Error - getClientList", error);
    } finally {
      removeLoading();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClientList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClient = (id: string) =>
    navigate(`/dashboard/client/edit/${id}`, { state: { id } });

  const handleCheckboxChange = (id: string) => handleSelectedClient(id);

  const postDeleteClient = async (clientToDelete: { [key: string]: any }) => {
    try {
      addLoading();

      const request = await http.post({
        url: CLIENT_URL.CLIENT_UPDATE_CREATE_DELETE,
        urlWithApi: false,
        isPrivate: true,
        data: clientToDelete,
      });

      if (request.status !== "SUCCESS") {
        return alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong while deleting the client, please try again.",
            icon: "error",
          },
        });
      }

      if (request.status === "SUCCESS") {
        alertFactory({
          type: "feedback",
          params: {
            title: "Client deleted successfully",
          },
        });
      }

      getClientList();
    } catch (error) {
      console.error("Error - postDeleteClient", error);
    } finally {
      removeLoading();
    }
  };

  const handleDeleteClient = async (client: { [key: string]: any }) => {
    const confirmAction = await alertFactory({
      type: "confirm",
      params: { titleText: "Do you want to delete this client?" },
    });

    if (!confirmAction) return;

    const clientDelete = {
      client_id: client.client_id,
      client_name: client.client_name,
      city_id: client.city_id,
      state_abb: client.state_abb,
      country_id: "0",
      industry_id: client.industry_id,
      company_size_id: client.company_size_id,
      company_desc: client.company_desc,
      active: "0",
    };

    postDeleteClient(clientDelete);
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
                  <TableCell colSpan={4} sx={styles.noClientSpanContainer}>
                    <Box component="span" sx={styles.noClientSpan}>
                      <CircularProgress size={20} /> Searching clients
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && clientList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Box component="span" sx={styles.noClientSpan}>
                      No clients
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                clientList.map((row) => (
                  <TableRow key={row.client_id} sx={styles.tableRow}>
                    <TableCell sx={styles.tableCell}>
                      <Checkbox
                        checked={selectedClient === `${row.client_id}`}
                        onChange={() =>
                          handleCheckboxChange(`${row.client_id}`)
                        }
                        icon={<CircleOutlinedIcon />}
                        checkedIcon={<RadioButtonCheckedIcon color="primary" />}
                      />
                    </TableCell>
                    <TableCell sx={styles.tableCellClient}>
                      {row.client_name}
                    </TableCell>
                    <TableCell sx={styles.tableCellIndustry}>
                      {row.industry_name}
                    </TableCell>
                    <TableCell sx={styles.tableCellActions}>
                      <IconButton
                        aria-label={`Edit client ${row.client_name}`}
                        onClick={() => handleEditClient(`${row.client_id}`)}
                      >
                        <ModeOutlinedIcon />
                      </IconButton>
                      <IconButton
                        aria-label={`Delete client ${row.client_name}`}
                        onClick={() => handleDeleteClient(row)}
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
