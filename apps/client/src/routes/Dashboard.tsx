import { UserInfo } from "../App";
import { Category } from "../api";
import KitchenView from "../components/KitchenView";
import WaiterView from "../components/WaiterView";
import BarView from "../components/BarView";
import FoodRunnerView from "../components/FoodRunnerView";
import Spinner from "../components/Spinner";

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
      return <Spinner />;
  }
};

export default Dashboard;
