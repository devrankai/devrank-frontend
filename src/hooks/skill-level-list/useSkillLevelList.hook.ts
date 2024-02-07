import { useState } from "react";
import { JobInfoSkillLevel } from "../../models";
import { http } from "../../services";
import { JOB_DESCRIPTION_URL } from "../../constants";
import { alertFactory } from "../../utils";

interface UseSkillLevelList {
  skillLevelList: JobInfoSkillLevel[];
  setSkillLevelList: React.Dispatch<React.SetStateAction<JobInfoSkillLevel[]>>;
  getSkillLevelList: () => Promise<void>;
}

export const useSkillLevelList = (): UseSkillLevelList => {
  const [skillLevelList, setSkillLevelList] = useState<JobInfoSkillLevel[]>([]);

  const getSkillLevelList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_LEVEL,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseSkillLevelList = JSON.parse(request.Data);
        setSkillLevelList([...parseSkillLevelList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong with level options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get skill level list", { error });
    }
  };

  return { skillLevelList, setSkillLevelList, getSkillLevelList };
};
