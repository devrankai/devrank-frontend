import { Navigate, Route } from "react-router-dom";

import { RouteNotFound } from "../route-not-found.routes";

import { PRIVATE_ROUTES } from "..";
import {
  CandidateReview,
  Client,
  ClientCreate,
  ClientEdit,
  JobInfo,
  JobInfoEditPage,
  Position,
  PositionCreate,
  PositionEdit,
  Profile,
  Project,
  ProjectCreate,
  ProjectEdit,
  SearchResults,
} from "../../pages";

export const PrivateRoutes = () => {
  return (
    <RouteNotFound>
      <Route
        path={"/"}
        element={
          <Navigate to={PRIVATE_ROUTES.DASHBOARD + PRIVATE_ROUTES.CLIENT} />
        }
      />
      <Route path={PRIVATE_ROUTES.CLIENT} element={<Client />} />
      <Route path={PRIVATE_ROUTES.CLIENT_CREATE} element={<ClientCreate />} />
      <Route path={PRIVATE_ROUTES.CLIENT_EDIT} element={<ClientEdit />} />
      <Route path={PRIVATE_ROUTES.PROJECT} element={<Project />} />
      <Route path={PRIVATE_ROUTES.PROJECT_CREATE} element={<ProjectCreate />} />
      <Route path={PRIVATE_ROUTES.PROJECT_EDIT_ID} element={<ProjectEdit />} />
      <Route path={PRIVATE_ROUTES.POSITION} element={<Position />} />
      <Route
        path={PRIVATE_ROUTES.POSITION_CREATE}
        element={<PositionCreate />}
      />
      <Route path={PRIVATE_ROUTES.POSITION_EDIT} element={<PositionEdit />} />
      <Route path={PRIVATE_ROUTES.JOB_INFO} element={<JobInfo />} />
      <Route path={PRIVATE_ROUTES.SEARCH_RESULTS} element={<SearchResults />} />
      <Route
        path={PRIVATE_ROUTES.CANDIDATE_REVIEW}
        element={<CandidateReview />}
      />
      <Route path={PRIVATE_ROUTES.PROFILE} element={<Profile />} />
      <Route
        path={PRIVATE_ROUTES.JOB_INFO_EDIT_ID}
        element={<JobInfoEditPage />}
      />
    </RouteNotFound>
  );
};
