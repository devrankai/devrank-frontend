import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SelectChangeEvent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  JOB_DESCRIPTION_URL,
  POSITION_URL,
  persistedDataNameConstants,
} from "../../../constants";
import { useSpinner } from "../../../hooks/spinner/useSpinner";
import { JobDescription, JobInfoTestTask } from "../../../models";
import { PRIVATE_ROUTES } from "../../../routes";
import { http } from "../../../services";
import {
  alertFactory,
  convertForDataToJobInfo,
  convertTimestampDateToDateFormatMMDDYYYY,
  parseJobEdit,
  persistLocalStorage,
} from "../../../utils";
import { JobInfoForm } from "./JobInfoForm";
import {
  useContractModelList,
  useContractPeriodList,
  useLocationList,
  useMeetingFrequencyList,
  useMethodologyList,
  usePositionStore,
  useProbationPeriodList,
  useProjectStore,
  useRoleList,
  useSkillLevelList,
  useSkillList,
  useTechnologyList,
} from "../../../hooks";
import { POSITION_STATUS } from "../../../store";

export interface JobInfoInputs {
  role: string;
  position: string;
  mustHaveTechnologies: string[];
  niceToHaveTechnologies: string[];
  mustHaveSkills: string[];
  niceToHaveSkills: string[];
  testTask: string;
  skillLevel: string;
  methodology: string;
  contractModel: string;
  meetingFrequency: string;
  contractPeriod: string;
  timeTracking: string;
  location: string;
  earliestStartDate: Date | string;
  positionClosedByDate: Date | string;
  probationPeriod: string;
}

const testTask: JobInfoTestTask[] = [
  { id: "1", name: "Yes" },
  { id: "0", name: "No" },
];

const timeTrackingProp: {
  id: string;
  name: string;
}[] = [
  { id: "1", name: "Yes" },
  { id: "0", name: "No" },
];

type multipleSelectTypes = {
  [key: string]: string[];
};

const isEdit: boolean = true;

