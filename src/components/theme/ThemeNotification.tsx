import React, { useEffect, useState } from 'react';
import '../../styles/ThemeNotification.css';

interface ThemeNotificationProps {
  message: string;
  duration?: number;
  visible: boolean;
}

/**
 * 主题切换通知组件
 * 显示主题切换时的通知消息
 */
const ThemeNotification: React.FC<ThemeNotificationProps> = ({
  message,
  duration = 3000,
  visible
}) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);

    if (visible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  if (!visible && !isVisible) return null;

  return (
    <div className={`theme-notification ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="theme-notification-icon">
        {message.includes('深色') ? '🌙' : '☀️'}
      </div>
      <div className="theme-notification-message">
        {message}
      </div>
    </div>
  );
};

export default ThemeNotification;
