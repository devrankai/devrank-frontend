import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Select,
} from "@mui/material";

import {
  ClientInfoCity,
  ClientInfoCompanySize,
  ClientInfoIndustry,
  ClientInfoState,
} from "../../../models";

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { PrimaryButtonWithNavigation } from "../..";
import { PRIVATE_ROUTES } from "../../../routes";
import { clientFormSchema } from "../../../schemas";
import { styles } from "./ClientFormStyles";
import { useErrorsValidationForm } from "../../../hooks";

type ClientFormTypes = {
  restProps: {
    onSubmit: SubmitHandler<FieldValues>;
    stateList: ClientInfoState[];
    cityList: ClientInfoCity[];
    industryList: ClientInfoIndustry[];
    companySizeList: ClientInfoCompanySize[];
    disabledCity: boolean;
  };
};

export const ClientForm = ({
  restProps: {
    onSubmit,
    stateList,
    cityList,
    industryList,
    companySizeList,
    disabledCity,
  },
}: ClientFormTypes) => {
  const { errorsValidationForm } = useErrorsValidationForm();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useFormContext();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={11} sm={11.3} my={3}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor={clientFormSchema.client.id} sx={styles.label}>
              {clientFormSchema.client.text}
            </InputLabel>
            <OutlinedInput
              id={clientFormSchema.client.id}
              label={clientFormSchema.client.label}
              placeholder={clientFormSchema.client.text}
              fullWidth
              sx={styles.input}
              {...register(clientFormSchema.client.name, {
                required: {
                  value: true,
                  message: "Project name is required",
                },
              })}
            />
            {errors &&
              errorsValidationForm({
                errors: errors,
                errorKey: "client",
              })}
          </FormControl>
        </Grid>
        <Grid item xs={11} sm={5.5} my={3} mr={2}>
          <Controller
            name={clientFormSchema.state.name}
            control={control}
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <InputLabel id={clientFormSchema.state.id} sx={styles.label}>
                  {clientFormSchema.state.label}
                </InputLabel>
                <Select
                  value={value}
                  id={clientFormSchema.state.id}
                  fullWidth
                  native
                  sx={styles.select}
                  {...register(clientFormSchema.state.name, {
                    required: { value: true, message: "State is required" },
                  })}
                >
                  <option value="">Select option</option>
                  {stateList.map((state) => {
                    return (
                      <option value={state.state_abb!} key={state.state_abb}>
                        {state.state_name}
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
              errorKey: "state",
            })}
        </Grid>
        <Grid item xs={11} sm={5.5} my={3}>
          <Controller
            name={clientFormSchema.city.name}
            control={control}
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <InputLabel id={clientFormSchema.city.id} sx={styles.label}>
                  {clientFormSchema.city.label}
                </InputLabel>
                <Select
                  value={value}
                  id={clientFormSchema.city.id}
                  fullWidth
                  native
                  sx={styles.select}
                  {...register(clientFormSchema.city.name, {
                    required: { value: true, message: "City is required" },
                  })}
                  disabled={disabledCity}
                >
                  <option value="">Select option</option>
                  {cityList.map((city) => {
                    return (
                      <option
                        value={city.city_id!.toString()}
                        key={city.city_id}
                      >
                        {city.city_name}
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
              errorKey: "city",
            })}
        </Grid>
        <Grid item xs={11} sm={5.5} my={3} mr={2}>
          <Controller
            name={clientFormSchema.industry.name}
            control={control}
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <InputLabel id={clientFormSchema.industry.id} sx={styles.label}>
                  {clientFormSchema.industry.label}
                </InputLabel>
                <Select
                  value={value}
                  id={clientFormSchema.industry.id}
                  fullWidth
                  native
                  sx={styles.select}
                  {...register(clientFormSchema.industry.name, {
                    required: {
                      value: true,
                      message: "Industry is required",
                    },
                  })}
                >
                  <option value="">Select option</option>
                  {industryList.map((industry) => {
                    return (
                      <option
                        value={industry.industry_id!.toString()}
                        key={industry.industry_id}
                      >
                        {industry.industry_name}
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
              errorKey: "industry",
            })}
        </Grid>
        <Grid item xs={11} sm={5.5} my={3}>
          <Controller
            name={clientFormSchema.companySize.name}
            control={control}
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <InputLabel
                  id={clientFormSchema.companySize.id}
                  sx={styles.label}
                >
                  {clientFormSchema.companySize.label}
                </InputLabel>
                <Select
                  value={value}
                  id={clientFormSchema.companySize.id}
                  fullWidth
                  native
                  sx={styles.select}
                  {...register(clientFormSchema.companySize.name, {
                    required: {
                      value: true,
                      message: "Company size is required",
                    },
                  })}
                >
                  <option value="">Select option</option>
                  {companySizeList.map((company) => {
                    return (
                      <option
                        value={company.company_size_id!.toString()}
                        key={company.company_size_id}
                      >
                        {company.company_size_name}
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
              errorKey: "companySize",
            })}
        </Grid>
        <Grid item xs={11} sm={11.3} my={3}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel
              htmlFor={clientFormSchema.companyDescription.id}
              sx={styles.label}
            >
              {clientFormSchema.companyDescription.label}
            </InputLabel>
            <OutlinedInput
              id={clientFormSchema.companyDescription.id}
              label={clientFormSchema.companyDescription.label}
              placeholder={clientFormSchema.companyDescription.text}
              fullWidth
              multiline
              maxRows={3}
              sx={styles.textarea}
              {...register(clientFormSchema.companyDescription.name, {
                required: {
                  value: true,
                  message: "Company description is required",
                },
              })}
            />
            {errors &&
              errorsValidationForm({
                errors: errors,
                errorKey: "companyDescription",
              })}
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={styles.btnContainer}>
          <PrimaryButtonWithNavigation
            btnVariant="outlined"
            btnTxt="Back"
            btnUrl={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.CLIENT}
          />
          <Button variant="contained" sx={{ width: "202px" }} type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
