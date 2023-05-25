import { UserInfo } from "../App";
import KitchenView from "./KitchenView";
import WaiterView from "./WaiterView";

const Dashboard = ({
  userInfo,
  token,
  menuData,
}: {
  userInfo: UserInfo;
  token: string;
  menuData: any;
}) => {
  switch (userInfo.typeId) {
    case 1:
      return <WaiterView token={token} menuData={menuData} />;
    case 2:
      return <div>some user</div>;
    case 3:
      return <KitchenView />;

    default:
      return <div>Unknow {userInfo.typeId}</div>;
  }
};

export default Dashboard;
