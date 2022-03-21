import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerFn } from "../api";

function register() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

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
      const result = await registerFn(state.username, state.password);

      if (result.status === 201) navigate("/");
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
        <button type="submit">Register</button>
      </form>
      <Link to="/">login</Link>
    </div>
  );
}

export default register;
