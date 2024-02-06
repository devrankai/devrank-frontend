import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useErrorsValidationForm } from "../../../../hooks";
import {
  JobInfoContractModel,
  JobInfoContractPeriod,
  JobInfoLocation,
  JobInfoMeetingFrequency,
  JobInfoMethodology,
  JobInfoProbationPeriod,
} from "../../../../models";
import { jobDescriptionFormSchema } from "../../../../schemas";
import { JobInfoInputs } from "../JobInfoCreate";
import { styles } from "../JobInfoFormStyles";

type SecondStepJobInfoFormsTypes = {
  control: Control<JobInfoInputs, any>;
  register: UseFormRegister<JobInfoInputs>;
  watch: UseFormWatch<JobInfoInputs>;
  errors: FieldErrors<JobInfoInputs>;
  methodologyList: JobInfoMethodology[];
  contractPeriodList: JobInfoContractPeriod[];
  probationPeriodList: JobInfoProbationPeriod[];
  meetingFrequencyList: JobInfoMeetingFrequency[];
  contractModelList: JobInfoContractModel[];
  timeTrackingProp: {
    id: number;
    name: string;
  }[];
  locationList: JobInfoLocation[];
};

export const SecondStepJobInfoForms = ({
  control,
  register,
  watch,
  errors,
  methodologyList,
  contractPeriodList,
  probationPeriodList,
  meetingFrequencyList,
  contractModelList,
  timeTrackingProp,
  locationList,
}: SecondStepJobInfoFormsTypes) => {
  const { errorsValidationForm } = useErrorsValidationForm();

  const watchDateInputs = watch(["earliestStartDate", "positionClosedByDate"]);

  return (
    <>
      <Grid item xs={11} sm={5.5} my={3} mr={2}>
        <Controller
          name="methodology"
          control={control}
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <InputLabel
                id={jobDescriptionFormSchema.methodology.id}
                sx={styles.label}
              >
                {jobDescriptionFormSchema.methodology.label}
              </InputLabel>
              <Select
                value={value}
                id={jobDescriptionFormSchema.methodology.id}
                fullWidth
                native
                sx={styles.select}
                {...register("methodology", {
                  required: {
                    value: false,
                    message: "Methodology is required",
                  },
                })}
              >
                <option value="">Select option</option>
                {methodologyList.map((methodology) => (
                  <option
                    key={methodology.dev_methodology_id}
                    value={methodology.dev_methodology_id?.toString()}
                  >
                    {methodology.dev_methodology_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
        />
        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: "methodology",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2}>
        <Controller
          name="contractModel"
          control={control}
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <InputLabel
                id={jobDescriptionFormSchema.contractModel.id}
                sx={styles.label}
              >
                {jobDescriptionFormSchema.contractModel.label}
              </InputLabel>
              <Select
                value={value}
                id={jobDescriptionFormSchema.contractModel.id}
                fullWidth
                native
                sx={styles.select}
                {...register("contractModel", {
                  required: {
                    value: false,
                    message: `${jobDescriptionFormSchema.contractModel.name} is required`,
                  },
                })}
              >
                <option value="">Select option</option>
                {contractModelList.map((contractModel) => {
                  return (
                    <option
                      value={`${contractModel.contract_model_id}`}
                      key={contractModel.contract_model_name}
                    >
                      {contractModel.contract_model_name}
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
            errorKey: "contractModel",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2}>
        <Controller
          name="meetingFrequency"
          control={control}
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <InputLabel
                id={jobDescriptionFormSchema.meetingFrequency.id}
                sx={styles.label}
              >
                {jobDescriptionFormSchema.meetingFrequency.label}
              </InputLabel>
              <Select
                value={value}
                id={jobDescriptionFormSchema.meetingFrequency.id}
                fullWidth
                native
                sx={styles.select}
                {...register("meetingFrequency", {
                  required: {
                    value: false,
                    message: `${jobDescriptionFormSchema.meetingFrequency.name} is required`,
                  },
                })}
              >
                <option value="">Select option</option>
                {meetingFrequencyList.map((meetingFrequency) => {
                  return (
                    <option
                      value={meetingFrequency.meeting_frequency_id?.toString()}
                      key={meetingFrequency.meeting_frequency_name}
                    >
                      {meetingFrequency.meeting_frequency_name}
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
            errorKey: "meetingFrequency",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2}>
        <Controller
          name="contractPeriod"
          control={control}
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <InputLabel
                id={jobDescriptionFormSchema.contractPeriod.id}
                sx={styles.label}
              >
                {jobDescriptionFormSchema.contractPeriod.label}
              </InputLabel>
              <Select
                value={value}
                id={jobDescriptionFormSchema.contractPeriod.id}
                fullWidth
                native
                sx={styles.select}
                {...register("contractPeriod", {
                  required: {
                    value: false,
                    message: `${jobDescriptionFormSchema.contractPeriod.name} is required`,
                  },
                })}
              >
                <option value="">Select option</option>
                {contractPeriodList.map((contractPeriod) => {
                  return (
                    <option
                      value={contractPeriod.contract_period_id?.toString()}
                      key={contractPeriod.contract_period_name}
                    >
                      {contractPeriod.contract_period_name}
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
            errorKey: "contractPeriod",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2}>
        <Controller
          name="timeTracking"
          control={control}
          render={({ field: { onChange } }) => (
            <FormControl>
              <InputLabel
                id={jobDescriptionFormSchema.timeTracking.id}
                sx={styles.label}
              >
                {jobDescriptionFormSchema.timeTracking.label}
              </InputLabel>
              <RadioGroup
                row
                aria-labelledby="Time tracking yes or no"
                name={jobDescriptionFormSchema.timeTracking.name}
                onChange={onChange}
              >
                {timeTrackingProp.map((timeTracking) => (
                  <FormControlLabel
                    key={timeTracking.id + timeTracking.name}
                    value={timeTracking.id}
                    control={<Radio />}
                    label={timeTracking.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2}>
        <Controller
          name="location"
          control={control}
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <InputLabel
                id={jobDescriptionFormSchema.location.id}
                sx={styles.label}
              >
                {jobDescriptionFormSchema.location.label}
              </InputLabel>
              <Select
                value={value}
                id={jobDescriptionFormSchema.location.id}
                fullWidth
                native
                sx={styles.select}
                {...register("location", {
                  required: {
                    value: false,
                    message: "Location is required",
                  },
                })}
              >
                <option value="">Select option</option>
                {locationList.map((location) => {
                  return (
                    <option
                      value={location.location_id?.toString()}
                      key={location.location_name}
                    >
                      {location.location_name}
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
            errorKey: "location",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2}>
        <Controller
          control={control}
          name="earliestStartDate"
          defaultValue={dayjs().format("YYYY-MM-DD")}
          rules={{
            required: { value: true, message: "Date is required" },
          }}
          render={({ field: { onChange } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Earliest Start Date"
                  value={
                    !watchDateInputs[0]
                      ? dayjs(new Date())
                      : dayjs(watchDateInputs[0])
                  }
                  onChange={(newValue) => onChange(newValue)}
                  minDate={dayjs(new Date())}
                />
              </DemoContainer>
            </LocalizationProvider>
          )}
        />
        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: "earliestStartDate",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2}>
        <Controller
          control={control}
          name="positionClosedByDate"
          defaultValue={dayjs().format("YYYY-MM-DD")}
          rules={{
            required: { value: true, message: "Date is required" },
          }}
          render={({ field: { onChange } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Project Start Date"
                  value={
                    !watchDateInputs[1]
                      ? dayjs(new Date())
                      : dayjs(watchDateInputs[1])
                  }
                  onChange={(newValue) => onChange(newValue)}
                  minDate={dayjs(new Date())}
                />
              </DemoContainer>
            </LocalizationProvider>
          )}
        />
        {errors &&
          errorsValidationForm({
            errors: errors,
            errorKey: "positionClosedByDate",
          })}
      </Grid>
      <Grid item xs={11} sm={5.5} my={3} mr={2}>
        <Controller
          name="probationPeriod"
          control={control}
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <InputLabel
                id={jobDescriptionFormSchema.probationPeriod.id}
                sx={styles.label}
              >
                {jobDescriptionFormSchema.probationPeriod.label}
              </InputLabel>
              <Select
                value={value}
                id={jobDescriptionFormSchema.probationPeriod.id}
                fullWidth
                native
                sx={styles.select}
                {...register("probationPeriod", {
                  required: {
                    value: false,
                    message: `${jobDescriptionFormSchema.probationPeriod.name} is required`,
                  },
                })}
              >
                <option value="">Select option</option>
                {probationPeriodList.map((probationPeriod) => {
                  return (
                    <option
                      value={probationPeriod.probation_period_id?.toString()}
                      key={probationPeriod.probation_period_name}
                    >
                      {probationPeriod.probation_period_name}
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
            errorKey: "probationPeriod",
          })}
      </Grid>
    </>
  );
};
