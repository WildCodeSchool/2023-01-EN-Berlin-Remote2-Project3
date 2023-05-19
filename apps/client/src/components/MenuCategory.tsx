const MenuCategory = ({ dataArr }) => {
  return (
    <ul>
      {dataArr.map((item) => (
        <li>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
        </li>
      ))}
    </ul>
  );
};
export default MenuCategory;
