import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Grid } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ProjectForm } from "../..";
import { PROJECT_URL } from "../../../constants";
import { ProjectInfoNew, ProjectModel } from "../../../models";
import { PRIVATE_ROUTES } from "../../../routes";
import { projectFormSchema } from "../../../schemas";
import { http } from "../../../services";
import {
  alertFactory,
  convertDateToStringFormatYYYYMMDD,
  convertTimestampDateToDateFormatMMDDYYYY,
} from "../../../utils";
import { useSpinner } from "../../../hooks/spinner/useSpinner";
import { useClientStore } from "../../../hooks/client-store/useClientStore.hook";
import { useTeamExpansionList, useTeamStructureList } from "../../../hooks";

export interface ProjectFormInputs {
  projectName: string;
  projectLead: string;
  projectStartDate: Date;
  teamStructure: string;
  teamExpansion: string;
  projectDescription: string;
}

export const ProjectEditWithForm = () => {
  const { client } = useClientStore();
  const navigate = useNavigate();

  const { addLoading, removeLoading } = useSpinner();

  const { id } = useParams();

  const { teamStructureList, getTeamStructureList } = useTeamStructureList();
  const { teamExpansionList, getTeamExpansionList } = useTeamExpansionList();

  const [projectStartDate, setProjectStartDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );

  const validProjectDatesFromToday = useState<Dayjs | null>(dayjs(new Date()));

  const methods = useForm<ProjectFormInputs>();

  useEffect(() => {
    getTeamStructureList();
    getTeamExpansionList();

    if (id) {
      getProjectById(id);
    } else {
      alertFactory({
        type: "feedback",
        params: {
          title: "Something went wrong, please try again.",
          icon: "error",
        },
      });
      navigate(`${PRIVATE_ROUTES.DASHBOARD}${PRIVATE_ROUTES.PROJECT}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProjectById = async (id: string) => {
    addLoading();

    try {
      const request = await http.post({
        url: "project_info/get-info",
        urlWithApi: false,
        isPrivate: true,
        data: {
          project_id: id,
        },
      });

      if (request.status === "SUCCESS") {
        const parseProject = JSON.parse(request.Data);

        const adaptProjectData = new ProjectModel(parseProject[0]);

        methods.setValue(
          `${projectFormSchema.projectName.name}`,
          adaptProjectData.project_name
        );

        //* TODO: project lead aun no está
        methods.setValue(
          `${projectFormSchema.projectLead.name}`,
          adaptProjectData.project_lead
        );

        setProjectStartDate(
          dayjs(
            convertTimestampDateToDateFormatMMDDYYYY(
              adaptProjectData.start_date
            )
          )
        );

        methods.setValue(
          `${projectFormSchema.teamStructure.name}`,
          adaptProjectData.team_structure_id
        );

        methods.setValue(
          `${projectFormSchema.teamExpansion.name}`,
          adaptProjectData.team_expansion_prospects_id
        );

        methods.setValue(
          `${projectFormSchema.projectDescription.name}`,
          adaptProjectData.project_desc
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
    } catch (error) {
      console.error("error getProjectById", error);
    } finally {
      removeLoading();
    }
  };

  const postEditProject = async (newProject: ProjectInfoNew) => {
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
              "Something went wrong while editing the project, please try again.",
            icon: "error",
          },
        });
      }

      alertFactory({
        type: "feedback",
        params: {
          title: "Project edited successfully",
        },
      });

      methods.reset();
      navigate(PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.PROJECT);
    } catch (error) {
      console.error("Error - postEditProject", error);
    } finally {
      removeLoading();
    }
  };

  const onSubmit: SubmitHandler<ProjectFormInputs> = async (data) => {
    if (!id) {
      return alertFactory({
        type: "feedback",
        params: {
          title:
            "Something went wrong while editing the project, please try again.",
          icon: "error",
        },
      });
    }

    const newProject = {
      project_id: id,
      client_id: client?.id,
      project_name: data.projectName,
      proj_lead: data.projectLead,
      start_date: convertDateToStringFormatYYYYMMDD(data.projectStartDate),
      team_struc_id: data.teamStructure,
      team_exp_prosp_id: data.teamExpansion,
      proj_desc: data.projectDescription,
      active: "1",
    };

    postEditProject(newProject);
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
