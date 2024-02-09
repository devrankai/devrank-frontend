import { useState } from "react";
import { JobInfoMethodology } from "../../models";
import { http } from "../../services";
import { JOB_DESCRIPTION_URL } from "../../constants";
import { alertFactory } from "../../utils";

interface UseMethodologyList {
  methodologyList: JobInfoMethodology[];
  setMethodologyList: React.Dispatch<React.SetStateAction<JobInfoMethodology[]>>;
  getMethodologyList: () => Promise<void>;
}

export const useMethodologyList = (): UseMethodologyList => {
  const [methodologyList, setMethodologyList] = useState<JobInfoMethodology[]>([]);

  const getMethodologyList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_METHODOLOGIES,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseMethodologyList = JSON.parse(request.Data);
        setMethodologyList([...parseMethodologyList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong with methodology options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get methodology list", { error });
    }
  };

  return { methodologyList, setMethodologyList, getMethodologyList };
};