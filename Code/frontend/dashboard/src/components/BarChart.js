import React, { useEffect, useRef, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchData } from './api'; 
import { SECTORS, TOPICS, REGIONS, PESTLE, SOURCES, COUNTRIES, END_YEARS, INTENSITIES, LIKELIHOODS, RELEVANCES } from '../middleware/Dropdown'; // Import dropdown values
import useFilters from '../middleware/usefilter'; 
import './Barchart.css';

// Register Chart.js components and the zoom plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = React.useState({ labels: [], datasets: [] });
  const chartRef = useRef(null);

  const initialFilters = {
    sector: '',
    topic: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    end_year: '',
    intensity: '',
    likelihood: '',
    relevance: ''
  };

  const { filters, handleFilterChange, resetFilters } = useFilters(initialFilters);

  useEffect(() => {
    const fetchDataWithFilters = async () => {
      try {
        const data = await fetchData(filters);

        if (data && Array.isArray(data)) {
          const labels = data.map(item => item.topic);
          const intensityData = data.map(item => item.intensity);
          const relevanceData = data.map(item => item.relevance);

          setChartData({
            labels,
            datasets: [
              {
                label: "Intensity",
                data: intensityData,
                backgroundColor: "green",
              },
              {
                label: "Relevance",
                data: relevanceData,
                backgroundColor: "blue",
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

  // Function to reset zoom
  const handleResetZoom = useCallback(() => {
    if (chartRef.current) {
      chartRef.current.chartInstance.resetZoom();
    }
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Resources Bar Chart",
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy'
        },
        pan: {
          enabled: true,
          mode: 'xy'
        }
      }
    },
  };

  return (
    <div className="chart-container">
      <div className="filters">
        <label>
          Sector:
          <select name="sector" value={filters.sector} onChange={(e) => handleFilterChange(e.target.name, e.target.value)}>
            <option value="">All</option>
            {SECTORS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Topic:
          <select name="topic" value={filters.topic} onChange={(e) => handleFilterChange(e.target.name, e.target.value)}>
            {TOPICS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Region:
          <select name="region" value={filters.region} onChange={(e) => handleFilterChange(e.target.name, e.target.value)}>
            {REGIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          PESTLE:
          <select name="pestle" value={filters.pestle} onChange={(e) => handleFilterChange(e.target.name, e.target.value)}>
            {PESTLE.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Source:
          <select name="source" value={filters.source} onChange={(e) => handleFilterChange(e.target.name, e.target.value)}>
            {SOURCES.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Country:
          <select name="country" value={filters.country} onChange={(e) => handleFilterChange(e.target.name, e.target.value)}>
            {COUNTRIES.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          End Year:
          <select name="end_year" value={filters.end_year} onChange={(e) => handleFilterChange(e.target.name, e.target.value)}>
            {END_YEARS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Intensity:
          <select name="intensity" value={filters.intensity} onChange={(e) => handleFilterChange(e.target.name, e.target.value)}>
            <option value="">All</option>
            {INTENSITIES.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Likelihood:
          <select name="likelihood" value={filters.likelihood} onChange={(e) => handleFilterChange(e.target.name, e.target.value)}>
            <option value="">All</option>
            {LIKELIHOODS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Relevance:
          <select name="relevance" value={filters.relevance} onChange={(e) => handleFilterChange(e.target.name, e.target.value)}>
            <option value="">All</option>
            {RELEVANCES.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <h2>Bar Chart Example</h2>
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
