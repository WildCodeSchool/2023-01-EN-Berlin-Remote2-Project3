import "../scss/_waiterOrderView.scss";
import { fetchMyTables, TableWithOrders, Category, TableInterface } from "../api";
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
  selectedTable: TableInterface[];
  setSelectedTable: React.Dispatch<React.SetStateAction<TableInterface[]>>
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
          <TableOrders
            tableOrders={data}
            key={data.id}
            menuData={menuData}
            tableId={data.id}
          />
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
