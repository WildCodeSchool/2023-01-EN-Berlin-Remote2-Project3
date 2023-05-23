import { UserInfo } from "../App";
import KitchenView from "./KitchenView";
import WaiterView from "./WaiterView";

const Dashboard = ({ userInfo }: { userInfo: UserInfo }) => {
  console.log(userInfo);
  switch (userInfo.typeId) {
    case 1:
      return <WaiterView />;
    case 2:
      return <div>some user</div>;
    case 3:
      return <KitchenView />;

    default:
      return <div>Unknow {userInfo.typeId}</div>;
  }
};

export default Dashboard;
