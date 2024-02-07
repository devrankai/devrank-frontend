import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SelectChangeEvent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { POSITION_URL } from "../../../constants";
import { JOB_DESCRIPTION_URL } from "../../../constants/urls/job-info.constants";
import { useSpinner } from "../../../hooks/spinner/useSpinner";
import {
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
import { PRIVATE_ROUTES } from "../../../routes";
import { http } from "../../../services";
import {
  alertFactory,
  convertTimestampDateToDateFormatMMDDYYYY,
  parseJobEdit,
} from "../../../utils";
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

// TODO: este quedará ... corregir el create
// const testTask: JobInfoTestTask[] = [
//   { id: "1", name: "Yes" },
//   { id: "0", name: "No" },
// ];

const testTask: JobInfoTestTask[] = [
  { id: "1", name: "Yes" },
  { id: "2", name: "No" },
];

const timeTrackingProp: {
  id: number;
  name: string;
}[] = [
  { id: 1, name: "Yes" },
  { id: 2, name: "No" },
];

type multipleSelectTypes = {
  [key: string]: string[];
};

const isEdit: boolean = true;

export const JobInfoEdit = () => {
  const { addLoading, removeLoading } = useSpinner();
  const navigate = useNavigate();

  const { id } = useParams();

  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm<JobInfoInputs>({
      defaultValues: {
        testTask: "2", // Establece un valor predeterminado aquí
        // Otros valores predeterminados...
      },
    });

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
          },
        });

        if (request.status === "SUCCESS") {
          const parsePositionData = JSON.parse(request.Data)[0];
          console.log("parsePositionData", { parsePositionData });

          setValue(`role`, parsePositionData.role_id?.toString());
          setValue(
            `position`,
            parsePositionData.number_of_positions?.toString()
          );

          // FIXME: TODO: FALTA -->> contract_period_id nos retorna nullo en todos y time_tracking null en dos primeros y despues un 12 .

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
            parsePositionData.test_task_id > 0 &&
            parsePositionData.test_task_id < 3
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
            parsePositionData.time_tracking_id > 0 &&
            parsePositionData.time_tracking_id < 3
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

    if (id) getJobInfoDataToEdit(id);
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

  const onSubmit: SubmitHandler<JobInfoInputs> = (data: { role: string }) => {
    // addLoading();
    // TODO: armar el objeto probando que earliestStartDate use la fecha por defecto, y positionClosedByDate sea cambiada ... ver si se arma bien
    const newJobDescription = {
      role: data.role,
    };

    console.log("SUBMIT", { data, newJobDescription });

    // postNewJobDescription(newJobDescription);
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
