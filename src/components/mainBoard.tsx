import React, { useState, useEffect } from "react";
import Filters from "./filters";
import Pagination from "./pagination";
import ItemsPerPage from "./itemsPerPage";
import TaskModal from "./taskModal";

type Task = {
  id: number;
  text: string;
  status: "todo" | "in-progress" | "done" | "backlog";
};

function MainBoard() {
  //Initialize tasks from localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTask, setSearchTask] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Track selected task for modal
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  //fetch tasks.json only if localStorage was empty
  useEffect(() => {
    if (tasks.length === 0) {
      fetch("/tasks.json")
        .then((res) => res.json())
        .then((data: Task[]) => {
          setTasks(data);
        });
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const task: Task = { id: Date.now(), text: newTask, status: "todo" };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Delete task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setSelectedTask(null); // close modal if deleted
  };

  // Filter + search
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchTask.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  // Summary
  const totalTasks = tasks.length;
  const statusCounts = {
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
    backlog: tasks.filter((t) => t.status === "backlog").length,
  };

  return (
    <div className=" bg-linear-to-br from-blue-300 via-purple-500 to-pink-400">
      <header className="h-16 px-4 mt-5 text-white bg-gray-300 shadow-md">
        <p className="pt-1 text-3xl font-semibold text-center text-transparent sm:text-4xl md:text-5xl bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 bg-clip-text">
          TaskMaster Dashboard
        </p>
      </header>

      {/* Main container */}
      <div className="w-full max-w-5xl p-5 mx-auto mt-6 bg-white rounded shadow">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div className="p-4 text-center rounded shadow sm:w-1/3 bg-gray-50">
            <h2 className="text-lg font-bold text-purple-700 sm:text-xl">
              Task Summary
            </h2>
            <p className="font-medium text-gray-700">
              Total Tasks: {totalTasks}
            </p>
            <ul className="space-y-1 text-gray-600">
              <li>To Do: {statusCounts.todo}</li>
              <li>In Progress: {statusCounts.inProgress}</li>
              <li>Done: {statusCounts.done}</li>
              <li>Backlog: {statusCounts.backlog}</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 sm:w-2/3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                className="flex-1 min-w-0 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="text"
                placeholder="Input new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  className="w-full px-5 py-2 text-sm font-medium text-white transition bg-purple-500 rounded shadow sm:w-auto hover:bg-purple-600"
                  onClick={addTask}
                >
                  Add Task
                </button>
                <ItemsPerPage
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={(items) => {
                    setItemsPerPage(items);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                className="flex-1 min-w-0 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Search tasks..."
                value={searchTask}
                onChange={(e) => setSearchTask(e.target.value)}
              />
              <div className="w-full sm:w-48">
                <Filters
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  searchTask={searchTask}
                  setSearchTask={setSearchTask}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border rounded">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_auto] bg-gray-100 font-semibold text-sm border-b">
            <div className="px-3 py-2 pl-25 ">Tasks</div>
            <div className="px-3 py-2 text-right pr-25">Actions</div>
          </div>

          {/* Task items */}
          <ul>
            {currentTasks.map((task) => (
              <li
                key={task.id}
                className="grid grid-cols-[1fr_auto] items-center gap-2 py-2 border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedTask(task)}
              >
                {/* Task text */}
                <p className="px-3 text-sm text-black sm:text-base">
                  {task.text.length > 100
                    ? task.text.slice(0, 100) + "..."
                    : task.text}
                </p>

                {/* Actions */}
                <div className="flex flex-row items-center gap-2 px-3">
                  <select
                    className="px-2 py-1 text-xs text-white bg-blue-500 rounded sm:w-24 hover:bg-gray-600"
                    value={task.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      setTasks(
                        tasks.map((t) =>
                          t.id === task.id
                            ? { ...t, status: e.target.value as Task["status"] }
                            : t,
                        ),
                      );
                    }}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="backlog">Backlog</option>
                  </select>
                  <button
                    className="px-2 py-1 text-xs text-white bg-purple-500 rounded sm:w-24 hover:bg-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* task  modal */}
      <TaskModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onDelete={deleteTask}
        onStatusChange={(id, status) =>
          setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)))
        }
      />

      <footer className="bottom-0 w-full h-2 px-4 mt-5 bg-gray-300 shadow-md pb-15">
        <p className="pt-6 mt-2 text-xs text-center text-gray-500">
          © 2026 TaskMaster Dashboard
        </p>
      </footer>
    </div>
  );
}

export default MainBoard;