export const JobInfoEdit = () => {
  const { addLoading, removeLoading } = useSpinner();
  const navigate = useNavigate();
  const { project } = useProjectStore();
  const { startPosition } = usePositionStore();

  const { id } = useParams();

  const { register, handleSubmit, control, formState, watch, setValue, reset } =
    useForm<JobInfoInputs>({
      defaultValues: {
        testTask: "1",
      },
    });

  const [disabledSubmitButton, setDisabledSubmitButton] =
    useState<boolean>(true);
  const [disabledNextButton, setDisabledNextButton] = useState<boolean>(true);

  const { roleList, getRoleList } = useRoleList();
  const { technologyList, niceToHaveTechnologyList, getTechnologyList } =
    useTechnologyList();
  const { skillList, niceToHaveSkillList, getSkillList } = useSkillList();
  const { skillLevelList, getSkillLevelList } = useSkillLevelList();
  const { locationList, getLocationList } = useLocationList();
  const { methodologyList, getMethodologyList } = useMethodologyList();
  const { contractModelList, getContractModelList } = useContractModelList();
  const { meetingFrequencyList, getMeetingFrequencyList } =
    useMeetingFrequencyList();
  const { contractPeriodList, getContractPeriodList } = useContractPeriodList();
  const { probationPeriodList, getProbationPeriodList } =
    useProbationPeriodList();

  const [multipleSelectValues, setMultipleSelectValues] =
    useState<multipleSelectTypes>({
      mustHaveTechnologies: [],
      niceToHaveTechnologies: [],
      mustHaveSkills: [],
      niceToHaveSkills: [],
    });

  useEffect(() => {
    const getJobInfoDataToEdit = async (id: string) => {
      addLoading();
      try {
        const request = await http.post({
          url: POSITION_URL.POST_POSITIONS_LIST,
          urlWithApi: false,
          isPrivate: true,
          data: {
            job_desc_id: id,
            project_id: project?.id,
          },
        });

        if (request.status === "SUCCESS") {
          const parsePositionData = JSON.parse(request.Data)[0];

          setValue(`role`, parsePositionData.role_id?.toString());
          setValue(
            `position`,
            parsePositionData.number_of_positions?.toString()
          );

          const mustHaveTech: string[] = parseJobEdit({
            arrayInJSONFormat: request.tech_must_to_have,
            key: "technologies_id",
          });

          if (mustHaveTech.length > 0) {
            setValue(`mustHaveTechnologies`, mustHaveTech);
            setMultipleSelectValues((prevValue) => ({
              ...prevValue,
              mustHaveTechnologies: [...mustHaveTech],
            }));
          }

          const niceToHaveTech: string[] = parseJobEdit({
            arrayInJSONFormat: request.tech_nice_to_have,
            key: "technologies_id",
          });

          if (niceToHaveTech.length > 0) {
            setValue(`niceToHaveTechnologies`, niceToHaveTech);
            setMultipleSelectValues((prevValue) => ({
              ...prevValue,
              niceToHaveTechnologies: [...niceToHaveTech],
            }));
          }

          const skillsMustHave: string[] = parseJobEdit({
            arrayInJSONFormat: request.skills_must_to_have,
            key: "skills_id",
          });

          if (skillsMustHave.length > 0) {
            setValue(`mustHaveSkills`, skillsMustHave);
            setMultipleSelectValues((prevValue) => ({
              ...prevValue,
              mustHaveSkills: [...skillsMustHave],
            }));
          }
          const skillsNiceToHave: string[] = parseJobEdit({
            arrayInJSONFormat: request.skills_nice_to_have,
            key: "skills_id",
          });

          if (skillsNiceToHave.length > 0) {
            setValue(`niceToHaveSkills`, skillsNiceToHave);
            setMultipleSelectValues((prevValue) => ({
              ...prevValue,
              niceToHaveSkills: [...skillsNiceToHave],
            }));
          }

          const testTaskID =
            parsePositionData.test_task_id >= 0 &&
            parsePositionData.test_task_id < 2
              ? parsePositionData.test_task_id?.toString()
              : "";

          setValue(`testTask`, testTaskID);

          setValue(`skillLevel`, parsePositionData.skill_level_id?.toString());
          setValue(
            `methodology`,
            parsePositionData.dev_methodology_id?.toString()
          );
          setValue(
            `contractModel`,
            parsePositionData.contract_model_id?.toString()
          );
          setValue(
            `meetingFrequency`,
            parsePositionData.meeting_frequency_id?.toString()
          );

          setValue(
            `contractPeriod`,
            parsePositionData.contract_period_id?.toString()
          );

          const timeTrackingID =
            parsePositionData.test_task_id >= 0 &&
            parsePositionData.test_task_id < 2
              ? parsePositionData.time_tracking_id?.toString()
              : "";

          setValue(`timeTracking`, timeTrackingID);

          setValue(`location`, parsePositionData.location_id?.toString());

          setValue(
            `probationPeriod`,
            parsePositionData.probation_period_id?.toString()
          );

          const earlStartDate = convertTimestampDateToDateFormatMMDDYYYY(
            parsePositionData.earliest_start_date
          );

          setValue(`earliestStartDate`, earlStartDate);

          const positionClosedByDate = convertTimestampDateToDateFormatMMDDYYYY(
            parsePositionData.closed_by_date
          );

          setValue(`positionClosedByDate`, positionClosedByDate);
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
        console.error("Error JobInfoEdit - get job info data to edit", {
          error,
        });
      } finally {
        removeLoading();
      }
    };

    if (id && project?.id) getJobInfoDataToEdit(id);
    else {
      alertFactory({
        type: "feedback",
        params: {
          title: "Ocurred a problem to edit a job, please try again.",
          icon: "error",
        },
      });
      return navigate(PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.POSITION, {
        replace: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getLists = async () => {
      addLoading();
      try {
        await Promise.all([
          getRoleList(),
          getTechnologyList(),
          getSkillList(),
          getSkillLevelList(),

          getLocationList(),
          getMethodologyList(),
          getContractModelList(),
          getMeetingFrequencyList(),
          getContractPeriodList(),
          getProbationPeriodList(),
        ]);
      } catch (error) {
        console.error("Error JobInfoCreate - get list", { error });
      } finally {
        removeLoading();
      }
    };

    getLists();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = watch((value) => {
      //* first fields
      if (
        value.position &&
        value.role &&
        value.mustHaveTechnologies &&
        value.niceToHaveTechnologies &&
        value.mustHaveSkills &&
        value.niceToHaveSkills &&
        value.testTask &&
        value.skillLevel
      ) {
        setDisabledNextButton(false);
      } else {
        setDisabledNextButton(true);
      }

      //* second fields
      if (
        value.methodology &&
        value.contractModel &&
        value.meetingFrequency &&
        value.contractPeriod &&
        value.location &&
        value.probationPeriod
      ) {
        setDisabledSubmitButton(false);
      } else {
        setDisabledSubmitButton(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleChangeMultipleSelect = (
    e: SelectChangeEvent<any>,
    inputName: any
  ) => {
    setMultipleSelectValues((prevValue) => ({
      ...prevValue,
      [inputName]: [...e.target.value],
    }));

    setValue(inputName, [...e.target.value]);
  };

  const postUpdatedJobDescription = async (
    newJobDescription: JobDescription
  ) => {
    try {
      const request = await http.post({
        url: JOB_DESCRIPTION_URL.JOB_DESCRIPTION_CREATE_UPDATE,
        urlWithApi: false,
        isPrivate: true,
        data: newJobDescription,
      });

      if (request.status !== "SUCCESS") {
        return alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong while updating the job info position, please try again.",
            icon: "error",
          },
        });
      }

      persistLocalStorage(persistedDataNameConstants.POSITION_INFO, {
        positionID: `${newJobDescription.job_desc_id}`,
        statusPosition: POSITION_STATUS.SELECTED,
      });
      startPosition(newJobDescription.job_desc_id);

      alertFactory({
        type: "feedback",
        params: {
          title: "Position updated successfully",
        },
      });

      if (id) {
        persistLocalStorage(persistedDataNameConstants.POSITION_INFO, {
          positionID: { id },
          statusPosition: POSITION_STATUS.SELECTED,
        });

        startPosition(id);
      }

      reset();
      navigate(PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.SEARCH_RESULTS);
    } catch (error) {
      console.error("Error - postNewPosition", error);
    } finally {
      removeLoading();
    }
  };

  const onSubmit: SubmitHandler<JobInfoInputs> = (data: any) => {
    addLoading();

    const projectId = project?.id;
    const jobDescriptionId = id;
    const updateJobDescription = convertForDataToJobInfo(
      data,
      true,
      projectId,
      jobDescriptionId
    );

    postUpdatedJobDescription(updateJobDescription);
  };

  return (
    <>
      <JobInfoForm
        props={{
          onSubmit,
          handleChangeMultipleSelect,
          multipleSelectValues,
          contractPeriodList,
          probationPeriodList,
          meetingFrequencyList,
          testTask,
          roleList,
          technologyList,
          niceToHaveTechnologyList,
          skillList,
          niceToHaveSkillList,
          skillLevelList,
          locationList,
          methodologyList,
          timeTrackingProp,
          register,
          formState,
          watch,
          handleSubmit,
          control,
          disabledNextButton,
          disabledSubmitButton,
          contractModelList,
          isEdit,
        }}
      />
    </>
  );
};
