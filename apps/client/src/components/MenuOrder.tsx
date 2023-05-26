import "../scss/_MenuOrder.scss";
import deleteIcon from "../assets/deleteIcon.svg";



const MenuOrder = ({
  selectedMenuItems,
  setSelectedMenuItems,
  tableId
}: {
  selectedMenuItems: any;
  setSelectedMenuItems: any;
  tableId: number;
}) => {

  const totalPrice = selectedMenuItems
    .map((item) => +item.price)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  const handleDelete = (item, i) => {
    const deleteItem = selectedMenuItems.filter((_, index) => {
      return index !== i;
    });
    const result = confirm(`Are you sure you want to delete ${item.name} ?`);
    if (result) setSelectedMenuItems(deleteItem);
  };

  const handleSendOrder = () => {
    // const response = await fetch(`http://localhost:4000/api/tables/${}`, {
    //   method: "POST",
    //   headers: {
    //   },
    //   body: JSON.stringify(credentials),
    // });
    console.dir(selectedMenuItems);
    console.log(tableId);
  };

  return (
    <div className="menuOrder--container">
      <h4>current order</h4>
      {selectedMenuItems.map((item, i) => {
        return (
          <div className="orderedItems" key={i}>
            <ul onClick={() => handleDelete(item, i)}>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <img src={deleteIcon} alt="" />
            </ul>
          </div>
        );
      })}
      <h5>current total price: {totalPrice}.00 €</h5>

      <button onClick={handleSendOrder} className="sendOrderBtn">
        send
      </button>
    </div>
  );
};

export default MenuOrder;
