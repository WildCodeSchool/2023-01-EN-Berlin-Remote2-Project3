const MenuOrder = ({
  selectedMenuItems,
  setSelectedMenuItems,
}: {
  selectedMenuItems: any;
  setSelectedMenuItems: any;
}) => {
  console.log(selectedMenuItems);

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
    <div>
      <h3>your order</h3>
      {selectedMenuItems.map((item) => {
        return (
          <div>
            <ul onClick={() => handleDelete(item.name)}>
              <li>{item.name}</li>
              <li>{item.price}</li>
            </ul>
          </div>
        );
      })}
      <p>current price:{totalPrice}.00 €</p>
    </div>
  );
};

export default MenuOrder;
