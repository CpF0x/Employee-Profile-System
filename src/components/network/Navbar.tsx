import React, { useState } from 'react';
import SearchBar from '../common/SearchBar';

interface NavItemProps {
  icon: string;
  label: string;
  notificationCount?: number;
  active?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

interface NavbarProps {
  onLogout?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  notificationCount, 
  active, 
  onClick,
  href = '#',
  className = ''
}) => {
  return (
    <li className={`nav-item ${active ? 'active' : ''}`}>
      <a 
        href={href} 
        className={`nav-link ${className}`}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <span className="icon">{icon}</span>
        {notificationCount !== undefined && notificationCount > 0 && (
          <span className="notification-badge">{notificationCount > 9 ? '9+' : notificationCount}</span>
        )}
        <span>{label}</span>
      </a>
    </li>
  );
};

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <a href="#" className="logo">ProNet</a>
          <SearchBar onSearch={handleSearch} placeholder="Search" />
          <nav>
            <ul className="nav-links">
              <NavItem icon="🏠" label="Home" active />
              <NavItem icon="👥" label="Network" />
              <NavItem icon="💼" label="Jobs" />
              <NavItem 
                icon="📋" 
                label="Experience" 
                href="professional-timeline.html"
                className="timeline-link"
              />
              <NavItem icon="✉️" label="Messages" />
              <NavItem icon="🔔" label="Notifications" notificationCount={3} />
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