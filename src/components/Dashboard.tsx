import React, { useEffect, useState, useCallback } from 'react'
import {
  getUserInfo,
  fetchUserRepos,
  getRepoCommits,
  getRepoLanguages,
} from '../api/githubApi'
import CommitFrequencyChart from './CommitFrequencyChart'
import ProgrammingLanguagesChart from './ProgrammingLanguagesChart'
import Summary from './Summary'
import Loader from './Loader'
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
  const [totalCommits, setTotalCommits] = useState<number>(0)
  const [totalStars, setTotalStars] = useState<number>(0)
  const [username] = useState<string>(
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

  const fetchData = useCallback(async (username: string) => {
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

      const now = new Date()
      const last12MonthsLabels: string[] = []
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        last12MonthsLabels.push(d.toLocaleString('default', { month: 'long' }))
      }
      const totalCommitsPerMonth = new Array(12).fill(0)
      let commitCountLast12Months = 0

      commitResults.forEach((repoCommits: any) => {
        repoCommits.forEach((commit: any) => {
          const date = new Date(commit.commit.author.date)
          const diffInMonths =
            (now.getFullYear() - date.getFullYear()) * 12 +
            (now.getMonth() - date.getMonth())
          if (diffInMonths >= 0 && diffInMonths < 12) {
            totalCommitsPerMonth[11 - diffInMonths] += 1
            commitCountLast12Months += 1
          }
        })
      })

      const commitData = {
        labels: last12MonthsLabels,
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

      const languageData = {
        labels: Object.keys(aggregatedLanguages),
        datasets: [
          {
            data: Object.values(aggregatedLanguages),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#8A2BE2',
              '#FF4500',
              '#32CD32',
              '#FFD700',
              '#00FA9A',
              '#DC143C',
              '#00BFFF',
              '#FF1493',
              '#8B4513',
              '#2E8B57',
              '#FF6347',
              '#4682B4',
              '#D2691E',
              '#A52A2A',
              '#5F9EA0',
              '#DDA0DD',
            ],
          },
        ],
      }

      setCommitData(commitData)
      setLanguageData(languageData)
      setTotalCommits(commitCountLast12Months)

      let totalStarsCount = 0
      repos.forEach((repo: any) => {
        totalStarsCount += repo.stargazers_count
      })
      setTotalStars(totalStarsCount)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (username) {
      fetchData(username)
      const interval = setInterval(() => fetchData(username), 15 * 60 * 1000) // Auto-refresh every 15 minutes
      return () => clearInterval(interval)
    }
  }, [username, fetchData])

  return (
    <div className="p-4">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
        GitHub Insights Dashboard
      </h1>

      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4"></div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-2/3 p-2">
            <CommitFrequencyChart loading={loading} commitData={commitData} />
            <div className="mt-4">
              <ProgrammingLanguagesChart
                loading={loading}
                languageData={languageData}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/3 p-2 flex flex-col gap-6">
            <Summary
              loading={loading}
              userInfo={{ ...userInfo, total_stars: totalStars }}
              totalCommits={totalCommits}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
