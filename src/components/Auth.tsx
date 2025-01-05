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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="/github-mark.png" alt="GitHub Logo" className="w-32 h-32" />
        </div>
        <h2 className="text-2xl mb-4 text-center">GitHub Authentication</h2>
        <p className="mb-4 text-center">
          To use this dashboard, you need to provide a GitHub Personal Access
          Token.
        </p>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            GitHub Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            GitHub Personal Access Token:
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
          <p className="mb-4 text-center">
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Click here to generate a GitHub Personal Access Token
            </a>
          </p>
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
