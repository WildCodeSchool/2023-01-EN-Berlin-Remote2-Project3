import "../scss/_waiterOrderView.scss";
import { fetchMyTables, Order } from "../api";
import { useState, useEffect } from "react";

const WaiterOrderView = ({ token }: { token: string }) => {
  const [itemDataApi, setItemDataApi] = useState([] as Order[]);

  useEffect(() => {
    const validateToken = async () => {
      const res = await fetchMyTables(token);

      if (!res) {
        console.error("error reading the tableDataApi");
      } else {
        setItemDataApi(res);
      }
    };
    validateToken();
  }, []);

  return (
    <div className="waiterOrderview">
      {itemDataApi.map((data, i) => {
        const items = data.orders;
        let totalPrice = 0;
        items.forEach((item) => {
          console.log(item.price);
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
                  <li>completed</li>
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
