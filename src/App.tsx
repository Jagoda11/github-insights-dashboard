import React from 'react'
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import CommitList from './components/CommitList'

const App: React.FC = () => {
  const token = localStorage.getItem('githubToken')

  const isLocal = window.location.origin.includes('localhost')
  const basename = isLocal ? '/' : '/github-insights-dashboard'

  return (
    <Router basename={basename}>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4">
            Dashboard
          </Link>
          <Link to="/commits">Commit List</Link>
        </nav>
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
      </div>
    </Router>
  )
}

export default App
