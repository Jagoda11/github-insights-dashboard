import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import {
  getUserInfo,
  fetchUserRepos,
  getRepoCommitActivity,
  getRepoLanguages,
} from '../api/githubApi'

const Dashboard: React.FC = () => {
  const [commitData, setCommitData] = useState<any>(null)
  const [languageData, setLanguageData] = useState<any>(null)
  const [userInfo, setUserInfo] = useState<any>(null)
  const username = localStorage.getItem('githubUsername')

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return

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

      // Process language data for the pie chart
      const languageData = {
        labels: Object.keys(languageResults[0]),
        datasets: [
          {
            data: Object.values(languageResults[0]),
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
    }

    fetchData()
  }, [username])

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">GitHub Insights Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-xl mb-2">Commit Frequency</h2>
        {commitData ? <Bar data={commitData} /> : <p>Loading...</p>}
      </div>
      <div className="mb-4">
        <h2 className="text-xl mb-2">Programming Languages</h2>
        {languageData ? <Pie data={languageData} /> : <p>Loading...</p>}
      </div>
      <div className="mb-4">
        <h2 className="text-xl mb-2">Summary</h2>
        {userInfo ? (
          <div>
            <p>Projects: {userInfo.public_repos}</p>
            <p>Followers: {userInfo.followers}</p>
            <p>Following: {userInfo.following}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
