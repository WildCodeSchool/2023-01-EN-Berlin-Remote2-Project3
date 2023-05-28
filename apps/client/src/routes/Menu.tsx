import MenuTabs from "../components/MenuTabs";
import { Category, MenuItem } from "../api";
import "../scss/_menuTabs.scss";
import MenuContent from "../components/MenuContent";
import MenuOrder from "../components/MenuOrder";
import { useState } from "react";

const Menu = ({
  menuData,
  tableId,
}: {
  menuData: Category[];
  tableId: number;
}) => {
  const [selectedMenuItems, setSelectedMenuItems] = useState([] as MenuItem[]);
  const [activeCategory, setActiveCategory] = useState<number | undefined>();

  if (Array.isArray(menuData))
    return (
      <div className="menu">
        <MenuTabs
          data={menuData.map((category) => ({
            name: category.name,
            id: category.id,
          }))}
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
        />
        <MenuContent
          data={menuData}
          activeCategory={activeCategory}
          selectedMenuItems={selectedMenuItems}
          setSelectedMenuItems={setSelectedMenuItems}
        />

        {activeCategory && (
          <MenuOrder
            selectedMenuItems={selectedMenuItems}
            setSelectedMenuItems={setSelectedMenuItems}
            tableId={tableId}
          />
        )}
      </div>
    );

  return <h3>Menu data is not an array.</h3>;
};

export default Menu;
