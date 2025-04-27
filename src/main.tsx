import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import { ThemeProvider } from './context/ThemeContext';
import './styles/theme.css';
import './styles/Login.css';

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 确保页面在主题应用后才显示
  document.documentElement.classList.add('theme-ready');

  // 禁用初始防闪烁样式
  setTimeout(() => {
    const antiFlashStyle = document.getElementById('anti-flash') as HTMLStyleElement;
    if (antiFlashStyle) {
      antiFlashStyle.disabled = true;
    }
  }, 100);
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
