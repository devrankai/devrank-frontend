import { useState } from "react";
import { CLIENT_URL } from "../../components/forms/client/client-form-constants";
import { http } from "../../services";
import { alertFactory } from "../../utils";
import { ClientInfoIndustry } from "../../models";

interface UseIndustryList {
  industryList: ClientInfoIndustry[];
  setIndustryList: React.Dispatch<React.SetStateAction<ClientInfoIndustry[]>>;
  getIndustryList: () => Promise<void>;
}

export const useIndustryList = (): UseIndustryList => {
  const [industryList, setIndustryList] = useState<ClientInfoIndustry[]>([]);

  const getIndustryList = async () => {
    try {
      const request = await http.get({
        url: CLIENT_URL.INDUSTRIES,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseIndustryList = JSON.parse(request.Data);
        setIndustryList([...parseIndustryList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong with industry options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get industry list", { error });
    }
  };

  return { industryList, setIndustryList, getIndustryList };
};