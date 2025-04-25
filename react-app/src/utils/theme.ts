import { Theme } from '../types';

/**
 * 初始化主题
 * 在应用启动时调用，确保主题正确设置
 */
export const initializeTheme = (): void => {
  try {
    // 获取主题偏好
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme: Theme = storedTheme || (prefersDark ? 'dark' : 'light');
    
    // 应用主题到HTML元素
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    
    // 将主题存储到localStorage和全局变量
    localStorage.setItem('theme', theme);
    window.__THEME_INITIALIZED__ = true;
    window.__CURRENT_THEME__ = theme;
    
    console.log('主题初始化成功');
  } catch (e) {
    console.error('主题初始化失败:', e);
    // 确保页面至少可见
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    window.__THEME_INITIALIZED__ = true;
    window.__CURRENT_THEME__ = 'light';
  }
};

/**
 * 切换主题
 * @param isDark 是否切换到深色主题
 */
export const toggleTheme = (isDark: boolean): void => {
  const newTheme: Theme = isDark ? 'dark' : 'light';
  
  // 更新全局变量
  window.__CURRENT_THEME__ = newTheme;
  
  // 使用requestAnimationFrame确保在下一次渲染周期更新DOM
  requestAnimationFrame(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newTheme);
  });
};

/**
 * 获取当前主题
 * @returns 当前主题
 */
export const getCurrentTheme = (): Theme => {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};
