import React, { useState, useEffect } from 'react'
import { getRepoCommits, fetchUserRepos, getUserInfo } from '../api/githubApi'

interface Commit {
  sha: string
  commit: {
    message: string
    author: {
      date: string
      name: string
    }
  }
  author: {
    avatar_url: string
  }
  html_url: string
}

const CommitList: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [commits, setCommits] = useState<Commit[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCommits, setFilteredCommits] = useState<Commit[]>([])
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const isValidUsername = (username: string) => {
    // Check if the username is valid (e.g., not empty and meets GitHub username criteria)
    return username.length >= 3 // Example criteria: at least 3 characters
  }

  const fetchCommits = async (owner: string) => {
    if (owner && isValidUsername(owner)) {
      setLoading(true)
      setError(null)
      try {
        const userInfo = await getUserInfo(owner)
        setAvatarUrl(userInfo.avatar_url)

        const repos = await fetchUserRepos(owner)
        const commitPromises = repos.map((repo: any) =>
          getRepoCommits(owner, repo.name).catch((err) => {
            console.error(`Failed to fetch commits for repo ${repo.name}:`, err)
            return []
          }),
        )
        const commitResults = await Promise.all(commitPromises)
        const allCommits = commitResults
          .flat()
          .sort(
            (a, b) =>
              new Date(b.commit.author.date).getTime() -
              new Date(a.commit.author.date).getTime(),
          )
        setCommits(allCommits)
        setFilteredCommits(allCommits)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (isValidUsername(username)) {
      fetchCommits(username)
    }
  }, [username])

  useEffect(() => {
    const filtered = commits.filter((commit) =>
      commit.commit.message.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCommits(filtered)
  }, [searchTerm, commits])

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('Text')
    setUsername(pastedText)
  }

  const groupedCommits = filteredCommits.reduce(
    (groups: { [key: string]: Commit[] }, commit) => {
      const date = new Date(commit.commit.author.date).toLocaleDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(commit)
      return groups
    },
    {},
  )

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Commit List</h2>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onPaste={handlePaste}
        className="border p-2 w-full mb-4 rounded"
      />
      <input
        type="text"
        placeholder="Search commits"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading &&
        !error &&
        Object.keys(groupedCommits).map((date) => (
          <div key={date} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{date}</h3>
            <ul className="space-y-4">
              {groupedCommits[date].map((commit) => (
                <li
                  key={commit.sha}
                  className="flex items-center bg-white p-4 rounded shadow"
                >
                  <img
                    src={commit.author?.avatar_url || avatarUrl}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {commit.commit.message}
                    </a>
                    <p className="text-gray-600">
                      {new Date(commit.commit.author.date).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  )
}

export default CommitList
