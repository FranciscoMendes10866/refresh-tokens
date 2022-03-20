import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

function register() {
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
        <button type="submit">Register</button>
      </form>
      <Link to="/">login</Link>
    </div>
  );
}

export default register;
