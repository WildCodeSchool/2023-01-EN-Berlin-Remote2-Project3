import { UserInfo } from "../App";
import Login from "../components/Login";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export const LoginPage = ({
  token,
  setToken,
  userInfo,
  setUserInfo,
}: {
  token: string | undefined;
  setToken: (userToken: string) => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}) => {
  return !token ? (
    <Login setToken={setToken} setUserInfo={setUserInfo} />
  ) : (
    <div>
      <Header userInfo={userInfo} setToken={setToken} />

      <Outlet />
    </div>
  );
};
