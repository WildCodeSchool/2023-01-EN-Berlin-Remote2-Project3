import "../scss/_MenuOrder.scss";
import deleteIcon from "../assets/deleteIcon.svg";
import { MenuItem } from "../api";

const MenuOrder = ({
  selectedMenuItems,
  setSelectedMenuItems,
  tableId,
}: {
  selectedMenuItems: MenuItem[];
  setSelectedMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  tableId: number;
}) => {
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

  const handleSendOrder = () => {
    // const response = await fetch(`http://localhost:4000/api/tables/${tableId}`, {
    //   method: "POST",
    //   headers: {
    //   },
    //   body: JSON.stringify(credentials),
    // });

    setSelectedMenuItems([]);
    console.dir(selectedMenuItems);
    console.log(tableId);
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
        <h5>
          {selectedMenuItems.length !== 0 ? (
            `current total price: ${totalPrice}.00 €`
          ) : (
            <p style={{ color: "#636363" }}>
              Take your pick from the menu items.
            </p>
          )}
        </h5>
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
