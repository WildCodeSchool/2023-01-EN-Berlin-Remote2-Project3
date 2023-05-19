import "../scss/_dashboardMenu.scss";

const DashboardMenu = ({ items }) => {
  return (
    <div className="menuItems__container">
      <p className="menuItems__item">{items}</p>
    </div>
  );
};

export default DashboardMenu;
