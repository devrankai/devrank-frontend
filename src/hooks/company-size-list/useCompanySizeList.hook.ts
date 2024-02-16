import { useState } from "react";
import { CLIENT_URL } from "../../components/forms/client/client-form-constants";
import { http } from "../../services";
import { alertFactory } from "../../utils";
import { ClientInfoCompanySize } from "../../models";

interface UseCompanySizeList {
  companySizeList: ClientInfoCompanySize[];
  setCompanySizeList: React.Dispatch<React.SetStateAction<ClientInfoCompanySize[]>>;
  getCompanySizeList: () => Promise<void>;
}

export const useCompanySizeList = (): UseCompanySizeList => {
  const [companySizeList, setCompanySizeList] = useState<ClientInfoCompanySize[]>([]);

  const getCompanySizeList = async () => {
    try {
      const request = await http.get({
        url: CLIENT_URL.COMPANY_SIZE,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseCompanySizeList = JSON.parse(request.Data);
        setCompanySizeList([...parseCompanySizeList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong with company size options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get company size list", { error });
    }
  };

  return { companySizeList, setCompanySizeList, getCompanySizeList };
};