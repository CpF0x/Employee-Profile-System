import { useState, useCallback } from 'react';

/**
 * 主题通知钩子
 * 管理主题切换通知的状态
 */
export const useThemeNotification = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  /**
   * 显示主题切换通知
   * @param message 通知消息
   * @param duration 显示时长（毫秒）
   */
  const showThemeNotification = useCallback((message: string, duration = 3000) => {
    setNotification(message);
    setIsVisible(true);
    
    // 设置定时器，在指定时间后隐藏通知
    setTimeout(() => {
      setIsVisible(false);
      
      // 通知完全消失后清空消息
      setTimeout(() => {
        setNotification(null);
      }, 300); // 等待过渡动画完成
    }, duration);
  }, []);

  return {
    notification,
    isVisible,
    showThemeNotification
  };
};

export default useThemeNotification;
