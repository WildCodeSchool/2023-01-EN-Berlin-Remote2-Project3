import MenuTabs from "../components/MenuTabs";
import { Category } from "../api";
import { Outlet } from "react-router-dom";
import "../scss/_menuTabs.scss";

const Menu = ({ menuDataApi }: { menuDataApi: Category[] }) => {
  return (
    <div className="menu">
      <MenuTabs data={menuDataApi.map((category) => category.name)} />
      <Outlet />
    </div>
  );
};

export default Menu;
