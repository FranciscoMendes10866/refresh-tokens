import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import useSWR from "swr";
import axios from "axios";

import { logoutFn } from "../api";

function dashboard() {
  const navigate = useNavigate();
  const [shouldFetch, setShouldFetch] = useState(true);
  const session = useStoreState((state) => state.currentSession);
  const setSession = useStoreActions((actions) => actions.setSession);

  const { data } = useSWR(
    [
      shouldFetch ? "http://localhost:3333/api/dummy" : null,
      session?.accessToken,
    ],
    async (url, token) =>
      await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
  );

  const handleOnLogout = useCallback(
    async (e) => {
      e.preventDefault();
      await logoutFn(session.refreshToken);
      setShouldFetch((state) => !state);
      setSession(null);
      navigate("/");
    },
    [session]
  );

  return (
    <div>
      <h2>Dashboard</h2>
      <pre>
        <code>{JSON.stringify(data?.data, null, 2)}</code>
      </pre>
      <br />
      <button onClick={handleOnLogout}>Logout</button>
    </div>
  );
}

export default dashboard;
