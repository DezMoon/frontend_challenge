import React from "react";

function Filters() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-center">Filter Tasks</h3>


      <div>
        <select>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <input className="px-2 py-1 border rounded ml-1w-full " type="text" placeholder="Search tasks..."
        />
      </div>
    </div>
  );
}

export default Filters;