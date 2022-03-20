import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mutate } from "swr";
import { useStoreActions } from "easy-peasy";

import { loginFn } from "../api";

function login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const setSession = useStoreActions((actions) => actions.setSession);

  const handleOnChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setState]
  );

  const handleOnSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const result = await mutate(
        "/api/login",
        loginFn(state.username, state.password)
      );

      if (result.status === 200) {
        setSession(result.data.session);
        navigate("/dashboard");
      }
    },
    [state]
  );

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          name="username"
          onChange={handleOnChange}
          placeholder="username"
        />
        <input
          name="password"
          onChange={handleOnChange}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">register</Link>
    </div>
  );
}

export default login;
