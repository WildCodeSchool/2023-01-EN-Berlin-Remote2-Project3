import { useState } from "react";
import userLoginIcon from "../assets/icon-user.svg";
import PropTypes from "prop-types";
import "../scss/_login.scss";

const Login = ({
  setToken,
}: {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) return;

    const data = await response.json();

    console.log(data, "only token");
    return data;
  };

  const emailHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const passwordHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = await loginUser({
      email,
      password,
    });
    setToken(token);

    if (!password || !email) {
      throw new Error("error happen?");
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
