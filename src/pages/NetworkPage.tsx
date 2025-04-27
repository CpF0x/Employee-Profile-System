import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Navbar from '../components/network/Navbar';
import ProfileCard from '../components/profile/ProfileCard';
import ContentColumn from '../components/network/ContentColumn';
import Sidebar from '../components/network/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import ParticlesBackground from '../components/ParticlesBackground';
import '../styles/Network.css';
import { useNavigate } from 'react-router-dom';
import { useAnimatedNavigation } from '../hooks/useAnimatedNavigation';

interface NetworkPageProps {
  onLogout?: () => void;
}

interface NotificationProps {
  message: string;
  duration?: number;
}

// 通知组件
const Notification: React.FC<NotificationProps> = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div 
      className="notification" 
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      {message}
    </div>
  );
};

/**
 * 主题切换按钮Portal组件 - 将其渲染到body级别
 */
const ThemeTogglePortal: React.FC<{onThemeChange: (theme: string) => void}> = ({ onThemeChange }) => {
  return createPortal(
    <ThemeToggle onThemeChange={onThemeChange} />,
    document.body
  );
};

/**
 * 专业网络平台页面
 * 整合所有网络相关组件
 */
const NetworkPage: React.FC<NetworkPageProps> = ({ onLogout }) => {
  const [notification, setNotification] = useState<string | null>(null);
  const navigate = useNavigate();
  const { animatedNavigate } = useAnimatedNavigation();

  // 处理登出
  const handleLogout = () => {
    // 跳转到登录页面
    animatedNavigate('/');
  };

  // 主题变更处理
  const handleThemeChange = (theme: string) => {
    setNotification(`已切换到${theme === 'dark' ? '深色' : '浅色'}主题`);
  };

  useEffect(() => {
    // 设置页面标题
    document.title = 'Professional Network Platform';
    
    // 加载外部粒子库脚本
    const loadParticlesScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.async = true;
      document.body.appendChild(script);
    };
    
    // 如果粒子库尚未加载，则加载
    if (!window.particlesJS) {
      loadParticlesScript();
    }
    
    return () => {
      // 清理粒子实例
      if (window.pJSDom && window.pJSDom.length) {
        window.pJSDom = [];
      }
    };
  }, []);

  return (
    <div className="network-page">
      <ParticlesBackground />
      <Navbar onLogout={handleLogout} />
      
      <div className="container">
        <div className="main-content">
          <div className="content-column">
            <ProfileCard />
            <ContentColumn />
          </div>
          <div className="sidebar">
            <Sidebar />
          </div>
        </div>
      </div>
      
      {/* 主题切换按钮 */}
      <ThemeTogglePortal onThemeChange={handleThemeChange} />
      
      {/* 通知消息 */}
      {notification && <Notification message={notification} />}
    </div>
  );
};

export default NetworkPage; 