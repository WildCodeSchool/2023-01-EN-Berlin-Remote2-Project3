import "../scss/_header.scss";
import logoutIcon from "../assets/logout.svg";
import userIcon from "../assets/icon-user.svg";
import { UserInfo } from "../App";
import { useNavigate } from "react-router-dom";

const DashboardHeader = ({
  userInfo,
  setToken,
}: {
  userInfo: UserInfo;
  setToken: (userToken: string) => void;
}) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__restaurantName">
        <p>Aurora Grille</p>
      </div>

      <div className="header__username">
        <img src={userIcon} alt="user icon" />
        <p>{userInfo.name}</p>
      </div>
      <div className="header__logout">
        <img onClick={logoutHandler} src={logoutIcon} alt="logout button" />
      </div>
    </header>
  );
};

export default DashboardHeader;
