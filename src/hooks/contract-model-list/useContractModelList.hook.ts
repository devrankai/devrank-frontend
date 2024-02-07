import { useState } from "react";
import { JobInfoContractModel } from "../../models";
import { http } from "../../services";
import { JOB_DESCRIPTION_URL } from "../../constants";
import { alertFactory } from "../../utils";

interface UseContractModelList {
  contractModelList: JobInfoContractModel[];
  setContractModelList: React.Dispatch<
    React.SetStateAction<JobInfoContractModel[]>
  >;
  getContractModelList: () => Promise<void>;
}

export const useContractModelList = (): UseContractModelList => {
  const [contractModelList, setContractModelList] = useState<
    JobInfoContractModel[]
  >([]);

  const getContractModelList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_CONTRACT_MODEL,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseContractModelList = JSON.parse(request.Data);
        setContractModelList([...parseContractModelList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong with contract model options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get contract model list", { error });
    }
  };

  return { contractModelList, setContractModelList, getContractModelList };
};
