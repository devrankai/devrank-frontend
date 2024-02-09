import { useState } from "react";
import { JobInfoContractPeriod } from "../../models";
import { http } from "../../services";
import { JOB_DESCRIPTION_URL } from "../../constants";
import { alertFactory } from "../../utils";

interface UseContractPeriodList {
  contractPeriodList: JobInfoContractPeriod[];
  setContractPeriodList: React.Dispatch<React.SetStateAction<JobInfoContractPeriod[]>>;
  getContractPeriodList: () => Promise<void>;
}

export const useContractPeriodList = (): UseContractPeriodList => {
  const [contractPeriodList, setContractPeriodList] = useState<JobInfoContractPeriod[]>([]);

  const getContractPeriodList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_CONTRACT_PERIOD,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseContractPeriodList = JSON.parse(request.Data);
        setContractPeriodList([...parseContractPeriodList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong with contract period options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get contract period list", { error });
    }
  };

  return { contractPeriodList, setContractPeriodList, getContractPeriodList };
};