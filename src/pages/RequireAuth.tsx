import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";

export default function RequireAuth() {
  const { accessToken, authInitialized } = useSelector(
    (state: RootState) => state.auth,
  );

  if (!authInitialized) return <CircularProgress />;
  if (!accessToken) return <Navigate to="/login" replace />;

  return <Outlet />;
}
