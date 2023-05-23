import { tableData } from "../api";
import { useEffect, useState } from "react";
import "../scss/_WaiterView.scss";
import { useNavigate } from "react-router-dom";
import { TableInterface } from "../api";

const WaiterView = () => {
  const [tableDataApi, setTableDataApi] = useState([]);
  const [selectedTable, setSelectedTable] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    const data = async () => {
      const res = await tableData();
      setTableDataApi(res);
    };
    data();
  }, []);

  const tableHandler = (table: TableInterface) => {
    setSelectedTable(table);
    // navigator("/menu");
  };
  console.log(selectedTable);

  return (
    <div className="waiterViewTables">
      {tableDataApi.map((table) => {
        return (
          <ul key={table.id}>
            <li onClick={() => tableHandler(table)}>{table.name}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default WaiterView;
