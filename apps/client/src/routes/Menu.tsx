import "../scss/_MenuItems.scss";
import MenuTabs from "../components/MenuTabs";
import { Category } from "../api";
import { Outlet } from "react-router-dom";

const Menu = ({
  menuDataApi,
}: {
  menuDataApi: Category[];
}) => {
  return (
    <div className="MenuTabs">
      <MenuTabs data={menuDataApi.map((category) => category.name)} />
      <Outlet />
    </div>
  );
};

export default Menu;
