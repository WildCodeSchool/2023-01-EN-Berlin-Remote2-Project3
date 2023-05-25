import "../scss/_waiterOrderView.scss";
import { fetchMyTables, TableWithOrders } from "../api";
import { useState, useEffect } from "react";
import WaiterPopUpMenu from "./WaiterPopUpMenu";
import TableOrders from "./TableOrders";

const WaiterOrderView = ({
  token,
  menuData,
  selectedTable,
}: {
  token: string;
  menuData: any;
  selectedTable: any;
}) => {
  const [myTables, setMyTables] = useState([] as TableWithOrders[]);

  useEffect(() => {
    const validateToken = async () => {
      const res = await fetchMyTables(token);

      if (!res) {
        console.error("error reading the tableDataApi");
      } else {
        setMyTables(res);
      }
    };
    validateToken();
  }, []);

  return (
    <div className="waiterOrderview">
      {myTables.map((data) => {
        return (
          <TableOrders tableOrders={data} key={data.id} menuData={menuData} />
        );
      })}
    </div>
  );
};

export default WaiterOrderView;
