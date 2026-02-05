import React from "react";

type ItemsPerPageProps = {
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
};

function ItemsPerPage({
  itemsPerPage,
  onItemsPerPageChange,
}: ItemsPerPageProps) {
  function handleRowsChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const rows = Number(e.target.value);
    onItemsPerPageChange(rows);
  }

  return (
    <select
      value={itemsPerPage}
      onChange={handleRowsChange}
      className="w-24 px-2 py-1 border rounded"
    >
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={30}>30</option>
      <option value={40}>40</option>
      <option value={50}>50</option>
    </select>
  );
}

export default ItemsPerPage;
