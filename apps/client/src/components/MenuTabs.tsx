import { NavLink } from "react-router-dom";

const MenuTabs = ({ data }: { data: string[] }) => {
  return (
    <>
      {data.map((category, index) => (
        <NavLink to={(index + 1).toString()} key={index + 1}>
          {category}
        </NavLink>
      ))}
    </>
  );
};

export default MenuTabs;
