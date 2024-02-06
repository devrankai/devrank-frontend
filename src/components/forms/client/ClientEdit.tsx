import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  ClientInfoCity,
  ClientInfoCompanySize,
  ClientInfoIndustry,
  ClientInfoState,
  clientInfoEdit,
} from "../../../models";
import { clientFormSchema } from "../../../schemas";
import { http } from "../../../services";
import { alertFactory } from "../../../utils";
import { ClientForm } from "./ClientForm";
import { CLIENT_URL } from "./client-form-constants";

import { Grid } from "@mui/material";
import { PRIVATE_ROUTES } from "../../../routes";
import { ClientFormInputs } from "./ClientCreate";
import { useSpinner } from "../../../hooks/spinner/useSpinner";

export const ClientEdit = () => {
  const navigate = useNavigate();

  const { addLoading, removeLoading } = useSpinner();

  const { id } = useParams();

  const [stateList, setStateList] = useState<ClientInfoState[]>([]);
  const [cityList, setCityList] = useState<ClientInfoCity[]>([]);
  const [industryList, setIndustryList] = useState<ClientInfoIndustry[]>([]);
  const [companySizeList, setCompanySizeList] = useState<
    ClientInfoCompanySize[]
  >([]);
  const [disabledCity, setDisabledCity] = useState<boolean>(false);
  const [cityHasAlreadyBeenCharged, setCityHasAlreadyBeenCharged] =
    useState<boolean>(false);

  const [chargedCity, setChargedCity] = useState(null);

  const methods = useForm<ClientFormInputs>();

  const stateSelected = methods.watch("state");

  useEffect(() => {
    if (chargedCity && cityList.length && !cityHasAlreadyBeenCharged) {
      methods.setValue(`${clientFormSchema.city.name}`, chargedCity);
      setCityHasAlreadyBeenCharged(true);
      postCitiesList(stateSelected);
      removeLoading();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityList, cityHasAlreadyBeenCharged]);

  useEffect(() => {
    if (stateSelected) {
      addLoading();
      setDisabledCity(false);
      postCitiesList(stateSelected);
      removeLoading();
    } else {
      setDisabledCity(true);
      methods.setValue(`${clientFormSchema.city.name}`, "");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateSelected]);

  useEffect(() => {
    addLoading();
    postStatesList();
    getIndustriesList();
    getCompaniesSizeList();

    if (id) {
      getClient(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClient = async (id: string) => {
    try {
      const request = await http.post({
        url: CLIENT_URL.CLIENT,
        urlWithApi: false,
        isPrivate: true,
        data: {
          client_id: Number(id),
        },
      });

      if (request.status === "SUCCESS") {
        const parseClientList = JSON.parse(request.Data);
        setChargedCity(parseClientList[0].city_id);
        methods.setValue(
          `${clientFormSchema.client.name}`,
          parseClientList[0].client_name
        );
        methods.setValue(
          `${clientFormSchema.state.name}`,
          parseClientList[0].state_abb
        );

        methods.setValue(
          `${clientFormSchema.industry.name}`,
          parseClientList[0].industry_id
        );
        methods.setValue(
          `${clientFormSchema.companySize.name}`,
          parseClientList[0].company_size_id
        );
        methods.setValue(
          `${clientFormSchema.companyDescription.name}`,
          parseClientList[0].company_desc
        );
      } else {
        return alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong, please try again.",
            icon: "error",
          },
        });
      }
      // setIsLoading(false);
    } catch (error) {
      console.error("Error ClientEdit - get client", { error });
    }
  };

  const postStatesList = async () => {
    try {
      const request = await http.post({
        url: CLIENT_URL.STATES,
        urlWithApi: false,
        isPrivate: true,
        data: {
          state_abb: "",
        },
      });
      if (request.status === "SUCCESS") {
        const parseStateList = JSON.parse(request.Data);
        setStateList([...parseStateList]);
      } else {
        return alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong with state options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error ClientEdit - post states list", { error });
    }
  };

  const postCitiesList = async (stateSelected: string) => {
    try {
      const request = await http.post({
        url: CLIENT_URL.CITIES,
        urlWithApi: false,
        isPrivate: true,
        data: {
          city_id: "0",
          state_abb: stateSelected,
        },
      });
      if (request.status === "SUCCESS") {
        const parseCityList = JSON.parse(request.Data);
        setCityList([...parseCityList]);
      } else {
        return alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong with city options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error ClientEdit - post cities list", { error });
    }
  };

  const getIndustriesList = async () => {
    try {
      const request = await http.get({
        url: CLIENT_URL.INDUSTRIES,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseIndustryList = JSON.parse(request.Data);
        setIndustryList([...parseIndustryList]);
      } else {
        return alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong industry options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error ClientEdit - get industries list", { error });
    }
  };

  const getCompaniesSizeList = async () => {
    try {
      const request = await http.get({
        url: CLIENT_URL.COMPANY_SIZE,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseCompanySizeList = JSON.parse(request.Data);
        setCompanySizeList([...parseCompanySizeList]);
      } else {
        return alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong with company size options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error ClientEdit - get companies size list", { error });
    }
  };

  const postEditClient = async (editClient: clientInfoEdit) => {
    try {
      const request = await http.post({
        url: CLIENT_URL.CLIENT_UPDATE_CREATE_DELETE,
        urlWithApi: false,
        isPrivate: true,
        data: editClient,
      });

      if (request.status !== "SUCCESS") {
        return alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong while creating the client, please try again.",
            icon: "error",
          },
        });
      }

      alertFactory({
        type: "feedback",
        params: {
          title: "Client edited succesfully",
        },
      });

      methods.reset();
      navigate(PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.CLIENT);
    } catch (error) {
      console.error("Error ClientEdit - post edit client", { error });
    } finally {
      removeLoading();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    addLoading();
    const editClient: clientInfoEdit = {
      client_id: +id!,
      client_name: data.client,
      city_id: Number(data.city),
      state_abb: data.state,
      country_id: "0",
      industry_id: data.industry,
      company_size_id: data.companySize,
      company_desc: data.companyDescription,
      active: "1",
    };

    postEditClient(editClient);
  };

  return (
    <Grid container mt={3} sx={{ maxWidth: "760px" }}>
      <FormProvider {...methods}>
        <ClientForm
          restProps={{
            onSubmit,
            stateList,
            cityList,
            industryList,
            companySizeList,
            disabledCity,
          }}
        />
      </FormProvider>
    </Grid>
  );
};
