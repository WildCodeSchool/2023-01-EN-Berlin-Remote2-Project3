import { TablePhysical } from "@prisma/client";
import "../scss/_emptyTableOrder.scss";
import menuAddIcon from "../assets/menuIcon.svg";
import { useState } from "react";

const EmptyTableOrder = ({
  selectedTable,
  setSelectedTable,
}: {
  selectedTable: TablePhysical[];
  setSelectedTable: React.Dispatch<React.SetStateAction<TablePhysical[]>>;
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
    </div>
  ) : null;
};

export default EmptyTableOrder;
