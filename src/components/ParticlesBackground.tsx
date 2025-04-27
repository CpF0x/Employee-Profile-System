import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// 粒子系统配置接口
interface ParticlesConfig {
  particles: {
    number: {
      value: number;
      density: {
        enable: boolean;
        value_area: number;
      };
    };
    color: {
      value: string;
    };
    shape: {
      type: string;
    };
    opacity: {
      value: number;
      random: boolean;
    };
    size: {
      value: number;
      random: boolean;
    };
    line_linked: {
      enable: boolean;
      distance: number;
      color: string;
      opacity: number;
      width: number;
    };
    move: {
      enable: boolean;
      speed: number;
      direction: string;
      random: boolean;
      straight: boolean;
      out_mode: string;
      bounce: boolean;
    };
  };
  interactivity: {
    detect_on: string;
    events: {
      onhover: {
        enable: boolean;
        mode: string;
      };
      onclick: {
        enable: boolean;
        mode: string;
      };
      resize: boolean;
    };
    modes: {
      grab: {
        distance: number;
        line_linked: {
          opacity: number;
        };
      };
      push: {
        particles_nb: number;
      };
    };
  };
  retina_detect: boolean;
}

const ParticlesBackground: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 确保particles.js可用
    if (window.particlesJS) {
      const particleColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--particles-color')
        .trim();

      const particleLineColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--particles-line-color')
        .trim();

      const config: ParticlesConfig = {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: particleColor
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: 0.5,
            random: false
          },
          size: {
            value: 3,
            random: true
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: particleLineColor,
            opacity: 0.3,
            width: 1
          },
          move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      };

      // 初始化粒子
      window.particlesJS('particles-js', config);
    }

    // 清理函数
    return () => {
      if (window.pJSDom && window.pJSDom.length) {
        // 尝试清除现有的粒子实例
        window.pJSDom = [];
      }
    };
  }, []);

  // 当主题变化时更新粒子颜色
  useEffect(() => {
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
      const pJS = window.pJSDom[0].pJS;
      
      const particleColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--particles-color')
        .trim();

      const particleLineColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--particles-line-color')
        .trim();

      // 更新粒子颜色
      pJS.particles.color.value = particleColor;
      pJS.particles.line_linked.color = particleLineColor;

      // 刷新粒子
      pJS.fn.particlesRefresh();
    }
  }, [theme]);

  return <div id="particles-js" ref={containerRef} />;
};

// 声明全局变量以避免TypeScript错误
declare global {
  interface Window {
    particlesJS: (id: string, config: ParticlesConfig) => void;
    pJSDom: any[];
  }
}

export default ParticlesBackground; 