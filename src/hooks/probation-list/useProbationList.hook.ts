import { useState } from "react";
import { JobInfoProbationPeriod } from "../../models";
import { http } from "../../services";
import { JOB_DESCRIPTION_URL } from "../../constants";
import { alertFactory } from "../../utils";

interface UseProbationPeriodList {
  probationPeriodList: JobInfoProbationPeriod[];
  setProbationPeriodList: React.Dispatch<
    React.SetStateAction<JobInfoProbationPeriod[]>
  >;
  getProbationPeriodList: () => Promise<void>;
}

export const useProbationPeriodList = (): UseProbationPeriodList => {
  const [probationPeriodList, setProbationPeriodList] = useState<
    JobInfoProbationPeriod[]
  >([]);

  const getProbationPeriodList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_PROBATION_PERIOD,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseProbationPeriodList = JSON.parse(request.Data);
        setProbationPeriodList([...parseProbationPeriodList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong with probation period options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get probation period list", { error });
    }
  };

  return {
    probationPeriodList,
    setProbationPeriodList,
    getProbationPeriodList,
  };
};
