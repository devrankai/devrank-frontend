export type technology_must_have = {
  technologies_id: number | null;
};

export type technology_nice_to_have = {
  technologies_id: number | null;
};

export type skill_must_have = {
  skills_id: number | null;
};

export type skill_nice_to_have = {
  skills_id: number | null;
};

// TODO: las dejo ahora como opcionales para que el JobInfoCreate no de error
// Pero despues hay que dejarlas todas como obligatorias
export type JobInfo = {
  job_desc_id?: string | null;
  project_id?: string | null;
  role_id?: string | null;
  number_of_positions?: string | null;
  test_task_id?: string | null;
  skill_level_id?: string | null;
  dev_methodology_id?: string | null;
  meeting_frequency_id?: string | null;
  location_id?: string | null;
  earliest_start_date?: string | null; // "4/1/2024",  MM/DD/YYYY
  closed_by_date?: string | null; //  "5/1/2024",
  probation_period_id?: string | null;
  contract_model_id?: string | null;
  active?: string | null;
  tech_must_to_have?: technology_must_have[];
  tech_nice_to_have?: technology_nice_to_have[];
  skills_must_to_have?: skill_must_have[];
  skills_nice_to_have?: skill_nice_to_have[];
  time_tracking_id?: string | null;
};
