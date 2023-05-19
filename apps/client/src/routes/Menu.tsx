import "../scss/_MenuItems.scss";
import MenuTabs from "../components/MenuTabs";
import MenuContent from "../components/MenuContent";
import { Category } from "../api";

const Menu = ({
  menuDataApi,
  activeCategory = -1,
}: {
  menuDataApi: Category[];
  activeCategory: number;
}) => {
  return (
    <div className="MenuTabs">
      <MenuTabs
        active={activeCategory}
        data={menuDataApi.map((category) => category.name)}
      />
      {activeCategory === -1 ? null : (
        <MenuContent data={menuDataApi[activeCategory]} />
      )}
    </div>
  );
};

export default Menu;
