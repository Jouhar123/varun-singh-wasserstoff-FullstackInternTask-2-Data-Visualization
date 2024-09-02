import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchData } from './api'; 
import './Linechart.css';  
import useFilters from '../middleware/usefilter'; 
import { SECTORS, TOPICS, REGIONS, PESTLE, END_YEARS, INTENSITIES, LIKELIHOODS, RELEVANCES, SOURCES, COUNTRIES} from '../middleware/Dropdown';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
  const { filters, handleFilterChange, resetFilters } = useFilters({
    sector: '',
    topic: '',
    intensity: '',
    region: '',
    pestle: '',
    end_year: '',
    likelihood: '',
    relevance: '',
    country: '',
  
    source: '',
  });
  
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchDataWithFilters = async () => {
      try {
        const data = await fetchData(filters);

        if (data && Array.isArray(data)) {
          const labels = data.map(item => item.end_year);
          const intensityData = data.map(item => item.intensity);

          setChartData({
            labels,
            datasets: [
              {
                label: "Intensity Over Time",
                data: intensityData,
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                fill: true,
              },
            ],
          });
        } else {
          console.error('Data is not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataWithFilters();
  }, [filters]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Resources Line Chart",
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="filters">
        <label>
          Sector:
          <select name="sector" value={filters.sector} onChange={e => handleFilterChange(e.target.name, e.target.value)}>
            {SECTORS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Topic:
          <select name="topic" value={filters.topic} onChange={e => handleFilterChange(e.target.name, e.target.value)}>
            {TOPICS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Intensity:
          <select name="intensity" value={filters.intensity} onChange={e => handleFilterChange(e.target.name, e.target.value)}>
            {INTENSITIES.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Relevance:
          <select name="relevance" value={filters.relevance} onChange={e => handleFilterChange(e.target.name, e.target.value)}>
            {RELEVANCES.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Likelihood:
          <select name="likelihood" value={filters.likelihood} onChange={e => handleFilterChange(e.target.name, e.target.value)}>
            {LIKELIHOODS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Countries:
          <select name="country" value={filters.country} onChange={e => handleFilterChange(e.target.name, e.target.value)}>
            {COUNTRIES.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Source:
          <select name="source" value={filters.source} onChange={e => handleFilterChange(e.target.name, e.target.value)}>
            {SOURCES.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Region:
          <select name="region" value={filters.region} onChange={e => handleFilterChange(e.target.name, e.target.value)}>
            {REGIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          PESTLE:
          <select name="pestle" value={filters.pestle} onChange={e => handleFilterChange(e.target.name, e.target.value)}>
            {PESTLE.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          End Year:
          <select name="end_year" value={filters.end_year} onChange={e => handleFilterChange(e.target.name, e.target.value)}>
            {END_YEARS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        
        <button onClick={resetFilters}>Reset Filters</button>
      
      </div>

      <h2>Line Chart Example</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
