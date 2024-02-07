import { useState } from "react";
import { JobInfoSkill } from "../../models";
import { http } from "../../services";
import { JOB_DESCRIPTION_URL } from "../../constants";
import { alertFactory } from "../../utils";

interface UseSkillList {
  skillList: JobInfoSkill[];
  niceToHaveSkillList: JobInfoSkill[];
  setSkillList: React.Dispatch<React.SetStateAction<JobInfoSkill[]>>;
  setNiceToHaveSkillList: React.Dispatch<React.SetStateAction<JobInfoSkill[]>>;
  getSkillList: () => Promise<void>;
}

export const useSkillList = (): UseSkillList => {
  const [skillList, setSkillList] = useState<JobInfoSkill[]>([]);
  const [niceToHaveSkillList, setNiceToHaveSkillList] = useState<
    JobInfoSkill[]
  >([]);

  const getSkillList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_SKILLS,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseSkillList = JSON.parse(request.Data);
        setSkillList([...parseSkillList]);
        setNiceToHaveSkillList([...parseSkillList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong with skills options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get skill list", { error });
    }
  };

  return {
    skillList,
    setSkillList,
    niceToHaveSkillList,
    setNiceToHaveSkillList,
    getSkillList,
  };
};
