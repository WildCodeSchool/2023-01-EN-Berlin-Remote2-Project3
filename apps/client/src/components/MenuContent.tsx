import { Category, MenuItem } from "../api";
import MenuCategory from "./MenuCategory";

const MenuContent = ({
  data,
  activeCategory,
  selectedMenuItems,
  setSelectedMenuItems,
}: {
  data: Category[];
  activeCategory: number | undefined;
  selectedMenuItems: MenuItem[];
  setSelectedMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}) => {
  console.log(selectedMenuItems);

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
            <h5>{category.name}</h5>
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
    <h5 className="menuContentMessage">
      In order to proceed, please indicate your desired category:
    </h5>
  );
};

export default MenuContent;
