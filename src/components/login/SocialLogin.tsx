import React from 'react';
import { SocialLoginProps } from '../../types';

/**
 * 社交登录组件
 * 提供社交媒体登录按钮
 */
const SocialLogin: React.FC<SocialLoginProps> = ({ onGoogleLogin, onGithubLogin }) => {
  const handleGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onGoogleLogin) {
      onGoogleLogin(e);
    }
  };

  const handleGithubLogin = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onGithubLogin) {
      onGithubLogin(e);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex items-center my-4">
        <div className="flex-1 border-b border-light-input-border dark:border-dark-input-border"></div>
        <span className="px-2.5 text-sm text-light-muted dark:text-dark-muted font-medium">或使用以下方式登录</span>
        <div className="flex-1 border-b border-light-input-border dark:border-dark-input-border"></div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          type="button"
          className="btn-social"
          onClick={handleGoogleLogin}
        >
          <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8 0 120.8 109.8 8.6 244 8.6c77.7 0 142.9 30.6 192.1 79.8l-69.9 69.9c-24.5-23.2-57.3-37.3-96.2-37.3-73.8 0-134.4 60.6-134.4 134.4s60.6 134.4 134.4 134.4c76.9 0 112.4-32.5 126.5-66.1H244v-87.5h234.1c4.7 25.7 7.9 53.4 7.9 83.2z"></path>
          </svg>
          谷歌
        </button>
        <button
          type="button"
          className="btn-social"
          onClick={handleGithubLogin}
        >
          <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
            <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.9 1.6 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.9-1.3z"></path>
          </svg>
          GitHub
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
