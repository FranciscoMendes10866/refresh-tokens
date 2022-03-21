import { SWRConfig } from "swr";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

import { MainLayout } from "./layouts";
import { Login, Register, Dashboard } from "./pages";
import { AuthContainer } from "./containers";
import { refreshTokenFn } from "./api";

function App() {
  const navigate = useNavigate();
  const setSession = useStoreActions((actions) => actions.setSession);
  const session = useStoreState((state) => state.currentSession);

  return (
    <SWRConfig
      value={{
        onError: async (err) => {
          if (err.message.includes("401") || err.message.includes("403")) {
            let result;

            try {
              const response = await refreshTokenFn(session?.refreshToken);
              result = response.data;
            } catch (error) {
              setSession(null);
              navigate("/", { replace: true });
            }

            if (result?.session) {
              setSession(result.session);
            }
          }
        },
      }}
    >
      <Routes>
        {/* Layout Wrapper */}
        <Route path="/" element={<MainLayout />}>
          {/* Auth Pages */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Dashboard Pages - Protected Routes */}
          <Route element={<AuthContainer />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </SWRConfig>
  );
}

export default App;
