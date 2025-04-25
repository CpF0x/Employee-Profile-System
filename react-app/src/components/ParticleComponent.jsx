import React, { useEffect, useRef } from 'react';
import '../assets/portal.css'; // 引入样式
// 注意：我们需要一种方式来加载和执行 particles.js 脚本

function ParticleComponent() {
  const particlesRef = useRef(null);

  useEffect(() => {
    // 存储原始的 particlesJS 和 cancelRequestAnimFrame，以防万一
    const originalParticlesJS = window.particlesJS;
    const originalCancelRequestAnimFrame = window.cancelRequestAnimFrame;
    let scriptTag = null;
    let particlesInstance = null; // 用于存储 particlesJS 实例以便销毁

    // 加载外部 particles.min.js 脚本
    const loadParticlesLibrary = new Promise((resolve, reject) => {
      const existingScript = document.getElementById('particles-lib');
      if (existingScript) {
        resolve();
        return;
      }
      scriptTag = document.createElement('script');
      scriptTag.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      scriptTag.id = 'particles-lib';
      scriptTag.async = true;
      scriptTag.onload = resolve;
      scriptTag.onerror = reject;
      document.body.appendChild(scriptTag);
    });

    loadParticlesLibrary.then(() => {
      // 库加载后，再加载我们自己的配置脚本
      // 注意：直接 fetch 和 eval 通常不推荐，但对于这种遗留脚本集成可能是一种方式
      // 更好的方式是重构 particles.js 使其成为 ES 模块或可调用的函数
      fetch('/src/assets/particles.js') // Vite 会处理 /src/assets 路径
        .then(response => response.text())
        .then(scriptText => {
          // 检查 window.particlesJS 是否存在
          if (window.particlesJS && particlesRef.current) {
            // 动态执行脚本内容。这会定义配置并调用 particlesJS()
            // 注意：这会修改全局 window 对象
            // eslint-disable-next-line no-eval
            eval(scriptText);

            // 尝试获取创建的实例，以便在组件卸载时销毁
            // particles.js 库本身似乎没有提供简单的方法来获取实例或销毁特定实例
            // 我们假设它修改了 window.pJSDom 数组
            if (window.pJSDom && window.pJSDom.length > 0) {
               // 假设最新的实例是最后一个
              particlesInstance = window.pJSDom[window.pJSDom.length - 1];
            }

          } else {
            console.error('particlesJS library not loaded or target element not found.');
          }
        })
        .catch(error => console.error('Error fetching or executing particles.js:', error));
    }).catch(error => {
        console.error('Error loading particles.min.js library:', error);
    });


    // 清理函数：在组件卸载时移除脚本和可能的效果
    return () => {
      // 尝试销毁 particlesJS 实例
      // 注意：标准的 particles.js 库没有明确的 destroy 方法
      // 如果我们假定它修改了 pJSDom，我们可以尝试移除相关的 DOM 和对象
      if (particlesInstance && particlesInstance.pJS && particlesInstance.pJS.fn && particlesInstance.pJS.fn.vendors && particlesInstance.pJS.fn.vendors.destroypJS) {
         // 尝试调用可能存在的销毁函数（不确定是否存在）
         // particlesInstance.pJS.fn.vendors.destroypJS();
         console.log('Attempted to destroy particlesJS instance (method might not exist).');
      } else if (window.pJSDom && window.pJSDom.length > 0) {
          // 另一种尝试：移除 pJSDom 中的最后一项（如果它对应这个实例）
          // 这比较危险，可能会影响其他实例（如果有的话）
          // window.pJSDom.pop();
          console.log('Manually removed entry from window.pJSDom (use with caution).');
      }

       // 停止 requestAnimationFrame 循环（如果 particles.js 正在使用）
       // particles.js 内部似乎使用 window.requestAnimationFrame，并可能存储 ID
       // 但它没有暴露取消方法。我们需要全局取消函数
       if (window.cancelRequestAnimFrame) {
          // 我们不知道具体的 frame ID，这是一个潜在问题
          // 尝试使用原始的全局 cancelAnimationFrame
          // window.cancelAnimationFrame(??); // 需要 ID
          // console.warn('Could not cancel animation frame for particles.js');
       }

      // 移除添加的脚本标签（如果需要）
      // if (scriptTag && scriptTag.parentNode) {
      //   scriptTag.parentNode.removeChild(scriptTag);
      // }
      // 注意：通常不移除库脚本，因为它可能被其他组件使用

      // 重置可能被修改的全局变量（如果需要）
      // window.particlesJS = originalParticlesJS;
      // window.cancelRequestAnimFrame = originalCancelRequestAnimFrame;
       console.log('ParticleComponent cleanup executed.');
    };
  }, []); // 空依赖数组确保 effect 只运行一次（挂载和卸载时）

  return (
    <div id="particles-js" ref={particlesRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      {/* 粒子效果将在此处渲染 */}
      {/* 可以选择性地添加粒子计数器 */}
       {/* <div className="count-particles" style={{ position: 'absolute', top: '10px', left: '10px', color: '#fff' }}>
           <span className="js-count-particles">--</span> particles
       </div> */}
    </div>
  );
}

export default ParticleComponent; 