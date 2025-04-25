import React, { useState } from 'react';
import FormInput from '../form/FormInput';
import RememberForgot from '../form/RememberForgot';
import SocialLogin from './SocialLogin';
import { LoginFormProps, LoginFormData } from '../../types';

/**
 * 登录表单组件
 * 提供完整的登录表单功能
 */
const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onRegister,
  onForgotPassword,
  onGoogleLogin,
  onGithubLogin
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    remember: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (onLogin) {
      onLogin(formData);
    }
  };

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    if (onRegister) {
      onRegister();
    }
  };

  return (
    <div className="w-full max-w-md p-9 text-center">
      <div className="w-15 h-15 bg-gradient-to-r from-primary to-secondary-light rounded-full flex items-center justify-center mx-auto mb-5 transition-transform duration-500 ease-in-out hover:rotate-[360deg]">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </div>

      <div className="mb-7">
        <h1 className="text-2xl mb-2.5 bg-gradient-to-r from-primary to-secondary-light bg-clip-text text-transparent">欢迎回来</h1>
        <p className="text-light-muted dark:text-dark-muted">请输入您的账户信息</p>
      </div>

      <form className="text-left" onSubmit={handleSubmit} noValidate>
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

        <button type="submit" className="btn-login">
          登录
        </button>
      </form>

      <SocialLogin
        onGoogleLogin={onGoogleLogin}
        onGithubLogin={onGithubLogin}
      />

      <p className="text-light-muted dark:text-dark-muted text-sm mt-5">
        还没有账户? <a href="#register" onClick={handleRegisterClick} className="text-primary font-semibold no-underline transition-all duration-300 ease-in-out relative hover:after:w-full after:content-[''] after:absolute after:w-0 after:h-px after:bottom-[-2px] after:left-0 after:bg-primary after:transition-all after:duration-300 after:ease-in-out">注册</a>
      </p>
    </div>
  );
};

export default LoginForm;
