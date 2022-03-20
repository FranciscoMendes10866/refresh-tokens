import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useStoreState } from "easy-peasy";

function AuthContainer() {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  const location = useLocation();

  return (
    <>
      {isLoggedIn ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
}

export default AuthContainer;
