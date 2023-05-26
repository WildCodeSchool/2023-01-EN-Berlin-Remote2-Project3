import { NavLink } from "react-router-dom";
import "../scss/_menuTabs.scss";

const MenuTabs = ({
  data,
  setActiveCategory,
}: {
  data: { name: string; id: number }[];
  setActiveCategory: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  return (
    <div className="menuTabs__container">
      {data.map((category) => (
        <button onClick={() => {setActiveCategory(category.id)}}>
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default MenuTabs;
