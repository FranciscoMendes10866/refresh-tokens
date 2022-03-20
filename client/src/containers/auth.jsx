import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useStoreState } from "easy-peasy";

function AuthContainer() {
  const hasSession = !!useStoreState((state) => state.session);
  const location = useLocation();

  return (
    <>
      {hasSession ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
}

export default AuthContainer;
