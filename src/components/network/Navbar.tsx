import React, { useState } from 'react';
import SearchBar from '../common/SearchBar';
import { useAnimatedNavigation } from '../../hooks/useAnimatedNavigation';

interface NavbarProps {
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { animatedNavigate } = useAnimatedNavigation();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('搜索查询:', query);
    // 实现搜索逻辑
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const navigateTo = (path: string) => {
    animatedNavigate(path);
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <a href="#" className="logo">ProNet</a>
          <SearchBar onSearch={handleSearch} placeholder="Search" />
          <nav>
            <ul className="nav-links">
              <li className="nav-item">
                <a 
                  href="#" 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/home');
                  }}
                >
                  <span className="icon">🏠</span>
                  <span>Home</span>
                </a>
              </li>
              <li className="nav-item active">
                <a href="#" className="nav-link">
                  <span className="icon">👥</span>
                  <span>Network</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <span className="icon">💼</span>
                  <span>Jobs</span>
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="#" 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/timeline');
                  }}
                >
                  <span className="icon">📋</span>
                  <span>Experience</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <span className="icon">✉️</span>
                  <span>Messages</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <span className="icon">🔔</span>
                  {3 > 0 && (
                    <span className="notification-badge">{3 > 9 ? '9+' : 3}</span>
                  )}
                  <span>Notifications</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="profile-section">
            <div className="profile-pic"></div>
            <span>Me ▼</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;