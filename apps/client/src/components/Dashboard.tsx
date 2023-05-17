import DashboardHeader from "./DashboardHeader";
// import DashboardFilterView from "./DashboarFilterView";
import { UserInfo } from "../App";


const Dashboard = ({ userInfo } : {userInfo : UserInfo}) => {
  return (
    <>
      <DashboardHeader userInfo={userInfo} />
      {/* <DashboardFilterView /> */}
    </>
  );
};

export default Dashboard;
