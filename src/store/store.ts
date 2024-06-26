import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { clientSlice } from "./client/clientSlice";
import { projectSlice } from "./project/projectSlice";
import { positionSlice } from ".";
import { candidateSlice } from "./candidate/candidateSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    client: clientSlice.reducer,
    project: projectSlice.reducer,
    position: positionSlice.reducer,
    candidate: candidateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
