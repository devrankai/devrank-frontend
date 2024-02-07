import { useState } from "react";
import { JOB_DESCRIPTION_URL } from "../../constants";
import { http } from "../../services";
import { alertFactory } from "../../utils";
import { JobInfoLocation } from "../../models";

interface UseLocationList {
  locationList: JobInfoLocation[];
  setLocationList: React.Dispatch<React.SetStateAction<JobInfoLocation[]>>;
  getLocationList: () => Promise<void>;
}

export const useLocationList = (): UseLocationList => {
  const [locationList, setLocationList] = useState<JobInfoLocation[]>([]);

  const getLocationList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_LOCATIONS,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseLocationList = JSON.parse(request.Data);
        setLocationList([...parseLocationList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong with location options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get location list", { error });
    }
  };

  return { locationList, setLocationList, getLocationList };
};
