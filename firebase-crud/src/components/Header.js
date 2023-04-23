import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const location = useLocation();
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?name=${search}`);
    setSearch('');
  };

  React.useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('Home');
    } else if (location.pathname === '/about') {
      setActiveTab('About');
    } else if (location.pathname === '/add') {
      setActiveTab('AddEdit');
    }
  }, [location]);

  return (
    <div className="header">
      <p className="logo">My Contacts</p>
      <div className="header-right">
        <form onSubmit={handleSearch} style={{ display: 'inline', padding: '50px' }}>
          <input
            placeholder="Search Contact"
            type="text"
            className="inputField"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
        <Link to="/">
          <p className={`${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>
            Home
          </p>
        </Link>
        <Link to="/add">
          <p className={`${activeTab === 'AddEdit' ? 'active' : ''}`} onClick={() => setActiveTab('AddEdit')}>
            Add Contact
          </p>
        </Link>
        <Link to="/about">
          <p className={`${activeTab === 'About' ? 'active' : ''}`} onClick={() => setActiveTab('About')}>
            About
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
