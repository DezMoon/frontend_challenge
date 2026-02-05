import React, { useState, useEffect } from "react";
import Filters from "./filters";
import Pagination from "./pagination";
import ItemsPerPage from "./itemsPerPage";

type Task = {
  id: number;
  text: string;
  status: "todo" | "in-progress" | "done" | "backlog";
};

function MainBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTask, setSearchTask] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  //fetching from jason file

  useEffect(() => {
    fetch("/tasks.json")
      .then((res) => res.json())
      .then((data: Task[]) => {
        setTasks(data);
      });
  }, []);
  //saving to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //adding new task manually
  const addTask = () => {
    if (newTask.trim() === "") return;
    const task: Task = { id: Date.now(), text: newTask, status: "todo" };
    setTasks([...tasks, task]);
    setNewTask("");
  };
  //deleting task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  //task filter and search logic
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchTask.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  //pagination logic
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  //  Task Summary count Logic
  const totalTasks = tasks.length;
  const statusCounts = {
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
    backlog: tasks.filter((t) => t.status === "backlog").length,
  };

  return (
    <div className="min-h-screen bg- bg-linear-to-br from-blue-300 via-purple-500 to-pink-400">
      <header className="h-16 px-4 text-white bg-gray-300 shadow-md ">
        <p className="text-5xl font-semibold text-center text-transparent bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 bg-clip-text">
          TaskMaster Dashboard
        </p>
      </header>

      <div className="flex flex-col gap-6 p-6 md:flex-row">
        {/* Filters */}
        <div className="w-full p-4 rounded shadow md:w-1/3 bg-gray-50">
          <div className="p-4 mt-6 space-y-2 rounded-lg shadow-md bg-purple-50">
            <h2 className="mt-5 text-lg font-bold text-purple-700">
              Task Summary
            </h2>
            <p className="font-medium text-gray-700">
              Total Tasks: {totalTasks}
            </p>
            <ul className="space-y-1 text-gray-600">
              <li>To Do: {statusCounts.todo}</li>
              <li> In Progress: {statusCounts.inProgress}</li>
              <li> Done: {statusCounts.done}</li>
              <li> Backlog: {statusCounts.backlog}</li>
            </ul>
          </div>

          <Filters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            searchTask={searchTask}
            setSearchTask={setSearchTask}
          />
        </div>

        {/* Task List */}

        <div className="w-full p-4 space-y-4 bg-white rounded shadow md:w-2/3">
          <div className="flex space-x-2">
            <input
              className="w-full px-2 py-1 border rounded"
              type="text"
              placeholder="Input new tasks"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              className="px-4 py-1 text-white bg-purple-400 rounded hover:bg-blue-500 "
              onClick={addTask}
            >
              Add Task
            </button>
          </div>

          <ul>
            {currentTasks.map((task) => (
              <li
                key={task.id}
                className="grid items-center grid-cols-3 pb-2 border-b"
              >
                <p className="text-black">{task.text}</p>
                <button
                  className="w-40 px-3 py-1 text-white bg-purple-500 rounded hover:bg-green-300"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
                <select
                  className="w-40 px-3 py-1 text-white bg-blue-400 rounded hover:bg-green-300"
                  value={task.status}
                  onChange={(e) =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id
                          ? { ...t, status: e.target.value as Task["status"] }
                          : t,
                      ),
                    )
                  }
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                  <option value="backlog">Backlog</option>
                </select>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <ItemsPerPage
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(items) => {
              setItemsPerPage(items);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MainBoard;
