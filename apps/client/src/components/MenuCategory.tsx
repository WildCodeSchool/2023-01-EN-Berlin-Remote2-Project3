import { MenuItem } from "../api";
import "../scss/_menuCategory.scss";

const MenuCategory = ({ dataArr }: { dataArr: MenuItem[] }) => {
  return (
    <ul className="menuItems__container">
      {dataArr.map((item) => (
        <li key={item.id}>
          <h5>{item.name}</h5>
          <p>{item.price} €</p>
        </li>
      ))}
    </ul>
  );
};
export default MenuCategory;
