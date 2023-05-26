import "../scss/_waiterPopUpMenu.scss";
import Menu from "../routes/Menu";
import { Category } from "../api";
import { useNavigate } from "react-router-dom";

const WaiterPopUpMenu = ({
  showPopUp,
  setShowPopUp,
  menuData,
}: {
  showPopUp: boolean;
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  menuData: Category[];
}) => {
  const navigator = useNavigate();

  const closePopUp = () => {
    setShowPopUp(false);
    navigator("/dashboard");
  };

  return (
    <div>
      <div className={showPopUp ? "popUpWindow" : "hidden"}>
        <Menu menuData={menuData} />
      </div>

      <div
        onClick={closePopUp}
        className={showPopUp ? "overlay" : "hidden"}
      ></div>
    </div>
  );
};

export default WaiterPopUpMenu;
