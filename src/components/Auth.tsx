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
    <div className="p-4">
      <h2 className="text-xl mb-4">GitHub Authentication</h2>
      <p className="mb-4">
        To use this dashboard, you need to provide a GitHub Personal Access
        Token. This token allows the application to fetch data from your GitHub
        account.
      </p>
      <p className="mb-4">
        <a
          href="https://github.com/settings/tokens"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Click here to generate a GitHub Personal Access Token
        </a>
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
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Auth
