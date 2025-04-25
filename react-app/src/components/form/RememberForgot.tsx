import React from 'react';
import { RememberForgotProps } from '../../types';

/**
 * 记住我和忘记密码组件
 * 提供记住我复选框和忘记密码链接
 */
const RememberForgot: React.FC<RememberForgotProps> = ({
  rememberChecked = false,
  onRememberChange,
  onForgotClick
}) => {
  const handleForgotClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    if (onForgotClick) {
      onForgotClick(e);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 mb-5">
      <div className="flex items-center gap-1.5">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          checked={rememberChecked}
          onChange={onRememberChange}
          className="accent-primary"
        />
        <label htmlFor="remember" className="text-light-text dark:text-dark-text text-sm transition-colors duration-300 ease-in-out">
          记住我
        </label>
      </div>
      <a
        href="#forgot"
        onClick={handleForgotClick}
        className="text-light-text dark:text-dark-text text-sm no-underline transition-colors duration-300 ease-in-out relative hover:text-primary dark:hover:text-primary after:content-[''] after:absolute after:w-0 after:h-px after:bottom-[-2px] after:left-0 after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
      >
        忘记密码?
      </a>
    </div>
  );
};

export default RememberForgot;
