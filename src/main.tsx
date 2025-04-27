import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import NetworkPage from './pages/NetworkPage';
import TimelinePage from './pages/TimelinePage';
import ThemeDemo from './pages/ThemeDemo';
import { ThemeProvider } from './context/ThemeContext';
import PageTransition from './components/transition/PageTransition';
import { cleanupAnimation } from './hooks/useAnimatedNavigation';
import './styles/theme.css';
import './styles/Login.css';
import './styles/ThemeDemo.css';

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
  
  // 确保进入应用时没有残留的过渡动画状态
  document.body.classList.remove('page-animating');
  const pageTransition = document.getElementById('pageTransition');
  if (pageTransition) {
    pageTransition.classList.remove('active', 'done');
  }
  
  console.log('[应用初始化] 动画状态已重置');
});

// 路由变化监听组件，用于处理全局导航动画（仅作为后备机制）
const NavigationHandler = () => {
  const location = useLocation();
  
  // 当进入新页面时检查
  useEffect(() => {
    console.log('[NavigationHandler] 路由变化到', location.pathname);
    
    // 确保在路由变化后不久，页面动画状态被重置（作为后备安全机制）
    const safetyTimer = setTimeout(() => {
      // 如果页面仍处于动画状态，强制清理
      if (document.body.classList.contains('page-animating')) {
        console.log('[NavigationHandler] 安全机制：检测到页面仍处于动画状态，执行强制清理');
        cleanupAnimation(true);
      }
    }, 1500);
    
    return () => clearTimeout(safetyTimer);
  }, [location.pathname]);
  
  return null;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider>
    <BrowserRouter>
      {/* 添加全局页面过渡组件 */}
      <PageTransition />
      <NavigationHandler />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<App />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/theme-demo" element={<ThemeDemo />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
