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
