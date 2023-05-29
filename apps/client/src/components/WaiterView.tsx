import { tableData } from "../api";
import { useEffect, useState } from "react";
import "../scss/_WaiterView.scss";
// import { useNavigate } from "react-router-dom";
import { Category } from "../api";
import WaiterOrderView from "./WaiterOrderView";
import { TablePhysical } from "@prisma/client";

const WaiterView = ({
  token,
  menuData,
}: {
  token: string;
  menuData: Category[];
}) => {
  const [tableDataApi, setTableDataApi] = useState([] as TablePhysical[]);
  const [selectedTable, setSelectedTable] = useState([] as TablePhysical[]);
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

  const tableHandler = (table: TablePhysical) => {
    // navigator("/menu");
    setHideTables(true);

    // storing all selected tables in state!
    const updateClickedItem = [...selectedTable, table];
    setSelectedTable(updateClickedItem);
  };

  const handelToggleTables = () => {
    setHideTables(!hideTables);
  };

  return (
    <div className="waiterView-container">
      <div className="togglebuttonContainer ">
        {!hideTables ? "Table Visibility On" : "Table Visibility Off"}
        <label className="container">
          <input onClick={handelToggleTables} type="checkbox" className="cB" />
          <div className="line-toggle">
            <div className="lineCircle-toggle"></div>
          </div>
        </label>
      </div>
      {!hideTables && (
        <div className="waiterViewTables">
          {tableDataApi.map((table) => {
            return (
              <ul key={table.id}>
                <li onClick={() => tableHandler(table)}>{table.name}</li>
              </ul>
            );
          })}
        </div>
      )}
      <WaiterOrderView
        token={token}
        menuData={menuData}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
      />
    </div>
  );
};

export default WaiterView;
