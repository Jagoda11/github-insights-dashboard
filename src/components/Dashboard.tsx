import React, { useEffect, useState } from 'react'
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
  const [year] = useState<number>(new Date().getFullYear())
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
      let totalStarsCount = 0

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

      repos.forEach((repo: any) => {
        totalStarsCount += repo.stargazers_count
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
