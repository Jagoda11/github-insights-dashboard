import React from 'react'

interface SummaryProps {
  loading: boolean
  userInfo: {
    public_repos: number
    followers: number
    following: number
  } | null
  totalCommits: number
}

const Summary: React.FC<SummaryProps> = ({
  loading,
  userInfo,
  totalCommits,
}) => {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Summary</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        userInfo && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center bg-blue-100 p-4 rounded-lg shadow-inner">
              <svg
                className="w-12 h-12 text-blue-500 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3v18h18V3H3z"
                ></path>
              </svg>
              <p className="text-lg font-medium">Projects</p>
              <p className="text-3xl font-bold text-blue-500">
                {userInfo.public_repos}
              </p>
            </div>
            <div className="flex flex-col items-center bg-green-100 p-4 rounded-lg shadow-inner">
              <svg
                className="w-12 h-12 text-green-500 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 8a6 6 0 11-12 0 6 6 0 0112 0zM2 20h20v2H2v-2z"
                ></path>
              </svg>
              <p className="text-lg font-medium">Followers</p>
              <p className="text-3xl font-bold text-green-500">
                {userInfo.followers}
              </p>
            </div>
            <div className="flex flex-col items-center bg-purple-100 p-4 rounded-lg shadow-inner">
              <svg
                className="w-12 h-12 text-purple-500 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              <p className="text-lg font-medium">Following</p>
              <p className="text-3xl font-bold text-purple-500">
                {userInfo.following}
              </p>
            </div>
            <div className="flex flex-col items-center bg-yellow-100 p-4 rounded-lg shadow-inner">
              <svg
                className="w-12 h-12 text-yellow-500 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              <p className="text-lg font-medium">Commits This Year</p>
              <p className="text-3xl font-bold text-yellow-500">
                {totalCommits}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default Summary
