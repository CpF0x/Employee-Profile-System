import React from 'react';
import { useTheme } from './ThemeContext';
import styles from './ThemeToggle.module.css';

/**
 * 主题切换按钮组件
 * 提供一个按钮用于切换深色/浅色主题
 */
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className={styles.themeToggle}
      aria-label="切换主题"
      type="button"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
