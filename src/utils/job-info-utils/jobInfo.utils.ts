import { convertYYYYMMDDToMMDDYYYY } from "..";
import { FormData, JobDescription } from "../../models";

export type TechnologyObject = {
  technologies_id: number;
};

export type ArrayOfTechnologyObjects = TechnologyObject[];

export const createTechnologiesArrayOfObjects = (
  stringArray: string[],
  objectKey: string
): ArrayOfTechnologyObjects => {
  return stringArray.map((str) => ({
    [objectKey]: Number(str),
  })) as ArrayOfTechnologyObjects;
};

export type SkillObject = {
  skills_id: number;
};

export type ArrayOfSkillsObjects = SkillObject[];

export const createSkillsArrayOfObjects = (
  stringArray: string[],
  objectKey: string
): ArrayOfSkillsObjects => {
  return stringArray.map((str) => ({
    [objectKey]: Number(str),
  })) as ArrayOfSkillsObjects;
};

export const convertForDataToJobInfo = (
  data: FormData,
  isUpdate: boolean,
  projectId: string,
  jobDescriptionId?: string
) => {
  const techMustToHave = createTechnologiesArrayOfObjects(
    data.mustHaveTechnologies,
    "technologies_id"
  );
  const techNiceToHave = createTechnologiesArrayOfObjects(
    data.niceToHaveTechnologies,
    "technologies_id"
  );
  const skillsMustToHave = createSkillsArrayOfObjects(
    data.mustHaveSkills,
    "skills_id"
  );
  const skillsNiceToHave = createSkillsArrayOfObjects(
    data.niceToHaveSkills,
    "skills_id"
  );

  const newJobDescription: JobDescription = {
    job_desc_id: isUpdate ? jobDescriptionId || "0" : "0",
    project_id: projectId,
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
    contract_period_id: data.contractPeriod,
    time_tracking_id: data.timeTracking,
    active: "1",
    tech_must_to_have: techMustToHave,
    tech_nice_to_have: techNiceToHave,
    skills_must_to_have: skillsMustToHave,
    skills_nice_to_have: skillsNiceToHave,
  };

  return newJobDescription;
};
