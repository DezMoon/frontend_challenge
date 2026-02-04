import React, { useState, useEffect } from "react";

type Task = {
  id: number;
  text: string;
  status: "todo" | "in-progress" | "done" | "backlog";
};

function TaskCount({ tasks }: { tasks: Task[] }) {
  const [totalTasks, setTotalTasks] = useState(0);
  const [statusCounts, setStatusCounts] = useState({
    todo: 0,
    inProgress: 0,
    done: 0,
    backlog: 0,
  });

  // Whenever tasks change, recalculate totals
  useEffect(() => {
    setTotalTasks(tasks.length);

    setStatusCounts({
      todo: tasks.filter((t) => t.status === "todo").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      done: tasks.filter((t) => t.status === "done").length,
      backlog: tasks.filter((t) => t.status === "backlog").length,
    });
  }, [tasks]);

  return (
    <div className="p-4 space-y-2 rounded-lg shadow-md bg-purple-50">
      <h2 className="text-lg font-bold text-purple-700">Task Summary</h2>
      <p className="font-medium text-gray-700">Total Tasks: {totalTasks}</p>
      <ul className="space-y-1 text-gray-600">
        <li> To Do: {statusCounts.todo}</li>
        <li> In Progress: {statusCounts.inProgress}</li>
        <li> Done: {statusCounts.done}</li>
        <li> Backlog: {statusCounts.backlog}</li>
      </ul>
    </div>
  );
}

export default TaskCount;