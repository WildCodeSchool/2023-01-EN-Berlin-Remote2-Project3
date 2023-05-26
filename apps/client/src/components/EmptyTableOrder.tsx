import { TableInterface } from "../api";

const EmptyTableOrder = ({
  selectedTable,
  setSelectedTable,
}: {
  selectedTable: TableInterface[];
  setSelectedTable: React.Dispatch<React.SetStateAction<TableInterface[]>>;
}) => {
  const handleDelete = (table: string) => {
    const deleteTable = selectedTable.filter((te) => {
      return te.name !== table;
    });
    const result = confirm(`Are you sure you want to delete table ${table} ?`);
    if (result) setSelectedTable(deleteTable);
  };

  return (
    <div>
      {selectedTable.map((table, i) => {
        return (
          <h5 key={i} onClick={() => handleDelete(table.name)}>
            {table.name}
          </h5>
        );
      })}
    </div>
  );
};

export default EmptyTableOrder;
