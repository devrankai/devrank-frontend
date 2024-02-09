import { useState } from "react";
import { JobInfoRole } from "../../models";
import { http } from "../../services";
import { JOB_DESCRIPTION_URL } from "../../constants";
import { alertFactory } from "../../utils";

interface UseRoleList {
  roleList: JobInfoRole[];
  setRoleList: React.Dispatch<React.SetStateAction<JobInfoRole[]>>;
  getRoleList: () => Promise<void>;
}

export const useRoleList = (): UseRoleList => {
  const [roleList, setRoleList] = useState<JobInfoRole[]>([]);

  const getRoleList = async () => {
    try {
      const request = await http.get({
        url: JOB_DESCRIPTION_URL.GET_ROLES,
        urlWithApi: false,
        isPrivate: true,
      });

      if (request.Status === "SUCCESS") {
        const parseRoleList = JSON.parse(request.Data);
        setRoleList([...parseRoleList]);
      } else {
        alertFactory({
          type: "feedback",
          params: {
            title: "Something went wrong with role options, please try again.",
            icon: "error",
          },
        });
      }
    } catch (error) {
      console.error("Error - get role list", { error });
    }
  };

  return { roleList, setRoleList, getRoleList };
};

