export type JobDescription = {
  job_desc_id: string;
  project_id: string;
  role_id: string;
  number_of_positions: string;
  test_task_id: string;
  skill_level_id: string;
  dev_methodology_id: string;
  meeting_frequency_id: string;
  location_id: string;
  earliest_start_date: string; // Data?
  closed_by_date: string; // Data?
  probation_period_id: string;
  contract_model_id: string;
  contract_period_id: string;
  time_tracking_id: string;
  active: string;
  tech_must_to_have: TechToHave[];
  tech_nice_to_have: TechToHave[];
  skills_must_to_have: SkillsToHave[];
  skills_nice_to_have: SkillsToHave[];
};

export type SkillsToHave = {
  skills_id: number;
};

export type TechToHave = {
  technologies_id: number;
};
