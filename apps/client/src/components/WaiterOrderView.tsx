import "../scss/_waiterOrderView.scss";
import { fetchMyTables, TableWithOrders } from "../api";
import { useState, useEffect } from "react";

const WaiterOrderView = ({ token }: { token: string }) => {
  const [myTables, setMyTables] = useState([] as TableWithOrders[]);

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
              <p className="itemOrder--menuBtn">Menu</p>
              <p className="itemOrder--orderBtn">Order</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WaiterOrderView;
