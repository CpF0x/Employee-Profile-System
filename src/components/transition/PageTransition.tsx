import React from 'react';
import { createPortal } from 'react-dom';

/**
 * 全局页面过渡动画组件
 * 
 * 使用React Portal将过渡元素挂载到body，确保在所有页面上可用
 * 组件负责渲染过渡元素，动画状态由useAnimatedNavigation钩子管理
 */
const PageTransition: React.FC = () => {
  return createPortal(
    <div className="page-transition" id="pageTransition"></div>,
    document.body
  );
};

export default PageTransition; 