import React from "react";

// Define the props type
type FiltersProps = {
  statusFilter: string;
  setStatusFilter: any;
  searchTask: string;
  setSearchTask: any;
};

function Filters({
  statusFilter,
  setStatusFilter,
  searchTask,
  setSearchTask,
}: FiltersProps) {
  return (
    <div>
      <div>
        <select
          className="w-full px-2 py-1 bg-purple-200 border rounded "
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
          <option value="backlog">Backlog</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
