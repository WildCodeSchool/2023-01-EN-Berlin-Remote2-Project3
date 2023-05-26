import { useState } from "react";
import { MenuItem } from "../api";
import MenuOrder from "./MenuOrder";
import "../scss/_menuCategory.scss";

const MenuCategory = ({ dataArr }: { dataArr: MenuItem[] }) => {
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);

  const selectItemHandle = (item) => {
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

      <MenuOrder
        selectedMenuItems={selectedMenuItems}
        setSelectedMenuItems={setSelectedMenuItems}
      />
    </div>
  );
};
export default MenuCategory;
