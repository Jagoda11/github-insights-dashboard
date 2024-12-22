import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import CommitList from './components/CommitList'

const App: React.FC = () => {
  const token = localStorage.getItem('githubToken')

  // Dynamically set basename depending on the environment
  const isLocal = window.location.origin.includes('localhost')
  const basename = isLocal ? '/' : '/github-insights-dashboard'

  return (
    <Router basename={basename}>
      <Routes>
        {!token ? (
          <Route path="/" element={<Auth />} />
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/commits" element={<CommitList />} />
          </>
        )}
      </Routes>
    </Router>
  )
}
export default App
