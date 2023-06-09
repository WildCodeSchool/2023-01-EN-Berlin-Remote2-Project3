import "../scss/_waiterOrderView.scss";
import { fetchMyTables, Category } from "../api";
import { useState, useEffect } from "react";
import TableOrders from "./TableOrders";
import EmptyTableOrder from "./EmptyTableOrder";
import { TablePhysical } from "@prisma/client";
import { ResponseGetTablesMine } from "prisma-queries";

const WaiterOrderView = ({
  token,
  menuData,
  selectedTable,
  setSelectedTable,
}: {
  token: string;
  menuData: Category[];
  selectedTable: TablePhysical;
  setSelectedTable: React.Dispatch<React.SetStateAction<TablePhysical>>;
}) => {
  const [myTables, setMyTables] = useState([] as ResponseGetTablesMine);
  const selectedTableId = selectedTable.id;

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
            token={token}
          />
        );
      })}

      <EmptyTableOrder
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
        menuData={menuData}
        token={token}
        tableId={selectedTableId}
      />
    </div>
  );
};

export default WaiterOrderView;
