import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * 主题切换按钮组件
 * 提供一个按钮用于切换深色/浅色主题
 */
const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-5 right-5 z-50 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary-light border-none flex items-center justify-center cursor-pointer text-lg shadow-md transition-transform duration-300 ease-in-out hover:rotate-45 hover:shadow-lg"
      aria-label="切换主题"
      type="button"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
