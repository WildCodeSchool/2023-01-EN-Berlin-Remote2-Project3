import "../scss/_waiterPopUpMenu.scss";
import Menu from "../routes/Menu";
import { Category } from "../api";
import { useNavigate } from "react-router-dom";

const WaiterPopUpMenu = ({
  hidePopUp,
  menuData,
}: {
  hidePopUp: () => void;
  menuData: Category[];
}) => {
  const navigator = useNavigate();

  const closePopUp = () => {
    hidePopUp();
    navigator("/dashboard");
  };

  return (
    <div>
      <div className="popUpWindow">
        <Menu menuData={menuData} />
      </div>

      <div onClick={closePopUp} className="overlay"></div>
    </div>
  );
};

export default WaiterPopUpMenu;
