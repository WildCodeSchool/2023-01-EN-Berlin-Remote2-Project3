import "../scss/_MenuOrder.scss";
import deleteIcon from "../assets/deleteIcon.svg";

const MenuOrder = ({
  selectedMenuItems,
  setSelectedMenuItems,
}: {
  selectedMenuItems: any;
  setSelectedMenuItems: any;
}) => {
  const totalPrice = selectedMenuItems
    .map((item) => +item.price)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  const handleDelete = (item) => {
    const deleteItem = selectedMenuItems.filter((remove) => {
      return remove.name !== item;
    });
    const result = confirm(`Are you sure you want to delete ${item} ?`);
    if (result) setSelectedMenuItems(deleteItem);
  };

  return (
    <div className="menuOrder--container">
      <h4>current order</h4>
      {selectedMenuItems.map((item, i) => {
        return (
          <div className="orderedItems" key={i}>
            <ul onClick={() => handleDelete(item.name)}>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <img src={deleteIcon} alt="" />
            </ul>
          </div>
        );
      })}
      <h5>current total price: {totalPrice}.00 €</h5>
    </div>
  );
};

export default MenuOrder;
