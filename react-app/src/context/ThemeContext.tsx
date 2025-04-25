import React, { createContext, useState, useEffect, useContext } from 'react';
import { ThemeContextType, Theme } from '../types';

// 创建主题上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * 主题提供者组件
 * 管理应用的主题状态并提供给子组件
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // 初始化主题状态
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // 尝试从localStorage获取主题
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return storedTheme ? storedTheme === 'dark' : prefersDark;
  });

  // 当主题状态改变时更新文档和localStorage
  useEffect(() => {
    const newTheme: Theme = isDarkMode ? 'dark' : 'light';
    
    // 先更新全局变量，再更新DOM
    window.__CURRENT_THEME__ = newTheme;
    
    // 使用requestAnimationFrame确保在下一次渲染周期更新DOM
    requestAnimationFrame(() => {
      // 更新HTML类名以支持Tailwind暗色模式
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      
      localStorage.setItem('theme', newTheme);
    });
  }, [isDarkMode]);

  // 切换主题的函数
  const toggleTheme = (): void => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // 提供主题状态和切换函数给子组件
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
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
