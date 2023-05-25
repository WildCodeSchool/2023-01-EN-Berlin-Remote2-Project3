import { UserInfo } from "../App";
import KitchenView from "./KitchenView";
import WaiterView from "./WaiterView";

const Dashboard = ({
  userInfo,
  token,
}: {
  userInfo: UserInfo;
  token: string;
}) => {
  switch (userInfo.typeId) {
    case 1:
      return <WaiterView token={token} />;
    case 2:
      return <div>some user</div>;
    case 3:
      return <KitchenView />;

    default:
      return <div>Unknow {userInfo.typeId}</div>;
  }
};

export default Dashboard;
