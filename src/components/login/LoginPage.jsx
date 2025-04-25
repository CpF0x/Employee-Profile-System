import React from 'react';
import { ThemeProvider } from '../theme/ThemeContext';
import ThemeToggle from '../theme/ThemeToggle';
import ParticlesBackground from '../particles/ParticlesBackground';
import LoginCard from './LoginCard';
import LoginForm from './LoginForm';
import styles from './LoginPage.module.css';

/**
 * 登录页面组件
 * 整合所有登录相关组件
 */
const LoginPage = () => {
  // 处理登录提交
  const handleLogin = (formData) => {
    console.log('登录:', formData);
    // 这里可以添加实际的登录逻辑
  };

  // 处理注册点击
  const handleRegister = () => {
    console.log('注册');
    // 这里可以添加实际的注册逻辑
  };

  // 处理忘记密码点击
  const handleForgotPassword = () => {
    console.log('忘记密码');
    // 这里可以添加实际的忘记密码逻辑
  };

  // 处理Google登录点击
  const handleGoogleLogin = () => {
    console.log('Google登录');
    // 这里可以添加实际的Google登录逻辑
  };

  // 处理GitHub登录点击
  const handleGithubLogin = () => {
    console.log('GitHub登录');
    // 这里可以添加实际的GitHub登录逻辑
  };

  return (
    <ThemeProvider>
      <div className={styles.loginPageContainer}>
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
