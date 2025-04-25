import React, { useEffect, useRef } from 'react';
import { useTheme } from '../theme/ThemeContext';
import styles from './ParticlesBackground.module.css';

/**
 * 粒子背景组件
 * 提供一个动态的粒子背景效果，颜色会根据当前主题自动调整
 */
const ParticlesBackground = () => {
  const particlesRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // 加载粒子库
    const loadParticlesLibrary = new Promise((resolve, reject) => {
      if (window.particlesJS) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });

    // 初始化粒子效果
    loadParticlesLibrary.then(() => {
      if (window.particlesJS && particlesRef.current) {
        initParticles();
      }
    }).catch(error => {
      console.error('加载粒子库失败:', error);
    });

    // 初始化粒子效果
    function initParticles() {
      window.particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": getComputedStyle(document.documentElement).getPropertyValue('--particles-color').trim()
          },
          "shape": {
            "type": "circle",
          },
          "opacity": {
            "value": 0.5,
            "random": false,
          },
          "size": {
            "value": 3,
            "random": true,
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": getComputedStyle(document.documentElement).getPropertyValue('--particles-line-color').trim(),
            "opacity": 0.3,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 3,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 0.5
              }
            },
            "push": {
              "particles_nb": 4
            }
          }
        },
        "retina_detect": true
      });
    }

    // 当主题变化时更新粒子颜色
    function updateParticlesColors() {
      if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        const pJS = window.pJSDom[0].pJS;
        
        pJS.particles.color.value = getComputedStyle(document.documentElement).getPropertyValue('--particles-color').trim();
        pJS.particles.line_linked.color = getComputedStyle(document.documentElement).getPropertyValue('--particles-line-color').trim();
        
        pJS.fn.particlesRefresh();
      }
    }

    // 监听主题变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          updateParticlesColors();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // 清理函数
    return () => {
      observer.disconnect();
      if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        // 尝试清理粒子效果
        try {
          window.pJSDom = [];
        } catch (e) {
          console.error('清理粒子效果失败:', e);
        }
      }
    };
  }, []);

  // 当主题变化时重新初始化粒子效果
  useEffect(() => {
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
      const pJS = window.pJSDom[0].pJS;
      
      pJS.particles.color.value = getComputedStyle(document.documentElement).getPropertyValue('--particles-color').trim();
      pJS.particles.line_linked.color = getComputedStyle(document.documentElement).getPropertyValue('--particles-line-color').trim();
      
      pJS.fn.particlesRefresh();
    }
  }, [isDarkMode]);

  return <div id="particles-js" ref={particlesRef} className={styles.particlesContainer}></div>;
};

export default ParticlesBackground;
