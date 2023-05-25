import "../scss/_waiterOrderView.scss";
import menuAddIcon from "../assets/menuIcon.svg";
import { fetchMyTables, TableWithOrders } from "../api";
import { useState, useEffect } from "react";
import WaiterPopUpMenu from "./WaiterPopUpMenu";

const WaiterOrderView = ({ token }: { token: string }) => {
  const [myTables, setMyTables] = useState([] as TableWithOrders[]);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const res = await fetchMyTables(token);

      if (!res) {
        console.error("error reading the tableDataApi");
      } else {
        setMyTables(res);
      }
    };
    validateToken();
  }, []);

  return (
    <div className="waiterOrderview">
      {myTables.map((data, i) => {
        const items = data.orders;
        let totalPrice = 0;
        items.forEach((item) => {
          totalPrice += Number(item.price); // Add item price to total price
        });
        return (
          <div key={i} className="cardContainer">
            <div className="cardHeader">
              <p>{data.name}</p>
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
                alt="addItemIcon"
              />
            </div>
          </div>
        );
      })}
      <WaiterPopUpMenu showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
    </div>
  );
};

export default WaiterOrderView;
