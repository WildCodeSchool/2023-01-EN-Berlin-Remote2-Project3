import { MenuItem } from "../api";
import "../scss/_menuCategory.scss";

const MenuCategory = ({
  dataArr,
  selectedMenuItems,
  setSelectedMenuItems,
}: {
  dataArr: MenuItem[];
  selectedMenuItems: MenuItem[];
  setSelectedMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}) => {
  const selectItemHandle = (item: MenuItem) => {
    const selectedOrder = [...selectedMenuItems, item];
    setSelectedMenuItems(selectedOrder);
  };

  return (
    <div className="menuItems__wrap">
      <ul className="menuItems__container">
        {dataArr.map((item) => (
          <li onClick={() => selectItemHandle(item)} key={item.id}>
            <h5>{item.name}</h5>
            <p>{item.price} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MenuCategory;
