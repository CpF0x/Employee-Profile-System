import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 立即应用主题，防止闪烁
(function() {
  try {
    // 获取主题偏好
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme || (prefersDark ? 'dark' : 'light');

    // 立即应用主题到HTML元素
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  } catch (e) {
    console.error('主题初始化失败:', e);
  }
})();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 