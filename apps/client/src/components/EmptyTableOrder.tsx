import { useState } from "react";
import menuAddIcon from "../assets/menuIcon.svg";
import WaiterPopUpMenu from "./WaiterPopUpMenu";
import { Category } from "../api";
import { TablePhysical } from "@prisma/client";
import "../scss/_emptyTableOrder.scss";

const EmptyTableOrder = ({
  selectedTable,
  setSelectedTable,
  menuData,
  tableId,
  token,
}: {
  selectedTable: TablePhysical;
  setSelectedTable: React.Dispatch<React.SetStateAction<TablePhysical>>;
  menuData: Category[];
  tableId: number;
  token: string;
}) => {
  const [showPopUp, setShowPopUp] = useState(false);

  return selectedTable.length !== 0 ? (
    <div className="cardContainer">
      <div className="cardHeader">
        <p>{selectedTable.name}</p>
      </div>

      <p className="emptyCard--message">please add your order</p>
      <div className="itemOrder--btn">
        <img
          onClick={() => setShowPopUp((x) => !x)}
          src={menuAddIcon}
          alt="addItem - Icon"
        />
      </div>
      {showPopUp === true ? (
        <WaiterPopUpMenu
          tableId={tableId}
          token={token}
          menuData={menuData}
          hidePopUp={() => {
            setShowPopUp(false);
          }}
        />
      ) : null}
    </div>
  ) : null;
};

export default EmptyTableOrder;
