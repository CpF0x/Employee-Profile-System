import React from 'react';
import { LoginCardProps } from '../../types';

/**
 * 登录卡片容器组件
 * 提供一个玻璃态效果的卡片容器
 */
const LoginCard: React.FC<LoginCardProps> = ({ children }) => {
  return (
    <div className="relative z-10 w-full max-w-md p-5 sm:p-10">
      <div className="login-card">
        {children}
      </div>
    </div>
  );
};

export default LoginCard;
