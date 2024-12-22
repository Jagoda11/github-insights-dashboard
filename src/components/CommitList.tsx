import React, { useState, useEffect } from 'react'

interface Commit {
  sha: string
  commit: {
    message: string
    author: {
      date: string
    }
  }
  html_url: string
}

const CommitList: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCommits, setFilteredCommits] = useState<Commit[]>([])

  useEffect(() => {
    const fetchCommits = async () => {
      const response = await fetch(
        'https://api.github.com/repos/{owner}/{repo}/commits',
      )
      const data: Commit[] = await response.json()
      setCommits(data)
      setFilteredCommits(data)
    }

    fetchCommits()
  }, [])

  useEffect(() => {
    const filtered = commits.filter((commit) =>
      commit.commit.message.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCommits(filtered)
  }, [searchTerm, commits])

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Commit List</h2>
      <input
        type="text"
        placeholder="Search commits"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <ul>
        {filteredCommits.map((commit) => (
          <li key={commit.sha} className="mb-2">
            <a
              href={commit.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {commit.commit.message}
            </a>
            <p>{new Date(commit.commit.author.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommitList
