import { useState } from "react";
import {
  Control,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { PrimaryButtonWithNavigation, Steps } from "../..";
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
import { JobInfoInputs } from "./JobInfoCreate";
import { FirstStepJobInfoForms } from "./fields-job-info-forms/FirstStepJobInfoForms";
import { SecondStepJobInfoForms } from "./fields-job-info-forms/SecondStepJobInfoForms";

import { Box, Button, Grid, SelectChangeEvent, Tooltip } from "@mui/material";
import { styles } from "./JobInfoFormStyles";

type JobInfoFormTypes = {
  props: {
    onSubmit: SubmitHandler<JobInfoInputs>;
    contractPeriodList: JobInfoContractPeriod[];
    probationPeriodList: JobInfoProbationPeriod[];
    meetingFrequencyList: JobInfoMeetingFrequency[];
    testTask: JobInfoTestTask[];
    roleList: JobInfoRole[];
    technologyList: JobInfoTechnology[];
    niceToHaveTechnologyList: JobInfoTechnology[];
    skillList: JobInfoSkill[];
    niceToHaveSkillList: JobInfoSkill[];
    skillLevelList: JobInfoSkillLevel[];
    locationList: JobInfoLocation[];
    methodologyList: JobInfoMethodology[];
    timeTrackingProp: {
      id: string;
      name: string;
    }[];
    register: UseFormRegister<JobInfoInputs>;
    watch: UseFormWatch<JobInfoInputs>;
    formState: FormState<JobInfoInputs>;
    handleSubmit: UseFormHandleSubmit<JobInfoInputs>;
    control: Control<JobInfoInputs>;
    disabledNextButton: boolean;
    disabledSubmitButton: boolean;
    contractModelList: JobInfoContractModel[];
    handleChangeMultipleSelect: (
      e: SelectChangeEvent<any>,
      inputName: any
    ) => void;
    multipleSelectValues: {
      [key: string]: string[];
    };
    isEdit?: boolean;
  };
};

export const JobInfoForm = ({
  props: {
    onSubmit,
    handleChangeMultipleSelect,
    multipleSelectValues,
    meetingFrequencyList,
    testTask,
    contractPeriodList,
    probationPeriodList,
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
    isEdit = false,
  },
}: JobInfoFormTypes) => {
  const { errors } = formState;

  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep((prevValue) => prevValue + 1);
  };

  const handleBackStep = () => {
    setStep((prevValue) => prevValue - 1);
  };

  const onClickHandlerNextButton = (step: number) => {
    console.log("onClickHandlerNextButton");

    const dataButtonByStep: { [key: number]: () => void } = {
      1: handleNextStep,
      2: handleBackStep,
    };

    dataButtonByStep[step]();
  };

  return (
    <Grid container sx={styles.formContainer}>
      <Grid item xs={12} sx={styles.stepsContainer}>
        <Steps step={step} />
      </Grid>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          {step === 1 && (
            <FirstStepJobInfoForms
              control={control}
              register={register}
              roleList={roleList}
              errors={errors}
              technologyList={technologyList}
              niceToHaveTechnologyList={niceToHaveTechnologyList}
              skillList={skillList}
              niceToHaveSkillList={niceToHaveSkillList}
              testTask={testTask}
              skillLevelList={skillLevelList}
              handleChangeMultipleSelect={handleChangeMultipleSelect}
              multipleSelectValues={multipleSelectValues}
            />
          )}
          {step === 2 && (
            <SecondStepJobInfoForms
              control={control}
              watch={watch}
              register={register}
              errors={errors}
              methodologyList={methodologyList}
              contractPeriodList={contractPeriodList}
              probationPeriodList={probationPeriodList}
              contractModelList={contractModelList}
              timeTrackingProp={timeTrackingProp}
              locationList={locationList}
              meetingFrequencyList={meetingFrequencyList}
              isEdit={isEdit}
            />
          )}
          <Grid item xs={12} sx={styles.btnsContainer}>
            {step === 1 && (
              <>
                <PrimaryButtonWithNavigation
                  btnTxt="Back"
                  btnUrl={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.POSITION}
                  btnVariant="outlined"
                />
                <Tooltip
                  title={`Please complete all fields, and without errors, for continue`}
                >
                  <span>
                    <Button
                      variant="contained"
                      sx={{
                        width: "200px",
                      }}
                      onClick={() => onClickHandlerNextButton(step)}
                      disabled={
                        Object.keys(errors).length > 0 || disabledNextButton
                      }
                    >
                      Next
                    </Button>
                  </span>
                </Tooltip>
              </>
            )}

            {step === 2 && (
              <>
                <Button
                  variant="outlined"
                  sx={{ width: "200px" }}
                  onClick={() => onClickHandlerNextButton(step)}
                >
                  Back
                </Button>
                <Tooltip title={`Please complete all fields for send the data`}>
                  <span>
                    <Button
                      variant="contained"
                      sx={{
                        width: "200px",
                      }}
                      type="submit"
                      disabled={disabledSubmitButton}
                    >
                      Next
                    </Button>
                  </span>
                </Tooltip>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
