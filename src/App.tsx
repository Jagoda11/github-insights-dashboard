import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

const App: React.FC = () => {
  const token = localStorage.getItem('githubToken')

  return (
    <Router basename="/github-insights-dashboard">
      <Routes>
        {!token ? (
          <Route path="/" element={<Auth />} />
        ) : (
          <Route path="/" element={<Dashboard />} />
        )}
      </Routes>
    </Router>
  )
}
export default App
