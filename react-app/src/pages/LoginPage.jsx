import React, { useState, useEffect, useRef } from 'react';
import styles from './LoginPage.module.css'; // 导入 CSS Module
// 可能需要导入 portal.css 如果 CSS Module 没有包含它的内容或依赖它
// import '../assets/portal.css';

/**
 * 登录页面组件
 * 专注于处理主题切换和登录表单，确保事件被正确处理，防止页面刷新引起的闪烁
 */
function LoginPage() {
  // 使用ref避免重复应用主题
  const firstRender = useRef(true);

  // 直接从HTML属性读取当前主题
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.getAttribute('data-theme') === 'dark'
  );

  // 优化的主题切换函数，只在组件挂载后处理用户手动切换的情况
  useEffect(() => {
    // 跳过第一次渲染
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // 获取当前主题，如果与state不同才应用
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = isDarkMode ? 'dark' : 'light';

    if (currentTheme !== newTheme) {
      // 先更新全局变量，再更新DOM，防止闪烁
      window.__CURRENT_THEME__ = newTheme;

      // 使用requestAnimationFrame确保在下一次渲染周期更新DOM
      requestAnimationFrame(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }
  }, [isDarkMode]);

  /**
   * 处理主题切换
   * @param {Event} e - 点击事件
   */
  const handleThemeToggle = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // 切换主题前防止闪烁
    const newIsDarkMode = !isDarkMode;
    const newTheme = newIsDarkMode ? 'dark' : 'light';

    // 先更新全局变量，再更新状态
    window.__CURRENT_THEME__ = newTheme;
    setIsDarkMode(newIsDarkMode);
  };

  /**
   * 统一处理所有表单相关事件
   * @param {string} action - 操作类型标识
   * @param {Event} e - 事件对象
   */
  const handleAction = (action, e) => {
    // 必须阻止默认行为
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // 在执行操作前确保主题不会变化
    const currentTheme = document.documentElement.getAttribute('data-theme');

    console.log(`执行操作: ${action}`);
    // 这里可以添加实际的登录、注册等操作逻辑

    // 操作完成后确保主题保持不变
    if (currentTheme && currentTheme !== document.documentElement.getAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  };

  // 简化的组件结构，保留关键功能
  return (
    <div className={styles.loginPageContainer}>
      {/* 主题切换按钮 */}
      <button
        onClick={handleThemeToggle}
        className={styles.themeToggle}
        aria-label="切换主题"
        type="button"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div className={styles['login-container']}>
        <div className={styles['login-card']}>
          {/* 登录表单 */}
          <div className={styles['login-logo']}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>

          <div className={styles['login-header']}>
            <h1>欢迎回来</h1>
            <p>请输入您的账户信息</p>
          </div>

          {/* 表单元素 - 使用noValidate禁用浏览器默认验证 */}
          <form
            className={styles['login-form']}
            onSubmit={(e) => handleAction('登录', e)}
            noValidate
          >
            <div className={styles['form-group']}>
              <label htmlFor="email">邮箱地址</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="password">密码</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <div className={styles['form-options']}>
              <div className={styles['remember-me']}>
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">记住我</label>
              </div>
              <a
                href="#forgot"
                onClick={(e) => handleAction('忘记密码', e)}
                className={styles['forgot-password']}
              >
                忘记密码?
              </a>
            </div>

            <button
              type="submit"
              className={styles['login-button']}
            >
              登录
            </button>
          </form>

          <div className={styles['divider']}>
            <span className={styles['divider-text']}>或使用以下方式登录</span>
          </div>

          <div className={styles['social-login']}>
            <button
              type="button"
              className={`${styles['social-button']} ${styles['google']}`}
              onClick={(e) => handleAction('谷歌登录', e)}
            >
              {/* Google SVG Icon */}
              <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8 0 120.8 109.8 8.6 244 8.6c77.7 0 142.9 30.6 192.1 79.8l-69.9 69.9c-24.5-23.2-57.3-37.3-96.2-37.3-73.8 0-134.4 60.6-134.4 134.4s60.6 134.4 134.4 134.4c76.9 0 112.4-32.5 126.5-66.1H244v-87.5h234.1c4.7 25.7 7.9 53.4 7.9 83.2z"></path></svg>
              谷歌
            </button>
            <button
              type="button"
              className={`${styles['social-button']} ${styles['github']}`}
              onClick={(e) => handleAction('GitHub登录', e)}
            >
              {/* GitHub SVG Icon */}
              <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.9 1.6 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.9-1.3z"></path></svg>
              GitHub
            </button>
          </div>

          <p className={styles['register-link']}>
            还没有账户? <a href="#register" onClick={(e) => handleAction('注册', e)}>注册</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;