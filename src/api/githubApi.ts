const HOST = 'https://api.github.com'
const token = localStorage.getItem('githubToken')

const headers = {
  Authorization: `token ${token}`,
  'Content-Type': 'application/json',
}

export const fetchUserRepos = async (username: string): Promise<any> => {
  const response = await fetch(`${HOST}/users/${username}/repos`, { headers })
  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`)
  }
  const data = await response.json()
  return data
}

export const getRepoCommitActivity = async (
  owner: string,
  repo: string,
): Promise<any> => {
  const response = await fetch(
    `${HOST}/repos/${owner}/${repo}/stats/commit_activity`,
    { headers },
  )
  if (!response.ok) {
    throw new Error(
      `Failed to fetch commit activity with status: ${response.status}`,
    )
  }
  const data = await response.json()
  return data
}

export const getRepoLanguages = async (
  owner: string,
  repo: string,
): Promise<any> => {
  const response = await fetch(`${HOST}/repos/${owner}/${repo}/languages`, {
    headers,
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch languages with status: ${response.status}`)
  }
  const data = await response.json()
  return data
}

export const getRepoCommits = async (
  owner: string,
  repo: string,
  page: number = 1,
  per_page: number = 100,
): Promise<any> => {
  const url = `${HOST}/repos/${owner}/${repo}/commits?page=${page}&per_page=${per_page}`
  const response = await fetch(url, { headers })
  if (!response.ok) {
    if (response.status === 409) {
      // Handle 409 Conflict error specifically
      throw new Error(
        `Repository ${repo} is in a state that prevents fetching commits (status: 409)`,
      )
    }
    throw new Error(`Failed to fetch commits with status: ${response.status}`)
  }
  const data = await response.json()
  return data
}

export const getUserInfo = async (username: string): Promise<any> => {
  const response = await fetch(`${HOST}/users/${username}`, { headers })
  if (!response.ok) {
    throw new Error(`Failed to fetch user info with status: ${response.status}`)
  }
  const data = await response.json()
  return data
}
