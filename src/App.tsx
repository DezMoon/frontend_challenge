function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">TaskMaster Challenge</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to the Frontend Coding Challenge. Check the <code className="bg-gray-200 px-2 py-1 rounded">README.md</code> for instructions.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-left">
          <h2 className="text-xl font-semibold mb-4">Your Mission:</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Create a Task Management Dashboard.</li>
            <li>Fetch tasks from a mock API.</li>
            <li>Implement filtering and search.</li>
            <li>Style it to look "Premium".</li>
          </ul>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Good luck! 🚀
        </div>
      </div>
    </div>
  )
}

export default App
