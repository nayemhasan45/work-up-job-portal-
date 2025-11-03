import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-600">Loading, please wait...</p>
    </div>
  );
};

export default LoadingSpinner;
