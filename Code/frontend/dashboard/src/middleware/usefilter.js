import { useState } from 'react';

const useFilters = (initialFilters) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return { filters, handleFilterChange, resetFilters };
};

export default useFilters;
