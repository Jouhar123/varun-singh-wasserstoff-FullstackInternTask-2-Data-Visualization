
import axios from 'axios';

// Function to build query string from filters
const buildQueryString = (filters) => {
  return Object.keys(filters)
    .filter(key => filters[key]) // Ensure filters have values
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
    .join('&');
};

// Base API URL
const API_URL = 'http://localhost:5000/api/filtered/Dashboard';

// Fetch data with filters applied
export const fetchData = async (filters) => {
  try {
    const queryString = buildQueryString(filters);
    const url = `${API_URL}?${queryString}`;
    const response = await axios.get(url);
    console.log('API Response Data:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
