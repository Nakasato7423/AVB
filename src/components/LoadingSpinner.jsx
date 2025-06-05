import React from 'react';

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default LoadingSpinner;
