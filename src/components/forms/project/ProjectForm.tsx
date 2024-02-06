import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Select,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { PrimaryButtonWithNavigation } from "../..";
import { useErrorsValidationForm } from "../../../hooks";
import {
  ProjectInfoTeamExpansion,
  ProjectInfoTeamStructure,
} from "../../../models";
import { PRIVATE_ROUTES } from "../../../routes";
import { projectFormSchema } from "../../../schemas";
import { ProjectFormInputs } from "./ProjectEdit";
import { styles } from "./ProjectFormStyles";

type IFormInputsTypes = {
  restProps: {
    onSubmit: SubmitHandler<ProjectFormInputs>;
    validProjectDatesFromToday: [
      dayjs.Dayjs | null,
      React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
    ];
    teamStructureList: ProjectInfoTeamStructure[];
    teamExpansionList: ProjectInfoTeamExpansion[];
    projectStartDate: Dayjs | null;
  };
};

export const ProjectForm = ({
  restProps: {
    onSubmit,
    validProjectDatesFromToday,
    teamStructureList,
    projectStartDate,
    teamExpansionList,
  },
}: IFormInputsTypes) => {
  const { errorsValidationForm } = useErrorsValidationForm();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useFormContext<ProjectFormInputs>();

  return (
    <Grid container mt={3}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={11} sm={11.3} my={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel
                htmlFor={projectFormSchema.projectName.id}
                sx={styles.label}
              >
                {projectFormSchema.projectName.label}
              </InputLabel>
              <OutlinedInput
                id={projectFormSchema.projectName.id}
                label={projectFormSchema.projectName.label}
                placeholder={projectFormSchema.projectName.placeholder}
                fullWidth
                sx={styles.input}
                {...register(projectFormSchema.projectName.name, {
                  required: {
                    value: true,
                    message: "Project name is required",
                  },
                })}
              />
              {errors &&
                errorsValidationForm({
                  errors: errors,
                  errorKey: "projectName",
                })}
            </FormControl>
          </Grid>
          <Grid item xs={11} sm={11.3} my={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel
                htmlFor={projectFormSchema.projectLead.id}
                sx={styles.label}
              >
                {projectFormSchema.projectLead.label}
              </InputLabel>
              <OutlinedInput
                id={projectFormSchema.projectLead.id}
                label={projectFormSchema.projectLead.label}
                placeholder={projectFormSchema.projectLead.placeholder}
                fullWidth
                sx={styles.input}
                {...register(projectFormSchema.projectLead.name, {
                  required: {
                    value: true,
                    message: "Project lead is required",
                  },
                })}
              />
              {errors &&
                errorsValidationForm({
                  errors: errors,
                  errorKey: "projectLead",
                })}
            </FormControl>
          </Grid>
          <Grid
            item
            xs={11}
            sm={5.9}
            mb={3}
            mt={{ xs: 2, sm: 1 }}
            mr={{ xs: 2, sm: 3 }}
          >
            <Controller
              control={control}
              name={projectFormSchema.projectStartDate.name}
              defaultValue={dayjs().format("YYYY-MM-DD")}
              rules={{
                required: { value: true, message: "Date is required" },
              }}
              render={({ field: { onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Project Start Date"
                      value={projectStartDate}
                      onChange={(newValue) => onChange(newValue)}
                      minDate={validProjectDatesFromToday[0]}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid item xs={11} sm={5} mb={3} mt={{ xs: 2, sm: 3 }} mr={2}>
            <Controller
              name={projectFormSchema.teamStructure.name}
              control={control}
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <InputLabel
                    id={projectFormSchema.teamStructure.id}
                    sx={styles.label}
                  >
                    {projectFormSchema.teamStructure.label}
                  </InputLabel>
                  <Select
                    value={value}
                    id={projectFormSchema.teamStructure.id}
                    fullWidth
                    native
                    sx={styles.select}
                    {...register(projectFormSchema.teamStructure.name, {
                      required: {
                        value: true,
                        message: "Team structure is required",
                      },
                    })}
                  >
                    <option value="">Select option</option>
                    {teamStructureList.map((teamStructure) => {
                      return (
                        <option
                          value={teamStructure.team_structure_id?.toString()}
                          key={teamStructure.team_structure_id}
                        >
                          {teamStructure.team_structure_name}
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
                errorKey: "teamStructure",
              })}
          </Grid>
          <Grid item xs={11} sm={5.5} my={3} mr={2}>
            <Controller
              name={projectFormSchema.teamExpansion.name}
              control={control}
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <InputLabel
                    id={projectFormSchema.teamExpansion.id}
                    sx={styles.label}
                  >
                    {projectFormSchema.teamExpansion.label}
                  </InputLabel>
                  <Select
                    value={value}
                    id={projectFormSchema.teamExpansion.id}
                    fullWidth
                    native
                    sx={styles.select}
                    {...register(projectFormSchema.teamExpansion.name, {
                      required: {
                        value: true,
                        message: "Team expansion is required",
                      },
                    })}
                  >
                    <option value="">Select option</option>
                    {teamExpansionList.map((teamExpansion) => {
                      return (
                        <option
                          value={teamExpansion.team_expansion_id?.toString()}
                          key={teamExpansion.team_expansion_id}
                        >
                          {teamExpansion.team_expansion_name}
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
                errorKey: "teamExpansion",
              })}
          </Grid>
          <Grid item xs={11} sm={11.3} my={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel
                htmlFor={projectFormSchema.projectDescription.id}
                sx={styles.label}
              >
                {projectFormSchema.projectDescription.label}
              </InputLabel>
              <OutlinedInput
                id={projectFormSchema.projectDescription.id}
                label={projectFormSchema.projectDescription.label}
                placeholder={projectFormSchema.projectDescription.placeholder}
                fullWidth
                multiline
                maxRows={3}
                sx={styles.textarea}
                {...register(projectFormSchema.projectDescription.name, {
                  required: {
                    value: true,
                    message: "Project description is required",
                  },
                })}
              />
              {errors &&
                errorsValidationForm({
                  errors: errors,
                  errorKey: "projectDescription",
                })}
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={styles.btnContainer}>
          <PrimaryButtonWithNavigation
            btnVariant="outlined"
            btnTxt="Back"
            btnUrl={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.PROJECT}
          />
          <Button variant="contained" sx={{ width: "202px" }} type="submit">
            Submit
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
};
