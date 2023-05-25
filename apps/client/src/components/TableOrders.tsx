import { useState } from "react";
import menuAddIcon from "../assets/menuIcon.svg";
import "../scss/_waiterOrderView.scss";
import WaiterPopUpMenu from "./WaiterPopUpMenu";

const TableOrders = ({ tableOrders, menuData }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const items = tableOrders.orders;

  const totalPrice = items
    .map((item) => +item.price)
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
          onClick={() => setShowPopUp(!showPopUp)}
          src={menuAddIcon}
          alt="addItem - Icon"
        />
      </div>

      <WaiterPopUpMenu
        menuData={menuData}
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
      />
    </div>
  );
};

export default TableOrders;
