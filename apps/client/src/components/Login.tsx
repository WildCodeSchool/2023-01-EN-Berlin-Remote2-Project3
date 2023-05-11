import { useState } from "react";
import userLoginIcon from "../assets/icon-user.svg";
import PropTypes from "prop-types";
import "../scss/_login.scss";

const Login = ({ setToken }: any) => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const loginUser = async (credentials: any) => {
    const response = fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) return;

    const data = (await response).json();
    console.log(response);
    return data;
  };

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  const submitForm = async (e: any) => {
    e.preventDefault();

    const token = await loginUser({
      email,
      password,
    });
    setToken(token);

    if (password || email === undefined) {
      throw new Error("what happne?");
    }
  };

  return (
    <div className="user__login">
      <div className="user_login--icon">
        <img src={userLoginIcon} alt="login icon" />
      </div>

      <form className="user__login--form" onSubmit={submitForm}>
        <input
          onChange={emailHandler}
          type="email"
          placeholder="username"
          className="user__login--form-username"
        />

        <input
          onChange={passwordHandler}
          type="password"
          placeholder="password"
          className="user__login--form-password"
        />
        <button className="user__login--form--btn" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
