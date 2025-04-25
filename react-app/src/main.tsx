import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initializeTheme } from './utils/theme';

// 在React渲染前初始化主题
initializeTheme();

// 获取根元素
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('找不到根元素');
}

// 使用requestAnimationFrame确保在下一次渲染周期渲染React应用
requestAnimationFrame(() => {
  createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

  // 渲染完成后确保页面可见
  setTimeout(() => {
    document.documentElement.classList.add('theme-ready');
  }, 50);
});
