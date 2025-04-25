import React from 'react';
import styles from './LoginCard.module.css';

/**
 * 登录卡片容器组件
 * 提供一个玻璃态效果的卡片容器
 * 
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 */
const LoginCard = ({ children }) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {children}
      </div>
    </div>
  );
};

export default LoginCard;
