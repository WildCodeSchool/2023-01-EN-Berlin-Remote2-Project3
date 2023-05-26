import { Category } from "../api";
import MenuCategory from "./MenuCategory";

const MenuContent = ({
  data,
  activeCategory,
  selectedMenuItems,
  setSelectedMenuItems
}: {
  data: Category[];
  activeCategory: number | undefined;
  selectedMenuItems: any;
  setSelectedMenuItems: any;
}) => {
  const activeCat =
    typeof activeCategory === "number"
      ? data.find((category) => category.id === activeCategory)
      : undefined;

  return activeCat ? (
    <>
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
    <h1>No active category</h1>
  );
};

export default MenuContent;
