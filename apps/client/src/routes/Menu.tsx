import MenuTabs from "../components/MenuTabs";
import { Category } from "../api";
import { Outlet } from "react-router-dom";
import "../scss/_menuTabs.scss";

const Menu = ({ menuData }: { menuData: Category[] }) => {
  if (Array.isArray(menuData))
    return (
      <div className="menu">
        <MenuTabs data={menuData.map((category) => category.name)} />
        <Outlet />
      </div>
    );
  
  return <h3>Menu data is not an array.</h3>;
};

export default Menu;
