import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * 主题切换按钮组件
 * 提供一个按钮用于切换深色/浅色主题
 */
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className="theme-toggle"
      aria-label={`切换到${isDarkMode ? '浅色' : '深色'}模式`}
      type="button"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
