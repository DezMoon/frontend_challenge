import React from "react";

// Define the props type
type FiltersProps = {
  statusFilter: string;
  setStatusFilter: any;
  searchTask: string;
  setSearchTask: any;
};

function Filters({ statusFilter, setStatusFilter, searchTask, setSearchTask }: FiltersProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-center">Filter Tasks</h3>

      <div>
        {/* Status dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
          <option value="backlog">Backlog</option>
        </select>

        {/* Search input */}
        <input
          className="w-full px-2 py-1 ml-1 border rounded"
          type="text"
          placeholder="Search tasks..."
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Filters;
