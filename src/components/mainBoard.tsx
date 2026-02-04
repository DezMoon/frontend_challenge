import React, { useState, useEffect } from "react";
import Filters from "./filters";
import Pagination from "./pagination"; 

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
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("/tasks.json")
      .then((res) => res.json())
      .then((data: Task[]) => {
        setTasks(data);
      })
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task: Task = { id: Date.now(), text: newTask, status: "todo" };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesSearch = task.text.toLowerCase().includes(searchTask.toLowerCase());
    return matchesStatus && matchesSearch;
  });

 
 //to calculate how many pages needed to display the tasks
const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
//knowng which tasks to show
const startIndex = (currentPage - 1) * itemsPerPage; 
const endIndex = startIndex + itemsPerPage;        
const currentTasks = filteredTasks.slice(startIndex, endIndex); 

  return (
    <div className="flex flex-col gap-6 p-6 md:flex-row">
      {/* Filters section */}
      <div className="w-full p-4 rounded shadow md:w-1/3 bg-gray-50">
        <Filters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchTask={searchTask}
          setSearchTask={setSearchTask}
        />
      </div>

      
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
            className="px-4 py-1 text-white bg-blue-400 rounded hover:bg-blue-500"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        <ul>
          {currentTasks.map((task) => (
            <li key={task.id} className="grid items-center grid-cols-3 pb-2 border-b">
              <p className="text-black">{task.text}</p>
              <button
                className="px-3 py-1 text-white bg-red-500 rounded hover:bg-green-300"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
              <select
                className="px-3 py-1 text-white bg-blue-400 rounded hover:bg-green-300"
                value={task.status}
                onChange={(e) =>
                  setTasks(
                    tasks.map((t) =>
                      t.id === task.id ? { ...t, status: e.target.value as Task["status"] } : t
                    )
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
      </div>
    </div>
  );
}

export default MainBoard;