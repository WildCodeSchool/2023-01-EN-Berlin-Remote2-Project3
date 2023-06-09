import { useState } from "react";
import userLoginIcon from "../assets/icon-user.svg";
import PropTypes from "prop-types";
import "../scss/_login.scss";
import { UserInfo } from "../App";
import { useNavigate } from "react-router-dom";

const Login = ({
  setToken,
  setUserInfo,
}: {
  setToken: (userToken: string) => void;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

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
    if (!response.ok) setShowError(true);

    const data: { token: string; user: UserInfo } = await response.json();
    setUserInfo(data.user);
    return data.token;
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

    navigate("/dashboard");
  };

  return (
    <div className="user__login">
      <div
        className={showError ? "user_login--icon error" : "user_login--icon"}
      >
        <img src={userLoginIcon} alt="login icon" />
      </div>

      <form className="user__login--form" onSubmit={submitForm}>
        <input
          onChange={emailHandler}
          type="email"
          placeholder="username"
          className={
            showError
              ? "user__login--form-username error"
              : "user__login--form-username"
          }
        />
        <input
          onChange={passwordHandler}
          type="password"
          placeholder="password"
          className={
            showError
              ? "user__login--form-password error"
              : "user__login--form-password"
          }
        />
        <button
          className={
            showError
              ? "user__login--form--btn errorBtn"
              : "user__login--form--btn"
          }
          type="submit"
        >
          login
        </button>
      </form>

      <p
        className="errorText"
        style={showError ? { display: "block" } : { display: "none" }}
      >
        wrong password or email, please try again
      </p>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
