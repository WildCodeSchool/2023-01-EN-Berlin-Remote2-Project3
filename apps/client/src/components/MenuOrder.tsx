import "../scss/_MenuOrder.scss";
import deleteIcon from "../assets/deleteIcon.svg";
import { MenuItem } from "../api";
import { useState } from "react";

const MenuOrder = ({
  selectedMenuItems,
  setSelectedMenuItems,
  tableId,
  token,
}: {
  selectedMenuItems: MenuItem[];
  setSelectedMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  tableId: number;
  token: string;
}) => {
  const [orderSendMessage, setOrderSendMessage] = useState(false);

  const totalPrice: number = selectedMenuItems
    .map((item) => +item.price)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  const handleDelete = (item: MenuItem, i: number) => {
    const deleteItem = selectedMenuItems.filter((_, index) => {
      return index !== i;
    });
    const result = confirm(`Are you sure you want to delete ${item.name} ?`);
    if (result) setSelectedMenuItems(deleteItem);
  };

  const handleSendOrder = async () => {
    const itemsId = selectedMenuItems.map((item) => item.id);
    const requestBody = {
      orders: itemsId,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/tables/${tableId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const code = {
          uniqueCode: data.uniqueCode,
        };

        const putResponse = await fetch(
          `http://localhost:4000/api/tables/${tableId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(code), // Pass the code in the body of the PUT request
          }
        );

        if (putResponse.ok) {
          setSelectedMenuItems([]);
          setOrderSendMessage(true);
        } else {
          throw new Error("uniqe code error, please try again");
        }
      } else {
        throw new Error("faild to send order");
      }

      // Reload the page after 2 seconds to show the results from mineTables!
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (err) {
      console.error("error", err);

      // just for test
      setOrderSendMessage(false);
    }
  };

  return (
    <div className="menuOrder--Wrap">
      <div className="menuOrder--container">
        <h4>current order</h4>
        {selectedMenuItems.map((item, i) => {
          return (
            <div className="orderedItems" key={i}>
              <ul>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <img
                  onClick={() => handleDelete(item, i)}
                  src={deleteIcon}
                  alt="delete item icon"
                />
              </ul>
            </div>
          );
        })}
        {orderSendMessage ? (
          <h4>
            {orderSendMessage ? (
              <h4 style={{ color: " #00FF00" }}>Order Successful</h4>
            ) : (
              <h4 style={{ color: "#FF0000" }}>
                Failed to send the order. Please try again.
              </h4>
            )}
          </h4>
        ) : (
          <h5>
            {selectedMenuItems.length !== 0 ? (
              `current total price: ${totalPrice}.00 €`
            ) : (
              <p style={{ color: "#636363" }}>
                Take your pick from the menu items.
              </p>
            )}
          </h5>
        )}
      </div>
      <div className="menuOrder__btn--container">
        <p onClick={handleSendOrder} className="sendOrderBtn">
          send
        </p>
      </div>
    </div>
  );
};

export default MenuOrder;
