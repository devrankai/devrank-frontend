export type CandidatesListModel = {
  Data: DataModel;
  Status: string;
};

export type DataModel = {
  Data: CandidateModel[] | null;
  Job_History: JobHistory[] | null;
};

export type CandidateModel = {
  InsertDate: number;
  ModifiedDate: number;
  active: boolean;
  candidate_info_id: number;
  coding_standards: number;
  documentation: number;
  error_handling: number;
  front_end_image_link: string;
  full_name: string;
  job_desc_id: number;
  job_title: string;
  linkedin_id: null | string;
  linkedin_url: string;
  linkedin_username: string;
  max_exp_end_date: number;
  min_exp_start_date: number;
  modularity: number;
  notes_from_interviewer: string;
  overall_review: string;
  readability: number;
  skill_level_id: number;
  skill_level_name: string;
  testing: number;
  user_base_info_id: number;
  years_of_experience: number;
};

export type JobHistory = {
  company_location: string;
  company_name: string;
  company_size: string;
  exp_end_date: null | string;
  exp_start_date: string;
  job_title: string;
  person_experience_id: number;
  user_base_info_id: number;
};
