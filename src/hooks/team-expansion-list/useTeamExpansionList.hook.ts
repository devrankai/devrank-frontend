import { useState } from "react";
import { PROJECT_URL } from "../../constants";
import { http } from "../../services";
import { alertFactory } from "../../utils";
import { ProjectInfoTeamExpansion } from "../../models";

interface UseTeamExpansionList {
  teamExpansionList: ProjectInfoTeamExpansion[];
  setTeamExpansionList: React.Dispatch<React.SetStateAction<ProjectInfoTeamExpansion[]>>;
  getTeamExpansionList: () => Promise<void>;
}

export const useTeamExpansionList = (): UseTeamExpansionList => {
  const [teamExpansionList, setTeamExpansionList] = useState<ProjectInfoTeamExpansion[]>([]);

  const getTeamExpansionList = async () => {
    try {
      const request = await http.get({
        url: PROJECT_URL.TEAM_EXPANSION,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseTeamExpansionList = JSON.parse(request.Data);
        setTeamExpansionList([...parseTeamExpansionList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong with team expansion options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get team expansion list", error);
    }
  };

  return { teamExpansionList, setTeamExpansionList, getTeamExpansionList };
};