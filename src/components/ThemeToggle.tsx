import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  onThemeChange?: (theme: string) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onThemeChange }) => {
  const { theme, toggleTheme } = useTheme();
  const [icon, setIcon] = useState<string>('🌙');

  useEffect(() => {
    // 根据当前主题更新按钮图标
    const themeIcon = getComputedStyle(document.documentElement)
      .getPropertyValue('--theme-icon')
      .trim()
      .replace(/"/g, '');
    
    setIcon(themeIcon);
  }, [theme]);

  const handleToggle = () => {
    toggleTheme();
    
    // 通知上层组件主题变更
    if (onThemeChange) {
      // 获取切换后的主题
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      onThemeChange(newTheme);
    }
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={handleToggle} 
      aria-label={`切换到${theme === 'dark' ? '明亮' : '暗黑'}模式`}
    >
      {icon}
    </button>
  );
};

export default ThemeToggle; 