import { SWRConfig } from "swr";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StoreProvider } from "easy-peasy";

import { MainLayout } from "./layouts";
import { Login, Register, Dashboard } from "./pages";
import { AuthContainer } from "./containers";
import { store } from "./store";

function App() {
  return (
    <SWRConfig
      value={{
        onError: (err) => {
          console.log("[Global Error]");
          console.error(err);
        },
      }}
    >
      <StoreProvider store={store}>
        <Router>
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
        </Router>
      </StoreProvider>
    </SWRConfig>
  );
}

export default App;
