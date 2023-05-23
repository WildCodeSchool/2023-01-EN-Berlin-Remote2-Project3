import { UserInfo } from "../App";
import KitchenView from "./KitchenView";

const Dashboard = ({ userInfo }: { userInfo: UserInfo }) => {
  console.log(userInfo);
  switch (userInfo.typeId) {
    case 1:
      return <div>Waiter View</div>;
    case 3:
      return <KitchenView />;

    default:
      return <div>Unknow {userInfo.typeId}</div>;
  }
};

export default Dashboard;
