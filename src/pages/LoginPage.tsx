import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import '../styles/Login.css';

interface LoginPageProps {
  onLogin?: () => void;
}

/**
 * 主题切换按钮Portal组件
 */
const ThemeTogglePortal: React.FC = () => {
  return createPortal(
    <button 
      className="theme-toggle" 
      onClick={() => {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        if (newTheme === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        
        localStorage.setItem('theme', newTheme);
        
        // 更新粒子颜色
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
          const isDark = newTheme === 'dark';
          const pJS = window.pJSDom[0].pJS;
          
          // 更新粒子颜色
          pJS.particles.color.value = isDark ? "#dbeafe" : "#7dd3fc";
          pJS.particles.line_linked.color = isDark ? "#93c5fd" : "#3b82f6";
          
          // 更新粒子透明度
          pJS.particles.opacity.value = isDark ? 0.3 : 0.2;
          
          // 刷新粒子
          pJS.fn.particlesRefresh();
        }
      }}
      aria-label="切换主题"
    >
      {localStorage.getItem('theme') === 'dark' ? '☀️' : '🌙'}
    </button>,
    document.body
  );
};

/**
 * 登录页面组件
 */
const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('登录尝试');
    navigate('/home');
  };

  useEffect(() => {
    // 设置页面标题
    document.title = 'Professional Network Login';
    
    // 初始化粒子背景
    const initParticles = () => {
      if (window.particlesJS) {
        const isDarkMode = localStorage.getItem('theme') !== 'light';
        
        window.particlesJS("particles-js", {
          "particles": {
            "number": {
              "value": 50,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": isDarkMode ? "#dbeafe" : "#7dd3fc"
            },
            "shape": {
              "type": "circle"
            },
            "opacity": {
              "value": isDarkMode ? 0.3 : 0.4,
              "random": true
            },
            "size": {
              "value": 3,
              "random": true
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": isDarkMode ? "#93c5fd" : "#3b82f6",
              "opacity": isDarkMode ? 0.2 : 0.3,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 2,
              "direction": "none",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "bounce": false
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
                  "opacity": 0.4
                }
              },
              "push": {
                "particles_nb": 3
              }
            }
          },
          "retina_detect": true
        });
      }
    };
    
    // 确保粒子库加载
    if (!window.particlesJS) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.async = true;
      script.onload = initParticles;
      document.body.appendChild(script);
    } else {
      initParticles();
    }
    
    return () => {
      // 清理粒子实例
      if (window.pJSDom && window.pJSDom.length) {
        window.pJSDom = [];
      }
    };
  }, []);

  return (
    <>
      <div className="login-page">
        <div id="particles-js"></div>
        <div className="login-container">
          <div className="login-card">
            <div className="login-logo">S</div>
            <div className="login-header">
              <h1>Welcome Back</h1>
              <p>Sign in to your account to continue</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Email Address</label>
                <input 
                  type="email" 
                  id="username" 
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="remember-forgot">
                <div className="remember-me">
                  <input 
                    type="checkbox" 
                    id="remember" 
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              <button type="submit" className="login-button">Sign In</button>
              <div className="register-link">
                Don't have an account yet? <a href="#">Create account</a>
              </div>
              
              {/* 社交登录部分 */}
              <div className="social-login">
                <div className="divider">
                  <span>Or sign in with</span>
                </div>
                <div className="social-buttons">
                  <button type="button" className="social-button github-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </button>
                  <button type="button" className="social-button google-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="#FFC107"/>
                      <path d="M5.842,14.124l-2.178,1.696c1.916,3.78,5.832,6.356,10.303,5.691c3.162-0.469,5.781-2.411,7.196-5.006l-2.318-1.718c-0.973,1.928-2.86,3.379-5.124,3.658C9.907,18.993,7.071,17.327,5.842,14.124z" fill="#FF3D00"/>
                      <path d="M12.545,2c-2.667,0-5.112,0.979-6.982,2.601l2.144,1.696c1.432-1.302,3.544-2.038,5.395-1.63c1.366,0.299,2.565,1.126,3.343,2.285l2.208-2.147C17.062,3.223,14.945,2,12.545,2z" fill="#4CAF50"/>
                      <path d="M21.973,10.252H12.545v3.744h9.428c-0.099-1.262-0.382-2.452-0.84-3.559L21.973,10.252z" fill="#1976D2"/>
                    </svg>
                    <span>Google</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* 使用Portal将主题切换按钮渲染到body层级 */}
      <ThemeTogglePortal />
    </>
  );
};

// 全局声明粒子库相关类型
declare global {
  interface Window {
    particlesJS: any;
    pJSDom: any[];
  }
}

export default LoginPage;
