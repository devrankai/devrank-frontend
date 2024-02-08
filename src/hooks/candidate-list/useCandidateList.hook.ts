import { useState } from "react";
import { http } from "../../services";
import { CANDIDATES_URL } from "../../constants";
import { alertFactory } from "../../utils";
import { CandidateModel } from "../../models";

interface UseCandidateModelList {
  candidateModelList: CandidateModel[];
  setCandidateModelList: React.Dispatch<React.SetStateAction<CandidateModel[]>>;
  postCandidateList: (
    jobDescId: number,
    candidateInfoId: number
  ) => Promise<void>;
}

export const useCandidateList = (): UseCandidateModelList => {
  const [candidateModelList, setCandidateModelList] = useState<
    CandidateModel[]
  >([]);

  const postCandidateList = async (
    jobDescId: number,
    candidateInfoId: number
  ) => {
    try {
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
        const parseCandidateModelList = JSON.parse(request.Data);
        setCandidateModelList([...parseCandidateModelList]);
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
    }
  };

  return { candidateModelList, setCandidateModelList, postCandidateList };
};
