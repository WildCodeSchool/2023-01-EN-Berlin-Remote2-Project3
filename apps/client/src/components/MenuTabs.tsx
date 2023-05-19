import { NavLink } from "react-router-dom";
import "../scss/_menuTabs.scss";

const MenuTabs = ({ data }: { data: string[] }) => {
  return (
    <div className="menuTabs__container">
      {data.map((category, index) => (
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending menuTabs"
              : isActive
              ? "active menuTabs"
              : "menuTabs"
          }
          to={(index + 1).toString()}
          key={index + 1}
        >
          {category}
        </NavLink>
      ))}
    </div>
  );
};

export default MenuTabs;
