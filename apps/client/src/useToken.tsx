import { useState } from "react";

type Token = {
  token: string;
};

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      const userToken: Token | null = JSON.parse(tokenString);
      return userToken?.token;
    }
  };

  const [token, setToken] = useState(getToken);

  const saveToken = (userToken: Token): void => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
