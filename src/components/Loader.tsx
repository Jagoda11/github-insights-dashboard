import React from 'react'

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center min-h-screen mt-96">
      <div
        data-testid="loader"
        className="loader animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"
      ></div>
    </div>
  )
}

export default Loader
