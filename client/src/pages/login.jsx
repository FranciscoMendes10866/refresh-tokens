import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

function login() {
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
    (e) => {
      e.preventDefault();
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
