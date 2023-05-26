import { Category } from "../api";
import MenuCategory from "./MenuCategory";
import { useParams } from "react-router-dom";
import { useState } from "react";
import MenuOrder from "./MenuOrder";

const MenuContent = ({ data }: { data: Category[] }) => {
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const { menuCategory } = useParams();

  const activeCat = data.find((category) => {
    if (typeof menuCategory === "string") {
      return category.id === parseInt(menuCategory);
    }
    return false;
  });

  return activeCat ? (
    <>
      <MenuOrder
        selectedMenuItems={selectedMenuItems}
        setSelectedMenuItems={setSelectedMenuItems}
      />
      <ul>
        <MenuCategory
          dataArr={activeCat.menuItems}
          selectedMenuItems={selectedMenuItems}
          setSelectedMenuItems={setSelectedMenuItems}
        />
        {activeCat.childCategories.map((category) => (
          <div key={category.id}>
            <h3>{category.name}</h3>
            <MenuCategory
              dataArr={category.menuItems}
              selectedMenuItems={selectedMenuItems}
              setSelectedMenuItems={setSelectedMenuItems}
            />
          </div>
        ))}
      </ul>
    </>
  ) : (
    <h1>No active category {menuCategory ?? "undefined"}</h1>
  );
};

export default MenuContent;
