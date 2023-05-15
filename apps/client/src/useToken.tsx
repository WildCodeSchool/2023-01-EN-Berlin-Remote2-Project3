import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const tokenString: any = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken);

  console.log(token);

  const saveToken = (userToken: any): any => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
