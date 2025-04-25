import React from 'react';
import styles from './RememberForgot.module.css';

/**
 * 记住我和忘记密码组件
 * 提供记住我复选框和忘记密码链接
 * 
 * @param {Object} props - 组件属性
 * @param {boolean} props.rememberChecked - 记住我是否选中
 * @param {function} props.onRememberChange - 记住我状态变化时的回调函数
 * @param {function} props.onForgotClick - 忘记密码点击时的回调函数
 */
const RememberForgot = ({
  rememberChecked = false,
  onRememberChange,
  onForgotClick
}) => {
  const handleForgotClick = (e) => {
    e.preventDefault();
    if (onForgotClick) {
      onForgotClick(e);
    }
  };

  return (
    <div className={styles.formOptions}>
      <div className={styles.rememberMe}>
        <input
          type="checkbox"
          id="remember"
          name="remember"
          checked={rememberChecked}
          onChange={onRememberChange}
        />
        <label htmlFor="remember">记住我</label>
      </div>
      <a
        href="#forgot"
        onClick={handleForgotClick}
        className={styles.forgotPassword}
      >
        忘记密码?
      </a>
    </div>
  );
};

export default RememberForgot;
