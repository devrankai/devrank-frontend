import { useState } from "react";
import { http } from "../../services";
import { CANDIDATES_URL } from "../../constants";
import { alertFactory } from "../../utils";
import { CandidateModel, DataModel } from "../../models";
import { useSpinner } from "..";

interface UseCandidateModel {
  candidateModelList: CandidateModel[];
  candidateSelected: DataModel;
  setCandidateModelList: React.Dispatch<React.SetStateAction<CandidateModel[]>>;
  postCandidateList: (jobDescId: number) => Promise<void>;
  postOneCandidate: (
    jobDescId: number,
    candidateInfoId: number
  ) => Promise<void>;
}

export const useCandidate = (): UseCandidateModel => {
  const [candidateModelList, setCandidateModelList] = useState<
    CandidateModel[]
  >([]);

  const [candidateSelected, setCandidateSelected] = useState<DataModel>({
    Data: null,
    Job_History: null,
  });

  const { addLoading, removeLoading } = useSpinner();

  const fetchCandidate = async (jobDescId: number, candidateInfoId: number) => {
    return await http.post({
      url: CANDIDATES_URL.POST_CANDIDATES_LIST,
      urlWithApi: false,
      isPrivate: true,
      data: {
        job_desc_id: jobDescId,
        candidate_info_id: candidateInfoId,
      },
    });
  };

  const postCandidateList = async (jobDescId: number) => {
    try {
      addLoading();

      const candidateInfoId = 0;

      const request = await fetchCandidate(jobDescId, candidateInfoId);

      if (request.status === "SUCCESS") {
        const parseCandidateModelList = request.Data.Data.filter(
          (candidate: { [key: string]: any }) => candidate.active !== false
        );

        setCandidateModelList([...parseCandidateModelList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong with list candidate information, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - post candidate list", { error });
    } finally {
      removeLoading();
    }
  };

  const postOneCandidate = async (
    jobDescId: number,
    candidateInfoId: number
  ) => {
    try {
      addLoading();

      const request = await fetchCandidate(jobDescId, candidateInfoId);

      if (request.status === "SUCCESS") {
        const parseCandidateModelList = request.Data;

        setCandidateSelected(parseCandidateModelList);
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
      console.error("Error - post one candidate", { error });
    } finally {
      removeLoading();
    }
  };

  return {
    candidateModelList,
    candidateSelected,
    setCandidateModelList,
    postCandidateList,
    postOneCandidate,
  };
};
