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
 * 页面过渡动画组件
 */
const PageTransition: React.FC = () => {
  return createPortal(
    <div className="page-transition" id="pageTransition"></div>,
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

  // 处理登出
  const handleLogout = () => {
    // 跳转到登录页面
    navigate('/');
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

    // 添加页面过渡动画处理
    const handleTimelineLinks = () => {
      const timelineLinks = document.querySelectorAll('.timeline-link');
      const pageTransition = document.getElementById('pageTransition');

      timelineLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetUrl = (this as HTMLAnchorElement).getAttribute('href');

          // 添加动画状态类
          document.body.classList.add('page-animating');
          if (pageTransition) {
            pageTransition.classList.add('active');
          }

          // 动画完成后跳转到目标页面
          setTimeout(() => {
            if (targetUrl) {
              window.location.href = targetUrl;
            }
          }, 600);
        });
      });
    };

    // 当DOM加载完成后设置链接事件
    handleTimelineLinks();
    
    return () => {
      // 清理粒子实例
      if (window.pJSDom && window.pJSDom.length) {
        window.pJSDom = [];
      }
      
      // 移除页面过渡动画类
      document.body.classList.remove('page-animating');
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
      
      {/* 页面过渡动画元素 */}
      <PageTransition />
      
      {/* 主题切换按钮 */}
      <ThemeTogglePortal onThemeChange={handleThemeChange} />
      
      {/* 通知消息 */}
      {notification && <Notification message={notification} />}
    </div>
  );
};

export default NetworkPage; 