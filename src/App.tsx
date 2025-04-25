import React, { lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './styles/globals.css';

// 懒加载页面组件
const LoginPage = lazy(() => import('./pages/LoginPage'));

/**
 * 应用主组件
 */
const App: React.FC = () => {
  return (
    <>
      <nav className="bg-light-card dark:bg-dark-card p-4 shadow-md">
        <ul className="flex gap-4 justify-center list-none">
          <li>
            <Link to="/" className="text-light-text dark:text-dark-text no-underline font-medium py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-light-social-hover dark:hover:bg-dark-social-hover">
              首页
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-light-text dark:text-dark-text no-underline font-medium py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-light-social-hover dark:hover:bg-dark-social-hover">
              登录页面
            </Link>
          </li>
        </ul>
      </nav>

      <hr className="border-light-input-border dark:border-dark-input-border" />

      <Suspense fallback={<div className="flex justify-center items-center h-screen">加载中...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

/**
 * 首页组件
 */
const HomePage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto my-8 p-8 bg-light-card dark:bg-dark-card rounded-2xl shadow-card backdrop-blur-xl">
      <h2 className="text-xl mb-4 text-light-text dark:text-dark-text">首页</h2>
      <p className="mb-4 text-light-muted dark:text-dark-muted leading-relaxed">欢迎使用我们的应用。请使用上方的链接导航。</p>
      <p className="text-light-muted dark:text-dark-muted leading-relaxed">点击"登录页面"查看组件化的登录界面。</p>
    </div>
  );
};

export default App;
