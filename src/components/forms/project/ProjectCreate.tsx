import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  ProjectInfoNew,
  ProjectInfoTeamExpansion,
  ProjectInfoTeamStructure,
} from "../../../models";

import { PRIVATE_ROUTES } from "../../../routes";
import { PROJECT_URL } from "../../../constants";

import { http } from "../../../services";
import {
  alertFactory,
  convertDateToStringFormatYYYYMMDD,
} from "../../../utils";
import { ProjectForm } from "./ProjectForm";

import { Grid } from "@mui/material";
import { ProjectFormInputs } from "./ProjectEdit";
import { useSpinner } from "../../../hooks/spinner/useSpinner";
import { useClientStore } from "../../../hooks/client-store/useClientStore.hook";

export const ProjectCreateWithForm = () => {
  const { client } = useClientStore();

  const navigate = useNavigate();

  const { addLoading, removeLoading } = useSpinner();

  const [teamStructureList, setTeamStructureList] = useState<
    ProjectInfoTeamStructure[]
  >([]);

  const [teamExpansionList, setTeamExpansionList] = useState<
    ProjectInfoTeamExpansion[]
  >([]);

  // eslint-disable-next-line
  const [projectStartDate, _] = useState<Dayjs | null>(dayjs(new Date()));

  const validProjectDatesFromToday = useState<Dayjs | null>(dayjs(new Date()));

  const methods = useForm<ProjectFormInputs>();

  useEffect(() => {
    const getTeamsList = async () => {
      try {
        addLoading();
        await Promise.all([getTeamStructureList(), getTeamExpansionList()]);
      } catch (error) {
        console.error("Error ProjectCreateWithForm - get teams lists", {
          error,
        });
      } finally {
        removeLoading();
      }
    };

    getTeamsList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTeamStructureList = async () => {
    try {
      const request = await http.get({
        url: PROJECT_URL.TEAM_STRUCTURE,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseTeamStructureList = JSON.parse(request.Data);
        setTeamStructureList([...parseTeamStructureList]);
      } else {
        if (request.status !== "SUCCESS") {
          return alertFactory({
            type: "feedback",
            params: {
              title:
                "Something went wrong with team structure options, please try again.",
              icon: "error",
            },
          });
        }
      }
    } catch (error) {
      console.error(
        "Error ProjectCreateWithForm -  get team structure list",
        error
      );
    }
  };

  const getTeamExpansionList = async () => {
    try {
      const request = await http.get({
        url: PROJECT_URL.TEAM_EXPANSION,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseTeamExpansionList = JSON.parse(request.Data);
        setTeamExpansionList([...parseTeamExpansionList]);
      } else {
        if (request.status !== "SUCCESS") {
          return alertFactory({
            type: "feedback",
            params: {
              title:
                "Something went wrong with team expansion options, please try again.",
              icon: "error",
            },
          });
        }
      }
    } catch (error) {
      console.error(
        "Error ProjectCreateWithForm - get team expansion list",
        error
      );
    }
  };

  const postNewProject = async (newProject: ProjectInfoNew) => {
    try {
      const request = await http.post({
        url: PROJECT_URL.PROJECT_CREATE_DELETE_UPDATE,
        urlWithApi: false,
        isPrivate: true,
        data: newProject,
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
          title: "Project registered succesfully",
        },
      });

      methods.reset();
      navigate(PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.PROJECT);
    } catch (error) {
      console.error("Error - postNewProject", error);
    } finally {
      removeLoading();
    }
  };

  const onSubmit: SubmitHandler<ProjectFormInputs> = async (data) => {
    addLoading();

    const newProject = {
      project_id: "0",
      client_id: client?.id,
      project_name: data.projectName,
      proj_lead: data.projectLead,
      start_date: convertDateToStringFormatYYYYMMDD(data.projectStartDate),
      team_struc_id: data.teamStructure,
      team_exp_prosp_id: data.teamExpansion,
      proj_desc: data.projectDescription,
      active: "1",
    };

    postNewProject(newProject);
  };

  return (
    <Grid container mt={3}>
      <FormProvider {...methods}>
        <ProjectForm
          restProps={{
            onSubmit,
            validProjectDatesFromToday,
            teamStructureList,
            projectStartDate,
            teamExpansionList,
          }}
        />
      </FormProvider>
    </Grid>
  );
};
