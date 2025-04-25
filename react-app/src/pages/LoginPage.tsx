import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import ThemeToggle from '../components/theme/ThemeToggle';
import ParticlesBackground from '../components/particles/ParticlesBackground';
import LoginCard from '../components/login/LoginCard';
import LoginForm from '../components/login/LoginForm';
import { LoginFormData } from '../types';

/**
 * 登录页面组件
 * 整合所有登录相关组件
 */
const LoginPage: React.FC = () => {
  // 处理登录提交
  const handleLogin = (formData: LoginFormData): void => {
    console.log('登录:', formData);
    // 这里可以添加实际的登录逻辑
  };

  // 处理注册点击
  const handleRegister = (): void => {
    console.log('注册');
    // 这里可以添加实际的注册逻辑
  };

  // 处理忘记密码点击
  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    console.log('忘记密码');
    // 这里可以添加实际的忘记密码逻辑
  };

  // 处理Google登录点击
  const handleGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log('Google登录');
    // 这里可以添加实际的Google登录逻辑
  };

  // 处理GitHub登录点击
  const handleGithubLogin = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log('GitHub登录');
    // 这里可以添加实际的GitHub登录逻辑
  };

  return (
    <ThemeProvider>
      <div className="text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg w-full min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ease-in-out transform-gpu backface-hidden perspective-1000 will-change-[background-color,color]">
        <ParticlesBackground />
        <ThemeToggle />
        <LoginCard>
          <LoginForm
            onLogin={handleLogin}
            onRegister={handleRegister}
            onForgotPassword={handleForgotPassword}
            onGoogleLogin={handleGoogleLogin}
            onGithubLogin={handleGithubLogin}
          />
        </LoginCard>
      </div>
    </ThemeProvider>
  );
};

export default LoginPage;
