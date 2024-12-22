import React, { useEffect, useState } from 'react'
import {
  getUserInfo,
  fetchUserRepos,
  getRepoCommitActivity,
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
  const username = localStorage.getItem('githubUsername')

  const fetchData = async () => {
    if (!username) return

    setLoading(true)
    setError(null)

    try {
      const user = await getUserInfo(username)
      setUserInfo(user)

      const repos = await fetchUserRepos(username)
      const commitPromises = repos.map((repo: any) =>
        getRepoCommitActivity(username, repo.name),
      )
      const languagePromises = repos.map((repo: any) =>
        getRepoLanguages(username, repo.name),
      )

      const commitResults = await Promise.all(commitPromises)
      const languageResults = await Promise.all(languagePromises)

      // Process commit data for the bar chart
      const commitData = {
        labels: commitResults.map((result: any) => result.week),
        datasets: [
          {
            label: 'Commits',
            data: commitResults.map((result: any) => result.total),
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
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
          },
        ],
      }

      setCommitData(commitData)
      setLanguageData(languageData)
    } catch (error) {
      setError('Failed to fetch data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 15 * 60 * 1000) // Auto-refresh every 15 minutes
    return () => clearInterval(interval)
  }, [username, year])

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value))
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">GitHub Insights Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Filters year={year} handleYearChange={handleYearChange} />
      <CommitFrequencyChart loading={loading} commitData={commitData} />
      <ProgrammingLanguagesChart
        loading={loading}
        languageData={languageData}
      />
      <Summary loading={loading} userInfo={userInfo} />
    </div>
  )
}

export default Dashboard
