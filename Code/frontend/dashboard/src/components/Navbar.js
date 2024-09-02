import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/BarChart">BarChart</Link></li>
        <li><Link to="/LineChart">LineChart</Link></li>
        <li><Link to="/PieChart">PieChart</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
