import React, { useState } from "react";
import MainBoard from "./mainBoard"; 

function Welcome() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <MainBoard />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-300 via-purple-500 to-pink-400">
      <div className="space-y-8 text-center animate-fadeIn">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-white md:text-6xl animate-bounce">
          Welcome to TaskMaster
        </h1>

        {/* Button */}
        <button
          onClick={() => setShowDashboard(true)}
          className="px-8 py-3 text-lg font-semibold text-white transition duration-300 ease-in-out transform bg-purple-300 rounded-full shadow-lg hover:bg-purple-400 hover:scale-105"
        >
          Enter Dashboard
        </button>
      </div>
    </div>
  );
}

export default Welcome;