import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeContextType, Theme } from '../types';

// 创建主题上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * 主题提供者组件
 * 管理应用的主题状态并提供给子组件
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('dark');
  
  useEffect(() => {
    // 初始化主题
    try {
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
      
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
      
      if (initialTheme !== storedTheme) {
        localStorage.setItem('theme', initialTheme);
      }
    } catch (e) {
      console.error('主题初始化失败:', e);
      document.documentElement.setAttribute('data-theme', 'light');
      setTheme('light');
    }
    
    // 设置主题准备就绪标识
    setTimeout(() => {
      document.documentElement.classList.add('theme-ready');
    }, 100);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 自定义钩子，方便组件使用主题
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
