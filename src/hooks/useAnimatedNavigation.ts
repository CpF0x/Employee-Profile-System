import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';

// 动画状态跟踪
let isAnimating = false;

/**
 * 清理页面过渡动画状态
 * @param complete 是否完全清理（如果是true，则将动画元素移出屏幕；如果是false，仅移除活动状态）
 */
export const cleanupAnimation = (complete = false) => {
  console.log('[动画] 清理动画状态', complete ? '完全清理' : '简单清理');
  // 移除动画状态类
  document.body.classList.remove('page-animating');
  const pageTransition = document.getElementById('pageTransition');
  
  if (pageTransition) {
    if (complete) {
      // 完全清理 - 将动画移至屏幕外
      pageTransition.classList.remove('active');
      pageTransition.classList.add('done');
      
      // 重置状态
      setTimeout(() => {
        pageTransition.classList.remove('done');
        isAnimating = false; // 重置动画状态
        console.log('[动画] 动画状态完全重置');
      }, 200); // 从300ms缩短为200ms
    } else {
      // 简单清理 - 仅移除active类
      pageTransition.classList.remove('active');
      isAnimating = false; // 重置动画状态
      console.log('[动画] 简单清理完成，动画状态重置');
    }
  } else {
    console.log('[动画] 警告：未找到页面过渡元素');
    isAnimating = false; // 确保重置动画状态
  }
};

/**
 * 带动画效果的导航钩子
 * 
 * 在页面跳转前应用过渡动画，然后执行实际导航
 */
export const useAnimatedNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lastPathRef = useRef(location.pathname);
  const navigationTriggeredRef = useRef(false);
  
  // 监听路由变化，清理动画状态
  useEffect(() => {
    // 避免初始加载时触发
    if (lastPathRef.current !== location.pathname) {
      console.log('[路由变化] 从', lastPathRef.current, '到', location.pathname);
      // 更新上次路径
      lastPathRef.current = location.pathname;
      
      // 路由已经变化，确保动画状态被清理
      // 但只有在实际发生了导航后才执行清理
      if (navigationTriggeredRef.current) {
        console.log('[路由变化] 检测到由animatedNavigate触发的导航');
        navigationTriggeredRef.current = false;
        
        // 路由变化后等待DOM更新再清理动画
        const timer = setTimeout(() => {
          cleanupAnimation(true);
        }, 100);
        
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname]);
  
  /**
   * 执行带动画的导航
   * @param to 目标路径
   * @param options 导航选项，与react-router的navigate选项相同
   */
  const animatedNavigate = useCallback((to: string, options?: any) => {
    console.log('[动画导航] 开始导航到', to);
    
    // 如果已经在动画中或目标是当前页面，直接导航而不触发动画
    if (isAnimating || to === location.pathname) {
      console.log('[动画导航] 跳过动画，直接导航');
      navigate(to, options);
      return;
    }
    
    // 设置动画状态标志
    isAnimating = true;
    
    // 获取页面过渡元素
    const pageTransition = document.getElementById('pageTransition');
    
    // 添加动画状态类
    document.body.classList.add('page-animating');
    if (pageTransition) {
      pageTransition.classList.remove('done'); // 确保没有残留的done类
      pageTransition.classList.add('active');
      console.log('[动画导航] 激活过渡动画');
    } else {
      console.log('[动画导航] 警告：未找到页面过渡元素');
    }
    
    // 动画完成后执行实际导航
    setTimeout(() => {
      console.log('[动画导航] 动画延迟完成，执行导航');
      
      // 确保导航触发标记在导航之前设置
      navigationTriggeredRef.current = true;
      
      // 禁用可能的动画跳过逻辑，确保完整的导航
      navigate(to, {
        ...options,
        replace: options?.replace || false,
        state: {
          ...(options?.state || {}),
          skipAnimation: false
        }
      });

      // 允许页面有时间完成路由导航
      setTimeout(() => {
        // 如果导航似乎没有触发路由变化，强制清理
        if (navigationTriggeredRef.current) {
          console.log('[动画导航] 导航可能未能触发路由变化，手动清理');
          navigationTriggeredRef.current = false;
          setTimeout(() => cleanupAnimation(true), 100);
        }
      }, 350); // 从500ms缩短为350ms
    }, 250); // 从350ms缩短为250ms
  }, [navigate, location.pathname]);

  /**
   * 处理链接点击事件，应用动画
   * @param e 点击事件
   * @param to 目标路径
   */
  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    animatedNavigate(to);
  }, [animatedNavigate]);

  return { animatedNavigate, handleLinkClick, cleanupAnimation };
}; 