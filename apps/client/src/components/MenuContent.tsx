import MenuCategory from "./MenuCategory";

const MenuContent = ({ data }) => {
  return (
    <ul>
      <MenuCategory dataArr={data.menuItems} />
      {data.childCategories.map((category) => {
        <>
          <h3>{category.name}</h3>
          <MenuCategory dataArr={category.menuItems} />
        </>;
      })}
    </ul>
  );
};

export default MenuContent;
