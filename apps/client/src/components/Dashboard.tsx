import DashboardHeader from "./DashboardHeader";
import DashboardFilterView from "./DashboarFilterView";
import Menu from "./Menu";
import { UserInfo } from "../App";

const Dashboard = ({ userInfo }: { userInfo: UserInfo }) => {
  return (
    <>
      <DashboardHeader userInfo={userInfo} />
      <DashboardFilterView />
      <Menu />
    </>
  );
};

export default Dashboard;
