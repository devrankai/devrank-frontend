import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { useErrorsValidationForm } from "../../../../hooks";
import {
  JobInfoRole,
  JobInfoSkill,
  JobInfoSkillLevel,
  JobInfoTechnology,
  JobInfoTestTask,
} from "../../../../models";
import { jobDescriptionFormSchema } from "../../../../schemas";
import { JobInfoInputs } from "../JobInfoCreate";
import { styles } from "../JobInfoFormStyles";

type FirstStepJobInfoFormsTypes = {
  control: Control<JobInfoInputs, any>;
  register: UseFormRegister<JobInfoInputs>;
  roleList: JobInfoRole[];
  errors: FieldErrors<JobInfoInputs>;
  technologyList: JobInfoTechnology[];
  niceToHaveTechnologyList: JobInfoTechnology[];
  skillList: JobInfoSkill[];
  niceToHaveSkillList: JobInfoSkill[];
  skillLevelList: JobInfoSkillLevel[];
  testTask: JobInfoTestTask[];
  handleChangeMultipleSelect: (
    e: SelectChangeEvent<any>,
    inputName: any
  ) => void;
  multipleSelectValues: {
    [key: string]: string[];
  };
};

export const FirstStepJobInfoForms = ({
  control,
  register,
  roleList,
  errors,
  technologyList,
  niceToHaveTechnologyList,
  skillList,
  niceToHaveSkillList,
  testTask,
  skillLevelList,
  handleChangeMultipleSelect,
  multipleSelectValues,
}: FirstStepJobInfoFormsTypes) => {
  const { errorsValidationForm } = useErrorsValidationForm();

  return (
    <>
      <Grid item xs={11} sm={5.5} my={3} mr={2}>
        <Controller
          name="role"
          control={control}
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <InputLabel
                id={jobDescriptionFormSchema.role.id}
                sx={styles.label}
              >
                {jobDescriptionFormSchema.role.label}
              </InputLabel>
              <Select
                value={value}
                id={jobDescriptionFormSchema.role.id}
                fullWidth
                native
                sx={styles.select}
                {...register("role", {
                  required: {
                    value: false,
                    message: "Role is required",
                  },
                })}
              >
                <option value="">Select option</option>
                {roleList.map((role) => {
                  return (
                    <option
                      value={role.role_id?.toString()}
                      key={role.role_name}
                    >
                      {role.role_name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          )}
        />
        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: "role",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel
            htmlFor={jobDescriptionFormSchema.position.id}
            sx={styles.label}
          >
            {jobDescriptionFormSchema.position.label}
          </InputLabel>
          <OutlinedInput
            id={jobDescriptionFormSchema.position.id}
            label={jobDescriptionFormSchema.position.label}
            placeholder={jobDescriptionFormSchema.position.placeholder}
            fullWidth
            sx={styles.input}
            {...register("position", {
              required: {
                value: true,
                message: "Position is required",
              },
            })}
          />
          {errors &&
            errorsValidationForm({
              errors: errors,
              errorKey: "position",
            })}
        </FormControl>
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2} sx={{ m: 1, width: 300 }}>
        <FormControl id="form-control-mustHaveTechnologies">
          <InputLabel
            id={jobDescriptionFormSchema.mustHaveTechnologies.id}
            sx={styles.label}
          >
            {jobDescriptionFormSchema.mustHaveTechnologies.label}
          </InputLabel>
          <Select
            labelId="mustHaveTechnologies"
            id="demo-mustHaveTechnologies"
            multiple
            value={multipleSelectValues["mustHaveTechnologies"]}
            onChange={(e) =>
              handleChangeMultipleSelect(e, "mustHaveTechnologies")
            }
            input={<OutlinedInput label="Must have technologies" />}
            MenuProps={{ style: { maxHeight: 280, zIndex: 800 } }}
          >
            {technologyList.map((technology) => (
              <MenuItem
                value={technology.technologies_id?.toString()}
                key={technology.technologies_id}
                className="mustHaveTechnologies"
              >
                {technology.technologies_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: "mustHaveTechnologies",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2} sx={{ m: 1, width: 300 }}>
        <FormControl id="form-control-niceToHaveTechnologies">
          <InputLabel
            id={jobDescriptionFormSchema.niceToHaveTechnologies.id}
            sx={styles.label}
          >
            {jobDescriptionFormSchema.niceToHaveTechnologies.label}
          </InputLabel>
          <Select
            labelId="niceToHaveTechnologies"
            id="demo-niceToHaveTechnologies"
            multiple
            value={multipleSelectValues["niceToHaveTechnologies"]}
            onChange={(e) =>
              handleChangeMultipleSelect(e, "niceToHaveTechnologies")
            }
            input={<OutlinedInput label="Nide to have technologies" />}
            MenuProps={{ style: { maxHeight: 280, zIndex: 800 } }}
          >
            {niceToHaveTechnologyList.map((technology) => (
              <MenuItem
                value={technology.technologies_id?.toString()}
                key={technology.technologies_name}
                className="niceToHaveTechnologies"
              >
                {technology.technologies_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: "niceToHaveTechnologies",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2} sx={{ m: 1, width: 300 }}>
        <FormControl id="form-control-mustHaveSkills">
          <InputLabel
            id={jobDescriptionFormSchema.mustHaveSkills.id}
            sx={styles.label}
          >
            {jobDescriptionFormSchema.mustHaveSkills.label}
          </InputLabel>
          <Select
            labelId="mustHaveSkills"
            id="demo-mustHaveSkills"
            multiple
            value={multipleSelectValues["mustHaveSkills"]}
            onChange={(e) => handleChangeMultipleSelect(e, "mustHaveSkills")}
            input={<OutlinedInput label="Must have skills" />}
            MenuProps={{ style: { maxHeight: 280, zIndex: 800 } }}
          >
            {skillList.map((skill) => (
              <MenuItem
                value={skill.skills_id?.toString()}
                key={skill.skills_id}
                className="mustHaveSkills"
              >
                {skill.skills_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: "mustHaveSkills",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2} sx={{ m: 1, width: 300 }}>
        <FormControl id="form-control-niceToHaveSkills">
          <InputLabel
            id={jobDescriptionFormSchema.niceToHaveSkills.id}
            sx={styles.label}
          >
            {jobDescriptionFormSchema.niceToHaveSkills.label}
          </InputLabel>
          <Select
            labelId="niceToHaveSkills"
            id="demo-niceToHaveSkills"
            multiple
            value={multipleSelectValues["niceToHaveSkills"]}
            onChange={(e) => handleChangeMultipleSelect(e, "niceToHaveSkills")}
            input={<OutlinedInput label="Must have skills" />}
            MenuProps={{ style: { maxHeight: 280, zIndex: 800 } }}
          >
            {niceToHaveSkillList.map((skillList) => (
              <MenuItem
                value={skillList.skills_id?.toString()}
                key={skillList.skills_id}
                className="niceToHaveSkills"
              >
                {skillList.skills_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: "niceToHaveSkills",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2}>
        <Controller
          name="testTask"
          control={control}
          render={({ field }) => (
            <FormControl>
              <InputLabel
                id={jobDescriptionFormSchema.testTask.id}
                sx={styles.label}
              >
                {jobDescriptionFormSchema.testTask.label}
              </InputLabel>
              <RadioGroup row aria-labelledby="Test task yes or no" {...field}>
                {testTask.map((task, index) => (
                  <FormControlLabel
                    key={index + "testTask"}
                    value={task.id}
                    control={<Radio />}
                    label={task.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        />

        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: "testTask",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2}>
        <Controller
          name="skillLevel"
          control={control}
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <InputLabel
                id={jobDescriptionFormSchema.skillLevel.id}
                sx={styles.label}
              >
                {jobDescriptionFormSchema.skillLevel.label}
              </InputLabel>
              <Select
                value={value}
                id={jobDescriptionFormSchema.skillLevel.id}
                fullWidth
                native
                sx={styles.select}
                {...register("skillLevel", {
                  required: {
                    value: false,
                    message: "Skill level is required",
                  },
                })}
              >
                <option value="">Select option</option>
                {skillLevelList.map((skill) => {
                  return (
                    <option
                      value={skill.skill_level_id?.toString()}
                      key={skill.skill_level_id}
                    >
                      {skill.skill_level_name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          )}
        />
        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: "skillLevel",
          })}
      </Grid>
    </>
  );
};
