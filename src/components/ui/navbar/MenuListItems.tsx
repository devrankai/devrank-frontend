import { useLocation, useNavigate } from "react-router-dom";

import { Box, Divider, MenuItem } from "@mui/material";
import { IMAGES } from "../../../constants/images/images.constants";
import { PRIVATE_ROUTES } from "../../../routes/private-routes/routes";
import { alertFactory } from "../../../utils";
import { PUBLIC_ROUTES } from "../../../routes";
import { useAuthStore } from "../../../hooks/auth-store/useAuthStore.hook";
import { ItemMenu } from "./ItemMenu";
import { styles } from "./MenuListItemStyles";
import { navColors } from "./nav-colors";
import { useProjectStore } from "../../../hooks/project-store/useProjectStore.hook";
import { usePositionStore } from "../../../hooks/position-store/usePositionStore.hook";
import { useClientStore } from "../../../hooks/client-store/useClientStore.hook";
import { useCandidateStore } from "../../../hooks";

type Props = {
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

export const MenuListItems = ({ setAnchorEl }: Props) => {
  const navigate = useNavigate();
  const { startLogout } = useAuthStore();

  const location = useLocation();
  const pathname = location.pathname;

  const { client } = useClientStore();
  const { project } = useProjectStore();
  const { position } = usePositionStore();
  const { candidate } = useCandidateStore();

  const handleLogout = async () => {
    setAnchorEl(null);
    const confirmAction = await alertFactory({
      type: "confirm",
      params: { titleText: "¿Are you sure to log out?" },
    });

    if (!confirmAction) return;

    startLogout();
    navigate(`${PUBLIC_ROUTES.LOG_IN}`, { replace: true });
  };
  console.log("candidate", { candidate });
  return (
    <>
      <ItemMenu
        setAnchorEl={setAnchorEl}
        itemMenuText="Client"
        itemTextIncludes="client"
        itemIcon="client"
        privateRoute={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.CLIENT}
      />
      <ItemMenu
        setAnchorEl={setAnchorEl}
        itemMenuText="Project"
        itemTextIncludes="project"
        itemIcon="project"
        privateRoute={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.PROJECT}
        disabled={client?.id === undefined}
      />
      <ItemMenu
        setAnchorEl={setAnchorEl}
        itemMenuText="Position"
        itemTextIncludes="position"
        itemIcon="position"
        privateRoute={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.POSITION}
        disabled={client?.id === undefined || project?.id === undefined}
      />
      <ItemMenu
        setAnchorEl={setAnchorEl}
        itemMenuText="Job info"
        itemTextIncludes="job-info"
        itemIcon="jobInfo"
        privateRoute={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.JOB_INFO}
        disabled={client?.id === undefined || project?.id === undefined}
      />
      <ItemMenu
        setAnchorEl={setAnchorEl}
        itemMenuText="Search Results"
        itemTextIncludes="search-results"
        itemIcon="searchResults"
        privateRoute={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.SEARCH_RESULTS}
        disabled={
          client?.id === undefined ||
          project?.id === undefined ||
          position?.id === undefined
        }
      />
      <ItemMenu
        setAnchorEl={setAnchorEl}
        itemMenuText="Candidate Review"
        itemTextIncludes="candidate-review"
        itemIcon="candidateReview"
        privateRoute={
          PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.CANDIDATE_REVIEW
        }
        disabled={
          client?.id === undefined ||
          project?.id === undefined ||
          position?.id === undefined ||
          Object.keys(candidate)?.length === 0
        }
      />
      <Divider sx={styles.divider} />
      <ItemMenu
        setAnchorEl={setAnchorEl}
        itemMenuText="Profile"
        itemTextIncludes="profile"
        itemIcon="profile"
        privateRoute={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.PROFILE}
      />
      <MenuItem
        onClick={handleLogout}
        sx={{
          backgroundColor: `${
            pathname.includes("log-out")
              ? navColors.activeBackground
              : "transparent"
          }`,
        }}
      >
        <img
          src={IMAGES.DASHBOARD_LOG_OUT}
          alt="log out icon"
          width="29"
          height="29"
        />
        <Box component="span" sx={styles.menuText}>
          Log out
        </Box>
      </MenuItem>
    </>
  );
};
