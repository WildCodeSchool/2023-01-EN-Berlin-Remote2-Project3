import "../scss/_header.scss";
import logoutIcon from "../assets/logout.svg";
import userIcon from "../assets/icon-user.svg";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../App";

const DashboardHeader = ({ userInfo }: { userInfo: UserInfo }) => {
  const navigator = useNavigate();

  const deleteLocalStorage = () => {
    localStorage.removeItem("token");
    location.reload();

    navigator("/");
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
        <img
          onClick={deleteLocalStorage}
          src={logoutIcon}
          alt="logout button"
        />
      </div>
    </header>
  );
};

export default DashboardHeader;
