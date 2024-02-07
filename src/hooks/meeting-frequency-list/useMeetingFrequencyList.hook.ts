import { useState } from "react";
import { JobInfoMeetingFrequency } from "../../models";
import { http } from "../../services";
import { JOB_DESCRIPTION_URL } from "../../constants";
import { alertFactory } from "../../utils";

interface UseMeetingFrequencyList {
  meetingFrequencyList: JobInfoMeetingFrequency[];
  setMeetingFrequencyList: React.Dispatch<
    React.SetStateAction<JobInfoMeetingFrequency[]>
  >;
  getMeetingFrequencyList: () => Promise<void>;
}

export const useMeetingFrequencyList = (): UseMeetingFrequencyList => {
  const [meetingFrequencyList, setMeetingFrequencyList] = useState<
    JobInfoMeetingFrequency[]
  >([]);

  const getMeetingFrequencyList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_MEETING_FREQUENCY,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseMeetingFrequencyList = JSON.parse(request.Data);
        setMeetingFrequencyList([...parseMeetingFrequencyList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong with meeting frequency options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get meeting frequency list", { error });
    }
  };

  return {
    meetingFrequencyList,
    setMeetingFrequencyList,
    getMeetingFrequencyList,
  };
};
