import { Category } from "../api";
import MenuCategory from "./MenuCategory";
import { useParams } from "react-router-dom";

const MenuContent = ({ data }: { data: Category[] }) => {
  const { menuCategory } = useParams();
  
  const activeCat = data.find((category) => {
    if (typeof menuCategory === 'string') {
      return category.id === parseInt(menuCategory);
    }
    return false;
  });



  return ( activeCat ?
    <ul>
      <MenuCategory dataArr={activeCat.menuItems} />
      {activeCat.childCategories.map((category) => (
        <> 
          <h3>{category.name}</h3>
          <MenuCategory  dataArr={category.menuItems} />
        </>
      ))}
    </ul> : <h1>No active category {menuCategory ?? "undefined"}</h1>
  );
};

export default MenuContent;
