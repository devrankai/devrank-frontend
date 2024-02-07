import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { SelectChangeEvent } from "@mui/material";
import { JOB_DESCRIPTION_URL } from "../../../constants/urls/job-info.constants";
import {
  useContractModelList,
  useContractPeriodList,
  useLocationList,
  useMeetingFrequencyList,
  useMethodologyList,
  useProbationPeriodList,
  useProjectStore,
  useRoleList,
  useSkillLevelList,
  useSkillList,
  useTechnologyList,
} from "../../../hooks";
import { useSpinner } from "../../../hooks/spinner/useSpinner";
import { JobInfo, JobInfoTestTask } from "../../../models";
import { PRIVATE_ROUTES } from "../../../routes";
import { http } from "../../../services";
import { alertFactory, convertForDataToJobInfo } from "../../../utils";
import { JobInfoForm } from "./JobInfoForm";

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
  id: number;
  name: string;
}[] = [
    { id: 1, name: "Yes" },
    { id: 0, name: "No" },
  ];

export const JobInfoCreate = () => {
  const navigate = useNavigate();
  const { addLoading, removeLoading } = useSpinner();
  const { project } = useProjectStore();

  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm<JobInfoInputs>({ mode: "onTouched" });

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

  const [multipleSelectValues, setMultipleSelectValues] = useState({
    mustHaveTechnologies: [],
    niceToHaveTechnologies: [],
    mustHaveSkills: [],
    niceToHaveSkills: [],
  });

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

  const postNewJobDescription = async (newJobDescription: JobInfo) => {
    try {
      const request = await http.post({
        url: JOB_DESCRIPTION_URL.JOB_DESCRIPTION_CREATE_DELETE_UPDATE,
        urlWithApi: false,
        isPrivate: true,
        data: newJobDescription,
      });

      if (request.status !== "SUCCESS") {
        return alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong while creating the job info position, please try again.",
            icon: "error",
          },
        });
      }

      alertFactory({
        type: "feedback",
        params: {
          title: "Position registered succesfully",
        },
      });

      // methods.reset();
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
    const newJobDescription = convertForDataToJobInfo(data, false, projectId);

    postNewJobDescription(newJobDescription);
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
        }}
      />
    </>
  );
};
