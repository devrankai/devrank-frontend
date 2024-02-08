import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { clientSlice } from "./client/clientSlice";
import { projectSlice } from "./project/projectSlice";
import { positionSlice } from ".";
import { jobSlice} from "./job/jobSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    client: clientSlice.reducer,
    project: projectSlice.reducer,
    position: positionSlice.reducer,
    job: jobSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
