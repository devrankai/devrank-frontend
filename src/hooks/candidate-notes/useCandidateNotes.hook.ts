import { useState } from "react";
import { CANDIDATES_URL } from "../../constants";
import { http } from "../../services";
import { alertFactory } from "../../utils";

interface UseCandidateNotes {
  notesFromInterviewer: string;
  setNotesFromInterviewer: React.Dispatch<React.SetStateAction<string>>;
  postCandidateNotes: (
    candidateInfoId: number,
    notesFromInterviewer: string
  ) => Promise<void>;
}

export const useCandidateNotes = (initialNotes: string): UseCandidateNotes => {
  const [notesFromInterviewer, setNotesFromInterviewer] = useState<string>(
    initialNotes
  );

  const postCandidateNotes = async (
    candidateInfoId: number,
    notes: string
  ) => {
    try {
      const request = await http.post({
        url: CANDIDATES_URL.POST_CANDIDATES_NOTE,
        urlWithApi: false,
        isPrivate: true,
        data: {
          candidate_info_id: candidateInfoId,
          notes_from_interviewer: notes,
        },
      });

      if (request.status === "SUCCESS") {
        const parseCandidateNotesData = JSON.parse(request.Data);
        setNotesFromInterviewer(parseCandidateNotesData[0].notes_from_interviewer);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title:
              "Something went wrong with posting candidate notes, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - post candidate notes", { error });
    }
  };

  return { notesFromInterviewer, setNotesFromInterviewer, postCandidateNotes };
};