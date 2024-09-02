import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/BarChart" element={<BarChart />} />
          <Route path="/LineChart" element={<LineChart />} />
          <Route path="/PieChart" element={<PieChart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
