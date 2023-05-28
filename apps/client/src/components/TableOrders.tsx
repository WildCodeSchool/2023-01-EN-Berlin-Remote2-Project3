import { useState } from "react";
import menuAddIcon from "../assets/menuIcon.svg";
import "../scss/_waiterOrderView.scss";
import WaiterPopUpMenu from "./WaiterPopUpMenu";
import { Category, TableWithOrders } from "../api";

const TableOrders = ({
  tableOrders,
  menuData,
  tableId,
  token,
}: {
  tableOrders: TableWithOrders;
  menuData: Category[];
  tableId: number;
  token: string;
}) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const items = tableOrders.orders;

  const totalPrice = items
    .map((item) => Number(item.price))
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  return (
    <div className="cardContainer">
      <div className="cardHeader">
        <p>{tableOrders.name}</p>
      </div>
      <div className="itemOrder">
        <p className="itemOrder--title">Item Order:</p>

        <div className="itemOrder--items">
          <ul>
            item
            {items.map((item) => (
              <li key={item.id}>{item.name} </li>
            ))}
          </ul>
          <ul>
            status
            {items.map((item) => (
              <li key={item.id}>{item.status} </li>
            ))}
          </ul>
          <ul>
            price
            {items.map((item) => (
              <li key={item.id}>{item.price} €</li>
            ))}
          </ul>
        </div>

        <p className="totalPrice">total price: {totalPrice}.00 €</p>
      </div>

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
  );
};

export default TableOrders;
