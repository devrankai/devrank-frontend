import { useState } from "react";
import { JobInfoTechnology } from "../../models";
import { http } from "../../services";
import { JOB_DESCRIPTION_URL } from "../../constants";
import { alertFactory } from "../../utils";

interface UseTechnologyList {
  technologyList: JobInfoTechnology[];
  niceToHaveTechnologyList: JobInfoTechnology[];
  setTechnologyList: React.Dispatch<React.SetStateAction<JobInfoTechnology[]>>;
  setNiceToHaveTechnologyList: React.Dispatch<
    React.SetStateAction<JobInfoTechnology[]>
  >;
  getTechnologyList: () => Promise<void>;
}

export const useTechnologyList = (): UseTechnologyList => {
  const [technologyList, setTechnologyList] = useState<JobInfoTechnology[]>([]);
  const [niceToHaveTechnologyList, setNiceToHaveTechnologyList] = useState<
    JobInfoTechnology[]
  >([]);

  const getTechnologyList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_TECHNOLOGIES,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseTechnologyList = JSON.parse(request.Data);
        setTechnologyList([...parseTechnologyList]);
        setNiceToHaveTechnologyList([...parseTechnologyList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong with technology options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get technology list", { error });
    }
  };

  return {
    technologyList,
    setTechnologyList,
    niceToHaveTechnologyList,
    setNiceToHaveTechnologyList,
    getTechnologyList,
  };
};
