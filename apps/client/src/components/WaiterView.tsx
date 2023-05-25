import { tableData } from "../api";
import { useEffect, useState } from "react";
import "../scss/_WaiterView.scss";
// import { useNavigate } from "react-router-dom";
import { TableInterface } from "../api";
import WaiterOrderView from "./WaiterOrderView";

const WaiterView = ({ token, menuData }: { token: string; menuData: any }) => {
  const [tableDataApi, setTableDataApi] = useState([] as TableInterface[]);
  const [selectedTable, setSelectedTable] = useState({});
  const [hideTables, setHideTables] = useState(true);

  // const navigator = useNavigate();

  useEffect(() => {
    const data = async () => {
      const res = await tableData();
      if (res === undefined) {
        console.error("error reading the tableDataApi");
      } else {
        setTableDataApi(res);
      }
    };
    data();
  }, []);

  const tableHandler = (table: TableInterface) => {
    // navigator("/menu");
    setHideTables(true);
  };

  const selectTableHandler = (table: TableInterface) => {
    setSelectedTable(table);
  };

  return (
    <div className="button">
      <button onClick={() => setHideTables(!hideTables)}>
        {hideTables ? "table show" : "table hide"}
      </button>
      <div className={hideTables ? "hidden" : "waiterViewTables "}>
        {tableDataApi.map((table) => {
          return (
            <ul onClick={() => selectTableHandler(table)} key={table.id}>
              <li
                // className={
                //   // Just for testing
                //   table.statusId === 1
                //     ? "tableStatusId1"
                //     : table.statusId === 2
                //     ? "tableStatusId2"
                //     : table.statusId === 3
                //     ? "tableStatusId3"
                //     : table.statusId === 4
                //     ? "tableStatusId4"
                //     : ""
                // }
                onClick={() => tableHandler(table)}
              >
                {table.name}
              </li>
            </ul>
          );
        })}
      </div>
      <WaiterOrderView
        token={token}
        menuData={menuData}
        selectedTable={selectedTable}
      />
    </div>
  );
};

export default WaiterView;
