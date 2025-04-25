import React, { useState } from 'react';
import FormInput from '../form/FormInput';
import RememberForgot from '../form/RememberForgot';
import SocialLogin from './SocialLogin';
import styles from './LoginForm.module.css';

/**
 * 登录表单组件
 * 提供完整的登录表单功能
 * 
 * @param {Object} props - 组件属性
 * @param {function} props.onLogin - 登录提交时的回调函数
 * @param {function} props.onRegister - 注册点击时的回调函数
 * @param {function} props.onForgotPassword - 忘记密码点击时的回调函数
 * @param {function} props.onGoogleLogin - Google登录点击时的回调函数
 * @param {function} props.onGithubLogin - GitHub登录点击时的回调函数
 */
const LoginForm = ({
  onLogin,
  onRegister,
  onForgotPassword,
  onGoogleLogin,
  onGithubLogin
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(formData);
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (onRegister) {
      onRegister();
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.loginLogo}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </div>

      <div className={styles.loginHeader}>
        <h1>欢迎回来</h1>
        <p>请输入您的账户信息</p>
      </div>

      <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
        <FormInput
          id="email"
          label="邮箱地址"
          type="email"
          placeholder="your@example.com"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <FormInput
          id="password"
          label="密码"
          type="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <RememberForgot
          rememberChecked={formData.remember}
          onRememberChange={handleInputChange}
          onForgotClick={onForgotPassword}
        />

        <button type="submit" className={styles.loginButton}>
          登录
        </button>
      </form>

      <SocialLogin
        onGoogleLogin={onGoogleLogin}
        onGithubLogin={onGithubLogin}
      />

      <p className={styles.registerLink}>
        还没有账户? <a href="#register" onClick={handleRegisterClick}>注册</a>
      </p>
    </div>
  );
};

export default LoginForm;
