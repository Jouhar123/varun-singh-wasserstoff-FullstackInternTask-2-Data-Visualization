import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchData } from './api'; 
import useFilters from '../middleware/usefilter';  
import { SECTORS, TOPICS, REGIONS, PESTLE, END_YEARS, INTENSITIES, LIKELIHOODS, RELEVANCES, SOURCES, COUNTRIES } from '../middleware/Dropdown';
import './Piechart.css';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const PieChart = () => {
  const { filters, handleFilterChange, resetFilters } = useFilters({
    sector: '',
    topic: '',
    intensity: '',
    region: '',
    pestle: '',
    end_year: '',
    likelihood: '',
    relevance: '',
    source: '',
    country: '',

  });

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchDataWithFilters = async () => {
      try {
        const data = await fetchData(filters);

        if (data && Array.isArray(data)) {
          const aggregatedData = data.reduce((acc, item) => {
            const topic = item.topic || 'Unknown'; 
            acc[topic] = (acc[topic] || 0) + item.intensity;
            return acc;
          }, {});

          const labels = Object.keys(aggregatedData);
          const values = Object.values(aggregatedData);

           const colorPalette = [
            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
            "#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", "#E6B333",
            "#3366E6", "#999966", "#99FF99", "#B34D4D", "#80B300", "#809900",
            "#E6B3B3", "#6680B3", "#66991A", "#FF99E6", "#FF1A66", "#E6331A",
            "#33FFCC", "#66994D", "#B366CC", "#4D8000", "#B33300", "#CC80CC",
            "#66664D", "#991AFF", "#E666FF", "#4DB3FF", "#1AB399", "#E666B3",
            "#33991A", "#CC9999", "#B3B31A", "#00E680", "#4D8066", "#809980",
            "#1AFF33", "#999933", "#FF3380", "#CCCC00", "#66E64D", "#4D80CC",
            "#9900B3", "#E64D66", "#4DB380", "#FF4D4D", "#99E6E6", "#6666FF"
          ];
          const colors = labels.map((_, index) => colorPalette[index % colorPalette.length]);

          setChartData({
            labels,
            datasets: [
              {
                label: "Intensity Distribution",
                data: values,
                backgroundColor: colors,
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
        text: "Resources Pie Chart",
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
      <h2>Pie Chart Example</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
