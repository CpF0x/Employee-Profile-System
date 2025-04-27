import React from 'react';
import ThemeToggle from '../components/theme/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import '../styles/ThemeNotification.css';

/**
 * 主题切换演示页面
 * 用于展示主题切换通知效果
 */
const ThemeDemo: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="theme-demo-container">
      <div className="theme-demo-content">
        <h1>主题切换通知演示</h1>
        <p>当前主题: {isDarkMode ? '深色模式' : '浅色模式'}</p>
        <p>点击右上角的主题切换按钮来切换主题并查看通知效果</p>
        
        <div className="theme-demo-card">
          <h2>主题切换通知</h2>
          <p>
            主题切换通知会在用户切换主题时显示，提示用户当前已切换到哪种主题模式。
            通知会在显示几秒后自动消失。
          </p>
        </div>
        
        <div className="theme-demo-example">
          <div className="theme-notification visible example">
            <div className="theme-notification-icon">
              {isDarkMode ? '🌙' : '☀️'}
            </div>
            <div className="theme-notification-message">
              已切换到{isDarkMode ? '深色' : '浅色'}主题
            </div>
          </div>
        </div>
      </div>
      
      <ThemeToggle />
    </div>
  );
};

export default ThemeDemo;
