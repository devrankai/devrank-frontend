import { useState } from "react";
import { http } from "../../services";
import { CANDIDATES_URL } from "../../constants";
import { alertFactory } from "../../utils";
import { DataModel } from "../../models";
import { useSpinner } from "..";

interface UseCandidateWithIdModelList {
  candidateWithIdModelList: DataModel[];
  setCandidateWithIdModelList: React.Dispatch<
    React.SetStateAction<DataModel[]>
  >;
  postCandidateWithIdList: (
    jobDescId: number,
    candidateInfoId: number
  ) => Promise<void>;
}

export const useCandidateWithIdList = (): UseCandidateWithIdModelList => {
  const [candidateWithIdModelList, setCandidateWithIdModelList] = useState<
    DataModel[]
  >([]);

  const { addLoading, removeLoading } = useSpinner();

  const postCandidateWithIdList = async (
    jobDescId: number,
    candidateInfoId: number
  ) => {
    try {
      addLoading();

      const request = await http.post({
        url: CANDIDATES_URL.POST_CANDIDATES_LIST,
        urlWithApi: false,
        isPrivate: true,
        data: {
          job_desc_id: jobDescId,
          candidate_info_id: candidateInfoId,
        },
      });

      if (request.status === "SUCCESS") {
        const parseCandidateWithIModelList = [request.Data];

        setCandidateWithIdModelList([...parseCandidateWithIModelList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong with candidate information, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - post candidate information list", { error });
    } finally {
      removeLoading();
    }
  };

  return {
    candidateWithIdModelList,
    setCandidateWithIdModelList,
    postCandidateWithIdList,
  };
};
