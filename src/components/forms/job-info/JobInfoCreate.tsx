import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  JobInfo,
  JobInfoContractModel,
  JobInfoContractPeriod,
  JobInfoLocation,
  JobInfoMeetingFrequency,
  JobInfoMethodology,
  JobInfoProbationPeriod,
  JobInfoRole,
  JobInfoSkill,
  JobInfoSkillLevel,
  JobInfoTechnology,
  JobInfoTestTask,
} from "../../../models";
import { http } from "../../../services";
import { alertFactory, convertYYYYMMDDToMMDDYYYY, createSkillsArrayOfObjects, createTechnologiesArrayOfObjects } from "../../../utils";
import { JobInfoForm } from "./JobInfoForm";
import { JOB_DESCRIPTION_URL } from "../../../constants/urls/job-info.constants";
import { SelectChangeEvent } from "@mui/material";
import { useSpinner } from "../../../hooks/spinner/useSpinner";
import { useProjectStore } from "../../../hooks";
import { PRIVATE_ROUTES } from "../../../routes";


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
    { id: 2, name: "No" },
  ];

export const JobInfoCreate = () => {
  const navigate = useNavigate();
  const { addLoading, removeLoading } = useSpinner();
  const { project } = useProjectStore();

  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm<JobInfoInputs>();

  const [disabledSubmitButton, setDisabledSubmitButton] =
    useState<boolean>(true);
  const [disabledNextButton, setDisabledNextButton] = useState<boolean>(true);

  const [roleList, setRoleList] = useState<JobInfoRole[]>([]);
  const [technologyList, setTechnologyList] = useState<JobInfoTechnology[]>([]);
  const [niceToHaveTechnologyList, setNiceToHaveTechnologyList] = useState<
    JobInfoTechnology[]
  >([]);
  const [skillList, setSkillList] = useState<JobInfoSkill[]>([]);
  const [niceToHaveSkillList, setNiceToHaveSkillList] = useState<
    JobInfoSkill[]
  >([]);
  const [skillLevelList, setSkillLevelList] = useState<JobInfoSkillLevel[]>([]);

  const [locationList, setLocationList] = useState<JobInfoLocation[]>([]);
  const [methodologyList, setMethodologyList] = useState<JobInfoMethodology[]>(
    []
  );
  const [contractModelList, setContractModelList] = useState<
    JobInfoContractModel[]
  >([]);
  const [meetingFrequencyList, setMeetingFrequencyList] = useState<
    JobInfoMeetingFrequency[]
  >([]);
  const [contractPeriodList, setContractPeriodList] = useState<
    JobInfoContractPeriod[]
  >([]);
  const [probationPeriodList, setProbationPeriodList] = useState<
    JobInfoProbationPeriod[]
  >([]);

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

          // TODO: ver que poner en el [+ para que esto se ejecute en el Step 2] FIXME: Mensaje dejado por Euge
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
      console.log({ value });
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

  const getRoleList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_ROLES,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseRoleList = JSON.parse(request.Data);
        setRoleList([...parseRoleList]);
      } else {
        if (request.status !== "SUCCESS") {
          return alertFactory({
            type: "feedback",
            params: {
              title:
                "Something went wrong with role options, please try again.",
              icon: "error",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error - get role list", { error });
    }
  };

  const getTechnologyList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_TECHNOLOGIES,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseTechnologyList = JSON.parse(request.Data);
        setTechnologyList([...parseTechnologyList]);
        setNiceToHaveTechnologyList([...parseTechnologyList]);
      } else {
        if (request.status !== "SUCCESS") {
          return alertFactory({
            type: "feedback",
            params: {
              title:
                "Something went wrong with technology options, please try again.",
              icon: "error",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error - get technology list", { error });
    }
  };

  const getSkillList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_SKILLS,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseSkillsList = JSON.parse(request.Data);
        setSkillList([...parseSkillsList]);
        setNiceToHaveSkillList([...parseSkillsList]);
      } else {
        if (request.status !== "SUCCESS") {
          return alertFactory({
            type: "feedback",
            params: {
              title:
                "Something went wrong with skills options, please try again.",
              icon: "error",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error - get skill list", { error });
    }
  };

  const getSkillLevelList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_LEVEL,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseLevelList = JSON.parse(request.Data);
        setSkillLevelList([...parseLevelList]);
      } else {
        if (request.status !== "SUCCESS") {
          return alertFactory({
            type: "feedback",
            params: {
              title:
                "Something went wrong with level options, please try again.",
              icon: "error",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error - get skill level list", { error });
    }
  };

  const getLocationList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_LOCATIONS,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseLocationList = JSON.parse(request.Data);
        setLocationList([...parseLocationList]);
      } else {
        if (request.status !== "SUCCESS") {
          return alertFactory({
            type: "feedback",
            params: {
              title:
                "Something went wrong with location options, please try again.",
              icon: "error",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error - get location list", { error });
    }
  };

  const getMethodologyList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_METHODOLOGIES,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseMethodologyList = JSON.parse(request.Data);
        setMethodologyList([...parseMethodologyList]);
      } else {
        if (request.status !== "SUCCESS") {
          return alertFactory({
            type: "feedback",
            params: {
              title:
                "Something went wrong with methodology options, please try again.",
              icon: "error",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error - get methodology list", { error });
    }
  };

  const getContractModelList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_CONTRACT_MODEL,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseContractModelList = JSON.parse(request.Data);
        setContractModelList([...parseContractModelList]);
      } else {
        if (request.status !== "SUCCESS") {
          return alertFactory({
            type: "feedback",
            params: {
              title:
                "Something went wrong with contract model options, please try again.",
              icon: "error",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error - get contract model list", { error });
    }
  };

  const getMeetingFrequencyList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_MEETING_FREQUENCY,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseMeetingFrequencyList = JSON.parse(request.Data);
        setMeetingFrequencyList([...parseMeetingFrequencyList]);
      } else {
        if (request.status !== "SUCCESS") {
          return alertFactory({
            type: "feedback",
            params: {
              title:
                "Something went wrong with meeting frequency options, please try again.",
              icon: "error",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error - get meeting frequency list", { error });
    }
  };

  const getContractPeriodList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_CONTRACT_PERIOD,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseContractPeriodList = JSON.parse(request.Data);
        setContractPeriodList([...parseContractPeriodList]);
      } else {
        if (request.status !== "SUCCESS") {
          return alertFactory({
            type: "feedback",
            params: {
              title:
                "Something went wrong with contract period options, please try again.",
              icon: "error",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error - get contract period list", { error });
    }
  };

  const getProbationPeriodList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_PROBATION_PERIOD,
        urlWithApi: false,
        isPrivate: true,
      });
      if (request.Status === "SUCCESS") {
        const parseProbationPeriodList = JSON.parse(request.Data);
        console.log("parseProbationPeriodList ", parseProbationPeriodList);
        setProbationPeriodList([...parseProbationPeriodList]);
      } else {
        if (request.status !== "SUCCESS") {
          return alertFactory({
            type: "feedback",
            params: {
              title:
                "Something went wrong with probation period options, please try again.",
              icon: "error",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error - get probation period list", { error });
    }
  };

  const handleChangeMultipleSelect = (
    e: SelectChangeEvent<any>,
    inputName: any // TODO: este no deberia ser any pero no se como tipearlo, se choca el string con el de setValue esperado
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
        data: newJobDescription
      })

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
      navigate(PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.CANDIDATE_REVIEW);
    }  catch (error) {
      console.error("Error - postNewPosition", error);
    } finally {
      removeLoading();
    }
  }

  const onSubmit: SubmitHandler<JobInfoInputs> = (data: any) => {
    addLoading();

    const techMustToHave = createTechnologiesArrayOfObjects(data.mustHaveTechnologies, "technologies_id");
    const techNiceToHave = createTechnologiesArrayOfObjects(data.niceToHaveTechnologies, "technologies_id");
    const skillsMustToHave = createSkillsArrayOfObjects(data.mustHaveSkills, "skills_id");
    const skillsNiceToHave = createSkillsArrayOfObjects(data.niceToHaveSkills, "skills_id")

    const newJobDescription: JobInfo = {
      job_desc_id: data.role,
      project_id: project?.id,
      role_id: data.role,
      number_of_positions: data.position,
      test_task_id: data.testTask,
      skill_level_id: data.skillLevel,
      dev_methodology_id: data.methodology,
      meeting_frequency_id: data.meetingFrequency,
      location_id: data.location,
      earliest_start_date: convertYYYYMMDDToMMDDYYYY(data.earliestStartDate),
      closed_by_date: convertYYYYMMDDToMMDDYYYY(data.positionClosedByDate),
      probation_period_id: data.probationPeriod,
      contract_model_id: data.contractModel,
      time_tracking_id: data.timeTracking,
      active: "1",
      tech_must_to_have: techMustToHave,
      tech_nice_to_have: techNiceToHave,
      skills_must_to_have: skillsMustToHave,
      skills_nice_to_have: skillsNiceToHave
    };

    console.log("SUBMIT", { data, newJobDescription });

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
