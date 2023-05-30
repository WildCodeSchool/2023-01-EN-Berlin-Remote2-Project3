import "../scss/_waiterPopUpMenu.scss";
import Menu from "../routes/Menu";
import { Category } from "../api";

const WaiterPopUpMenu = ({
  hidePopUp,
  menuData,
  tableId,
  token,
}: {
  hidePopUp: () => void;
  menuData: Category[];
  tableId: number;
  token: string;
}) => {
  const closePopUp = () => {
    hidePopUp();
  };

  return (
    <div>
      <div className="popUpWindow">
        <Menu menuData={menuData} tableId={tableId} token={token} />
      </div>

      <div onClick={closePopUp} className="overlay"></div>
    </div>
  );
};

export default WaiterPopUpMenu;
