import { UserInfo } from "../App";
import { Category } from "../api";
import KitchenView from "./KitchenView";
import WaiterView from "./WaiterView";
import BarView from "./BarView";
import FoodRunnerView from "./FoodRunnerView";

const Dashboard = ({
  userInfo,
  token,
  menuData,
}: {
  userInfo: UserInfo;
  token: string;
  menuData: Category[];
}) => {
  switch (userInfo.typeId) {
    case 1:
      return <WaiterView token={token} menuData={menuData} />;
    case 2:
      return <FoodRunnerView />;
    case 3:
      return <KitchenView />;
    case 4:
      return <BarView />;

    default:
      return <div>Unknow {userInfo.typeId}</div>;
  }
};

export default Dashboard;
