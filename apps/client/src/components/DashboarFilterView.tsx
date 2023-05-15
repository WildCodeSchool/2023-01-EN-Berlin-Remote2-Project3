import "../scss/_dashboardFilterView.scss";
import settingsIcon from "../assets/settingsIcon.svg";

const DashboardFilterView = () => {
  return (
    <div className="dashboard__filter">
      <div className="dashboard__filter--sections">
        <select name="test">
          <option value="lakeView">Lake View</option>
          <option value="GartenView">Garten View</option>
          <option value="MiddleSection">Middle Section</option>
          <option value="Patio">Patio</option>
          <option value="PDR">PDR</option>
        </select>
      </div>

      <div className="dashboard__filter--tableStatus">
        <img src={settingsIcon} alt="settings" />
      </div>
    </div>
  );
};

export default DashboardFilterView;
