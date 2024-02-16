import { useState } from "react";
import { PROJECT_URL } from "../../constants";
import { http } from "../../services";
import { alertFactory } from "../../utils";
import { ProjectInfoTeamStructure } from "../../models";

interface UseTeamStructureList {
  teamStructureList: ProjectInfoTeamStructure[];
  setTeamStructureList: React.Dispatch<React.SetStateAction<ProjectInfoTeamStructure[]>>;
  getTeamStructureList: () => Promise<void>;
}

export const useTeamStructureList = (): UseTeamStructureList => {
  const [teamStructureList, setTeamStructureList] = useState<ProjectInfoTeamStructure[]>([]);

  const getTeamStructureList = async () => {
    try {
      const request = await http.get({
        url: PROJECT_URL.TEAM_STRUCTURE,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseTeamStructureList = JSON.parse(request.Data);
        setTeamStructureList([...parseTeamStructureList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong with team structure options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get team structure list", error);
    }
  };

  return { teamStructureList, setTeamStructureList, getTeamStructureList };
};