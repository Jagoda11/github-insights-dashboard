import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const App: React.FC = () => {
  return (
    <Router basename="/github-insights-dashboard">
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </Router>
  )
}
export default App
