import "../scss/_waiterOrderView.scss";
import { fetchMyTables, TableWithOrders, Category } from "../api";
import { useState, useEffect } from "react";
import TableOrders from "./TableOrders";
import EmptyTableOrder from "./EmptyTableOrder";

const WaiterOrderView = ({
  token,
  menuData,
  selectedTable,
  setSelectedTable,
}: {
  token: string;
  menuData: Category[];
  selectedTable: any;
  setSelectedTable: any;
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

      <EmptyTableOrder
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
      />
    </div>
  );
};

export default WaiterOrderView;
