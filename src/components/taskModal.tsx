import React from "react";

type Task = {
  id: number;
  text: string;
  status: "todo" | "in-progress" | "done" | "backlog";
};

type TaskModalProps = {
  task: Task | null;
  onClose: () => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Task["status"]) => void;
};

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  onClose,
  onDelete,
  onStatusChange,
}) => {
  if (!task) return null; // returns nothing if task is not selected

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-brightness-50">
      <div className="bg-white p-5 rounded-lg w-[90%] max-w-md shadow-lg">
        <h2 className="mb-3 text-lg font-bold text-center">Task Details</h2>
        <p className="mb-4 text-gray-800">{task.text}</p>

        <div className="flex flex-row gap-3">
          {/* Delete Button */}
          <button
            className="px-4 py-2 text-white bg-purple-500 rounded sm:w-28 hover:bg-gray-600"
            onClick={() => onDelete(task.id)}
          >
            Delete Task
          </button>

          {/* Status */}
          <select
            className="text-sm bg-blue-500 border rounded sm:w-28 hover:bg-gray-600 w-28"
            value={task.status}
            onChange={(e) =>
              onStatusChange(task.id, e.target.value as Task["status"])
            }
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
            <option value="backlog">Backlog</option>
          </select>
        </div>

        {/* Close Button */}
        <button
          items-center
          className="px-4 py-2 mt-6 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
