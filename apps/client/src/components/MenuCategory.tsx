import { MenuItem } from "../api";

const MenuCategory = ({ dataArr } : {dataArr : MenuItem[]}) => {
  return (
    <ul>
      {dataArr.map((item) => (
        <li key={item.id} >
          <h5>{item.name}</h5>
          <p>{item.price}</p>
        </li>
      ))}
    </ul>
  );
};
export default MenuCategory;