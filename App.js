import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
    return (React.createElement(Router, { basename: "/github-insights-dashboard" },
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement("div", null, "Home") }))));
};
export default App;
