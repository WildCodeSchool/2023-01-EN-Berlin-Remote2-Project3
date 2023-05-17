import DashboardHeader from "./DashboardHeader";
import DashboardFilterView from "./DashboarFilterView";

const Dashboard = ({ userInfo }) => {
  return (
    <>
      <DashboardHeader userInfo={userInfo} />
      <DashboardFilterView />
    </>
  );
};

export default Dashboard;
