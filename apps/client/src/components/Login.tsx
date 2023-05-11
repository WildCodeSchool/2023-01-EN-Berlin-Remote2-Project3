import { useState } from "react";
// import userLoginIcon from "../assets/icon-user.svg";
import PropTypes from "prop-types";

const Login = ({ setToken }: any) => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const loginUser = async (credentials: any) => {
    return fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  };

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: any) => {
    if (e.target.value === "") {
      console.log("heeeeeeepepepep");
    } else setPassword(e.target.value);
  };

  const submitForm = async (e: any) => {
    e.preventDefault();

    const token = await loginUser({
      email,
      password,
    });

    console.log(token);
    setToken(token);
  };

  return (
    <div>
      <div>{/* <img src={userLoginIcon} alt="" />> */}</div>
      <form onSubmit={submitForm}>
        <input onChange={emailHandler} type="email" placeholder="username" />
        <input
          onChange={passwordHandler}
          type="password"
          placeholder="password"
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
