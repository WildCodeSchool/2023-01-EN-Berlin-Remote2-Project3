import "../scss/_menuTabs.scss";

const MenuTabs = ({
  data,
  setActiveCategory,
  activeCategory,
}: {
  data: { name: string; id: number }[];
  setActiveCategory: React.Dispatch<React.SetStateAction<number | undefined>>;
  activeCategory: number | undefined;
}) => {
  return (
    <div className="menuTabs__container">
      {data.map((category, i) => (
        <button
          key={i}
          className={`menuTabs ${
            activeCategory === category.id ? "active" : ""
          }`}
          onClick={() => {
            setActiveCategory(category.id);
          }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default MenuTabs;
