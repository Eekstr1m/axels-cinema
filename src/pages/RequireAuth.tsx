import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { CenteredLoading } from "../components";

export default function RequireAuth() {
  const { accessToken, authInitialized, authLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  if (authLoading || !authInitialized) return <CenteredLoading />;
  if (!accessToken) return <Navigate to="/login" replace />;

  return <Outlet />;
}
