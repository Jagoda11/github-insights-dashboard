import React, { useState } from 'react'

const Auth: React.FC = () => {
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('githubToken', token)
    localStorage.setItem('githubUsername', username)
    window.location.reload() // Reload to apply the token
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <div className="flex justify-center mb-6">
          <img
            src={`${
              window.location.hostname === 'localhost'
                ? '/GithubMark.png'
                : '/github-insights-dashboard/GithubMark.png'
            }`}
            alt="GitHub Logo"
            className="w-32 h-32"
          />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          GitHub Authentication
        </h2>
        <p className="mb-6 text-center text-gray-600">
          To use this dashboard, you need to provide a GitHub Personal Access
          Token.
        </p>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">GitHub Username:</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">GitHub Personal Access Token:</span>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <p className="mb-6 text-center">
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Click here to generate a GitHub Personal Access Token
            </a>
          </p>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
