import "../scss/_dashboardHeader.scss";
import logoutIcon from "../assets/logout.svg";
import userIcon from "../assets/icon-user.svg";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigator = useNavigate();

  const deleteLocalStorage = () => {
    localStorage.removeItem("token");
    location.reload();

    navigator("/login");
  };

  return (
    <header className="header">
      <div className="header__restaurantName">
        <p>Aurora Grille</p>
      </div>

      <div className="header__username">
        <img src={userIcon} alt="user icon" />
        <p>username</p>
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
