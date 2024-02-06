import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { useSpinner } from "../../../hooks/spinner/useSpinner";
import {
  ClientInfoCity,
  ClientInfoCompanySize,
  ClientInfoIndustry,
  ClientInfoState,
  clientInfoNew,
} from "../../../models";
import { PRIVATE_ROUTES } from "../../../routes";
import { http } from "../../../services";
import { alertFactory } from "../../../utils";
import { ClientForm } from "./ClientForm";
import { CLIENT_URL } from "./client-form-constants";

import { Grid } from "@mui/material";

export interface ClientFormInputs {
  client: string;
  state: string;
  city: string;
  industry: string;
  companySize: string;
  companyDescription: string;
}

export const ClientCreate = () => {
  const navigate = useNavigate();

  const { addLoading, removeLoading } = useSpinner();

  const [stateList, setStateList] = useState<ClientInfoState[]>([]);
  const [cityList, setCityList] = useState<ClientInfoCity[]>([]);
  const [industryList, setIndustryList] = useState<ClientInfoIndustry[]>([]);
  const [companySizeList, setCompanySizeList] = useState<
    ClientInfoCompanySize[]
  >([]);
  const [disabledCity, setDisabledCity] = useState<boolean>(true);

  const methods = useForm<ClientFormInputs>();

  const stateSelected = methods.watch("state");

  useEffect(() => {
    const getLists = async () => {
      addLoading();
      try {
        await Promise.all([
          postStatesList(),
          getIndustriesList(),
          getCompaniesSizeList(),
        ]);
      } catch (error) {
        console.error("Error ClientCreate - get list", { error });
      } finally {
        removeLoading();
      }
    };

    getLists();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stateSelected) {
      setDisabledCity(false);
      postCitiesList(stateSelected);
    } else {
      setDisabledCity(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateSelected]);

  const postStatesList = async () => {
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
  };

  const postCitiesList = async (stateSelected: string) => {
    try {
      addLoading();
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
      console.error("Error ClientCreate - post cities list", { error });
    } finally {
      removeLoading();
    }
  };

  const getIndustriesList = async () => {
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
  };

  const getCompaniesSizeList = async () => {
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
  };

  const postNewClient = async (newClient: clientInfoNew) => {
    const request = await http.post({
      url: CLIENT_URL.CLIENT_UPDATE_CREATE_DELETE,
      urlWithApi: false,
      isPrivate: true,
      data: newClient,
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
        title: "Client registered succesfully",
      },
    });

    methods.reset();
    navigate(PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.CLIENT);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newClient: clientInfoNew = {
      client_id: "0",
      client_name: data.client,
      city_id: +data.city,
      state_abb: data.state,
      country_id: "0",
      industry_id: data.industry,
      company_size_id: data.companySize,
      company_desc: data.companyDescription,
      active: "1",
    };

    postNewClient(newClient);
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
