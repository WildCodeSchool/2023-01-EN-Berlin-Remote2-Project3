import { TablePhysical } from "@prisma/client";

const EmptyTableOrder = ({
  selectedTable,
  setSelectedTable,
}: {
  selectedTable: TablePhysical[];
  setSelectedTable: React.Dispatch<React.SetStateAction<TablePhysical[]>>;
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
      {selectedTable.map((table) => {
        return (
          <h5 key={table.id} onClick={() => handleDelete(table.name)}>
            {table.name}
          </h5>
        );
      })}
    </div>
  );
};

export default EmptyTableOrder;
