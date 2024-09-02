import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import './Dashboard.css'; 

const Dashboard = () => {
  const [chartType, setChartType] = useState(() => {
    // Get the chart type from local storage if available
    const savedType = localStorage.getItem('chartType');
    return savedType ? savedType : null;
  });

  const location = useLocation();

  // Reset the chart type when navigating to the dashboard ("/")
  useEffect(() => {
    if (location.pathname === '/') {
      setChartType(null);
      localStorage.removeItem('chartType'); 
    }
  }, [location]);

  const handleImageClick = (type) => {
    setChartType(type);
    localStorage.setItem('chartType', type); 
  };

  const renderChart = () => {
    switch (chartType) {
      case 'BarChart':
        return <BarChart />;
      case 'LineChart':
        return <LineChart />;
      case 'PieChart':
        return <PieChart />;
      default:
        return <p className="no-chart-message">Please select a chart type.</p>;
    }
  };

  return (
    <div className="dashboard">
      <h1>Data Visualization Dashboard</h1>
      <div className="chart-selector">
        <img
          src='/barchart.jpeg'
          alt='BarChart'
          onClick={() => handleImageClick('BarChart')}
          style={{ cursor: 'pointer' }}
        />
        <img
          src='/linechart.jpeg'
          alt='LineChart'
          onClick={() => handleImageClick('LineChart')}
          style={{ cursor: 'pointer' }}
        />
        <img
          src='/Piechart.jpeg'
          alt='PieChart'
          onClick={() => handleImageClick('PieChart')}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className="charts">
        {renderChart()}
      </div>
    </div>
  );
};

export default Dashboard;
