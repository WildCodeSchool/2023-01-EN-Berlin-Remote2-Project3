import "../scss/_waiterPopUpMenu.scss";
import Menu from "../routes/Menu";
import { Category } from "../api";

const WaiterPopUpMenu = ({
  showPopUp,
  setShowPopUp,
  menuData,
}: {
  showPopUp: boolean;
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  menuData: Category[];
}) => {
  return (
    <div>
      <div className={showPopUp ? "popUpWindow" : "hidden"}>
        <Menu menuData={menuData} />
      </div>

      <div
        onClick={() => setShowPopUp(false)}
        className={showPopUp ? "overlay" : "hidden"}
      ></div>
    </div>
  );
};

export default WaiterPopUpMenu;
