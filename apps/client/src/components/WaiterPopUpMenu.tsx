import "../scss/_waiterPopUpMenu.scss";
import Menu from "../routes/Menu";
import { Category } from "../api";

const WaiterPopUpMenu = ({
  hidePopUp,
  menuData,
  tableId,
}: {
  hidePopUp: () => void;
  menuData: Category[];
  tableId: number;
}) => {
  const closePopUp = () => {
    hidePopUp();
  };

  return (
    <div>
      <div className="popUpWindow">
        <Menu menuData={menuData} tableId={tableId} />
      </div>

      <div onClick={closePopUp} className="overlay"></div>
    </div>
  );
};

export default WaiterPopUpMenu;
