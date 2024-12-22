import React, { useEffect, useState } from 'react'
import {
  getUserInfo,
  fetchUserRepos,
  getRepoCommits,
  getRepoLanguages,
} from '../api/githubApi'
import Filters from './Filters'
import CommitFrequencyChart from './CommitFrequencyChart'
import ProgrammingLanguagesChart from './ProgrammingLanguagesChart'
import Summary from './Summary'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

const Dashboard: React.FC = () => {
  const [commitData, setCommitData] = useState<any>(null)
  const [languageData, setLanguageData] = useState<any>(null)
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [totalCommits, setTotalCommits] = useState<number>(0)
  const [username, setUsername] = useState<string>(
    localStorage.getItem('githubUsername') ?? '',
  )

  const fetchAllCommits = async (username: string, repoName: string) => {
    let page = 1
    let allCommits: any[] = []
    let hasMoreCommits = true

    while (hasMoreCommits) {
      try {
        const commits = await getRepoCommits(username, repoName, page)
        if (commits.length > 0) {
          allCommits = allCommits.concat(commits)
          page += 1
        } else {
          hasMoreCommits = false
        }
      } catch (error) {
        console.error(`Failed to fetch commits for ${repoName}:`, error)
        hasMoreCommits = false
      }
    }

    return allCommits
  }

  const fetchData = async (selectedYear: number, username: string) => {
    if (!username) return

    setLoading(true)
    setError(null)

    try {
      const user = await getUserInfo(username)
      setUserInfo(user)

      const repos = await fetchUserRepos(username)
      const commitPromises = repos.map((repo: any) =>
        fetchAllCommits(username, repo.name).catch((err) => {
          console.error(`Failed to fetch commits for repo ${repo.name}:`, err)
          return []
        }),
      )
      const languagePromises = repos.map((repo: any) =>
        getRepoLanguages(username, repo.name),
      )

      const commitResults = await Promise.all(commitPromises)
      const languageResults = await Promise.all(languagePromises)

      // Process commit data for the bar chart
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      const totalCommitsPerMonth = Array(12).fill(0)
      let yearlyCommitCount = 0

      commitResults.forEach((repoCommits: any) => {
        repoCommits.forEach((commit: any) => {
          const date = new Date(commit.commit.author.date)
          const commitYear = date.getFullYear()
          if (commitYear === selectedYear) {
            const month = date.getMonth() // Get month index (0-11)
            totalCommitsPerMonth[month] += 1
            yearlyCommitCount += 1
          }
        })
      })

      const commitData = {
        labels: months,
        datasets: [
          {
            label: 'Commits',
            data: totalCommitsPerMonth,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      }

      // Aggregate language data across all repositories
      const aggregatedLanguages: { [key: string]: number } = {}
      languageResults.forEach((repoLanguages: any) => {
        Object.entries(repoLanguages).forEach(([language, count]) => {
          if (aggregatedLanguages[language]) {
            aggregatedLanguages[language] += count as number
          } else {
            aggregatedLanguages[language] = count as number
          }
        })
      })

      // Process language data for the pie chart
      const languageData = {
        labels: Object.keys(aggregatedLanguages),
        datasets: [
          {
            data: Object.values(aggregatedLanguages),
            backgroundColor: [
              '#FF6384', // Red
              '#36A2EB', // Blue
              '#FFCE56', // Yellow
              '#4BC0C0', // Teal
              '#8A2BE2', // BlueViolet
              '#FF4500', // OrangeRed
              '#32CD32', // LimeGreen
              '#FFD700', // Gold
              '#00FA9A', // MediumSpringGreen
              '#DC143C', // Crimson
              '#00BFFF', // DeepSkyBlue
              '#FF1493', // DeepPink
              '#8B4513', // SaddleBrown
              '#2E8B57', // SeaGreen
              '#FF6347', // Tomato
              '#4682B4', // SteelBlue
              '#D2691E', // Chocolate
              '#A52A2A', // Brown
              '#5F9EA0', // CadetBlue
              '#DDA0DD', // Plum
            ],
          },
        ],
      }

      setCommitData(commitData)
      setLanguageData(languageData)
      setTotalCommits(yearlyCommitCount)
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

  useEffect(() => {
    if (username) {
      fetchData(year, username)
      const interval = setInterval(
        () => fetchData(year, username),
        15 * 60 * 1000,
      ) // Auto-refresh every 15 minutes
      return () => clearInterval(interval)
    }
  }, [username, year])

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = Number(event.target.value)
    setYear(selectedYear)
    if (username) {
      fetchData(selectedYear, username)
    }
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value
    setUsername(newUsername)
    localStorage.setItem('githubUsername', newUsername)
    if (newUsername) {
      fetchData(year, newUsername)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">GitHub Insights Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          GitHub Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <Filters year={year} handleYearChange={handleYearChange} />
      <CommitFrequencyChart loading={loading} commitData={commitData} />
      <ProgrammingLanguagesChart
        loading={loading}
        languageData={languageData}
      />
      <Summary
        loading={loading}
        userInfo={userInfo}
        totalCommits={totalCommits}
      />
    </div>
  )
}

export default Dashboard
