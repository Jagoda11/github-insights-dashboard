import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from 'react-router-dom'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import CommitList from './components/CommitList'

const App: React.FC = () => {
  const token = localStorage.getItem('githubToken')
  return (
    <Router basename="/github-insights-dashboard">
      <div className="p-4">
        {token && (
          <nav className="mb-4 flex justify-center space-x-4">
            <Link to="/" className="text-blue-500 hover:text-blue-700">
              Dashboard
            </Link>
            <Link to="/commits" className="text-blue-500 hover:text-blue-700">
              Commit List
            </Link>
          </nav>
        )}
        <Routes>
          {!token ? (
            <Route path="/" element={<Auth />} />
          ) : (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/commits" element={<CommitList />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  )
}

export default App
