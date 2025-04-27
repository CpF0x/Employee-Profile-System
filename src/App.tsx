import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/main.css';
import './styles/ThemeNotification.css';
import ThemeNotification from './components/theme/ThemeNotification';
import { useThemeNotification } from './hooks/useThemeNotification';

const App: React.FC = () => {
  const navigate = useNavigate();

  // 主题状态管理
  const [theme, setTheme] = useState(() => {
    // 获取主题偏好
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return storedTheme || (prefersDark ? 'dark' : 'light');
  });

  // 资料编辑状态
  const [isEditing, setIsEditing] = useState(false);

  // 个人资料数据
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    headline: "Senior Product Manager | Technology Enthusiast",
    currentPosition: "Product Lead at TechCorp",
    location: "San Francisco Bay Area",
    avatarUrl: "",
    bannerUrl: ""
  });

  // 表单数据
  const [formData, setFormData] = useState({...profileData});

  // 使用主题通知钩子
  const { notification, isVisible, showThemeNotification } = useThemeNotification();

  // 应用主题
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);

    // 更新粒子颜色
    updateParticlesColors();
  }, [theme]);

  // 初始化粒子效果
  useEffect(() => {
    // 加载粒子库脚本
    const loadParticlesScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.async = true;
      script.onload = initParticles;
      document.body.appendChild(script);
    };

    // 如果粒子库尚未加载，则加载
    if (!(window as any).particlesJS) {
      loadParticlesScript();
    } else {
      initParticles();
    }

    // 添加页面过渡动画处理
    const handleTimelineLinks = () => {
      const timelineLinks = document.querySelectorAll('.timeline-link');
      const pageTransition = document.getElementById('pageTransition');

      timelineLinks.forEach(link => {
        link.addEventListener('click', function(this: HTMLAnchorElement, e) {
          e.preventDefault();
          const targetUrl = this.getAttribute('href');

          // 添加动画状态类
          document.body.classList.add('page-animating');
          if (pageTransition) {
            pageTransition.classList.add('active');
          }

          // 动画完成后跳转到目标页面
          setTimeout(() => {
            if (targetUrl) {
              window.location.href = targetUrl;
            }
          }, 600);
        });
      });
    };

    // 当DOM加载完成后设置链接事件
    handleTimelineLinks();

    // 强制滚动条显示
    document.body.style.overflowY = 'scroll';
    document.body.style.height = 'auto';
    document.documentElement.style.overflowY = 'scroll';
    document.documentElement.style.height = 'auto';

    return () => {
      // 清理粒子实例
      if ((window as any).pJSDom && (window as any).pJSDom.length) {
        (window as any).pJSDom = [];
      }

      // 移除页面过渡动画类
      document.body.classList.remove('page-animating');
    };
  }, []);

  // 初始化粒子
  const initParticles = () => {
    if (!(window as any).particlesJS) return;

    const isDarkMode = theme === 'dark';

    (window as any).particlesJS("particles-js", {
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
  };

  // 更新粒子颜色
  const updateParticlesColors = () => {
    if ((window as any).pJSDom && (window as any).pJSDom[0] && (window as any).pJSDom[0].pJS) {
      const isDark = theme === 'dark';
      const pJS = (window as any).pJSDom[0].pJS;

      // 更新粒子颜色
      pJS.particles.color.value = isDark ? "#dbeafe" : "#7dd3fc";
      pJS.particles.line_linked.color = isDark ? "#93c5fd" : "#3b82f6";

      // 更新粒子透明度
      pJS.particles.opacity.value = isDark ? 0.3 : 0.2;

      // 刷新粒子
      pJS.fn.particlesRefresh();

      // 更新粒子背景元素
      const particlesElement = document.getElementById('particles-js');
      if (particlesElement) {
        // 强制重新应用背景样式
        particlesElement.style.background = '';
        setTimeout(() => {
          particlesElement.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-gradient');
        }, 0);
      }
    }
  };

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    localStorage.setItem('theme', newTheme);

    // 更新粒子颜色
    updateParticlesColors();

    // 显示主题切换通知
    showThemeNotification(`已切换到${newTheme === 'dark' ? '深色' : '浅色'}主题`);
  };

  // 切换编辑模式
  const toggleEditMode = () => {
    if (!isEditing) {
      // 进入编辑模式
      setFormData({...profileData});
    }
    setIsEditing(!isEditing);
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id.replace('Input', '')]: value
    });
  };

  // 处理头像上传
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          avatarUrl: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理背景图片上传
  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          bannerUrl: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // 原有的通知方法替换为钩子中的方法
  const showNotification = (message: string) => {
    showThemeNotification(message);
  };

  // 保存资料更改
  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
    // 显示成功消息
    showThemeNotification('个人资料已更新！');
  };

  // 取消编辑
  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  // 处理登出
  const handleLogout = () => {
    // 这里可以添加登出逻辑，比如清除token等
    console.log('用户登出');
    navigate('/');
  };

  return (
    <div className="app-container">
      <div id="particles-js"></div>

      {/* 页面过渡动画元素 */}
      <div className="page-transition" id="pageTransition"></div>

      {/* 主题切换按钮 */}
      <button
        id="themeToggle"
        className="theme-toggle"
        aria-label="切换主题"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? '\u2600\uFE0F' : '\u{1F319}'}
      </button>

      <header>
        <div className="container header-content">
          <a href="#" className="logo">ProNet</a>

          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search" />
          </div>

          <ul className="nav-links">
            <li className="nav-item">
              <span className="icon">🏠</span>
              <a href="#">Home</a>
            </li>
            <li className="nav-item">
              <span className="icon">👥</span>
              <a href="/network">Network</a>
            </li>
            <li className="nav-item">
              <span className="icon">💼</span>
              <a href="#">Jobs</a>
            </li>
            <li className="nav-item">
              <span className="icon">📋</span>
              <a href="/timeline">Experience</a>
            </li>
            <li className="nav-item">
              <span className="icon">✉️</span>
              <a href="#">Messages</a>
            </li>
            <li className="nav-item">
              <span className="icon">🔔</span>
              <span className="notification-badge">3</span>
              <a href="#">Notifications</a>
            </li>
          </ul>

          <div className="profile-section" onClick={handleLogout}>
            <div className="profile-pic"></div>
            <span>退出 ▼</span>
          </div>
        </div>
      </header>

      <div className="container main-content">
        <div className="content-column">
          {/* Profile Card */}
          <div className="card">
            <div
              className="profile-banner"
              style={profileData.bannerUrl ? { backgroundImage: `url(${profileData.bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            ></div>
            <div className="profile-info" id="profileInfo">
              <div
                className="profile-avatar"
                id="profileAvatar"
                style={profileData.avatarUrl ? { backgroundImage: `url(${profileData.avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              ></div>
              <button className="edit-profile" id="editProfileBtn" onClick={toggleEditMode}>✏️</button>

              {/* View Mode */}
              {!isEditing && (
                <div className="profile-header" id="viewMode">
                  <h1 className="profile-name">
                    {profileData.name} <span className="verified-badge">✓</span>
                  </h1>
                  <p className="profile-headline">{profileData.headline}</p>

                  <div className="profile-current">
                    <div className="company-logo">T</div>
                    <span>{profileData.currentPosition}</span>
                  </div>

                  <div className="profile-location">
                    <span>📍</span>
                    <span>{profileData.location}</span>
                  </div>

                  <div style={{ color: 'var(--nav-text)', fontSize: '14px', transition: 'color 0.3s ease' }}>
                    <span>500+ connections</span>
                  </div>

                  <div className="profile-actions">
                    <button className="btn btn-primary">
                      <span>✉️</span> Message
                    </button>
                    <button className="btn btn-secondary">
                      <span>👤</span> Connect
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Mode */}
              {isEditing && (
                <div className="profile-header edit-mode" id="editMode">
                  <div className="avatar-upload">
                    <label htmlFor="avatarUpload" className="upload-label">📸</label>
                    <input type="file" id="avatarUpload" accept="image/*" onChange={handleAvatarUpload} />
                  </div>

                  <div className="banner-upload">
                    <label htmlFor="bannerUpload" className="banner-upload-label">📸 Update cover photo</label>
                    <input type="file" id="bannerUpload" accept="image/*" onChange={handleBannerUpload} />
                  </div>

                  <label htmlFor="nameInput">Name</label>
                  <input
                    type="text"
                    id="nameInput"
                    value={formData.name}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="headlineInput">Headline</label>
                  <input
                    type="text"
                    id="headlineInput"
                    value={formData.headline}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="currentPositionInput">Current Position</label>
                  <input
                    type="text"
                    id="currentPositionInput"
                    value={formData.currentPosition}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="locationInput">Location</label>
                  <input
                    type="text"
                    id="locationInput"
                    value={formData.location}
                    onChange={handleInputChange}
                  />

                  <div className="edit-buttons">
                    <button className="btn btn-primary" id="saveBtn" onClick={handleSave}>Save</button>
                    <button className="btn btn-secondary" id="cancelBtn" onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Experience Timeline Link Card */}
          <div className="card">
            <div style={{ padding: '25px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '15px', color: 'var(--text-color)', transition: 'color 0.3s ease' }}>查看我的专业经验时间线</h3>
              <p style={{ marginBottom: '20px', color: 'var(--nav-text)', transition: 'color 0.3s ease' }}>
                探索我的职业成长历程，了解我的项目经验和技能发展
              </p>
              <Link to="/timeline" style={{ display: 'inline-block', textDecoration: 'none' }}>
                <button className="btn btn-primary">
                  <span>📋</span> 查看完整经验时间线
                </button>
              </Link>
            </div>
          </div>

          {/* Education Card */}
          <div className="card">
            <div className="section-title">
              <h2>Education</h2>
              <button className="edit-profile">✏️</button>
            </div>

            <div className="experience-item">
              <div className="experience-logo">S</div>
              <div className="experience-details">
                <h3>Stanford University</h3>
                <div className="experience-company">Master of Business Administration (MBA)</div>
                <div className="experience-date">2015 - 2017</div>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-logo">B</div>
              <div className="experience-details">
                <h3>University of California, Berkeley</h3>
                <div className="experience-company">Bachelor of Science in Computer Science</div>
                <div className="experience-date">2011 - 2015</div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar">
          {/* Profile Completion Card */}
          <div className="card">
            <div className="sidebar-card-title">Profile Strength</div>
            <div className="profile-completion">
              <div className="completion-bar">
                <div className="completion-progress"></div>
              </div>
              <p className="completion-text">Your profile is 65% complete. Add a profile photo to improve visibility.</p>
            </div>
          </div>

          {/* People You May Know Card */}
          <div className="card">
            <div className="sidebar-card-title">People you may know</div>

            <div className="suggestion-item">
              <div className="suggestion-avatar">S</div>
              <div className="suggestion-info">
                <h4>Sarah Williams</h4>
                <div className="suggestion-meta">Product Director at CloudTech</div>
                <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 10px' }}>Connect</button>
              </div>
            </div>

            <div className="suggestion-item">
              <div className="suggestion-avatar">M</div>
              <div className="suggestion-info">
                <h4>Michael Chen</h4>
                <div className="suggestion-meta">UX Designer at DesignLabs</div>
                <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 10px' }}>Connect</button>
              </div>
            </div>

            <div className="suggestion-item">
              <div className="suggestion-avatar">J</div>
              <div className="suggestion-info">
                <h4>Jessica Taylor</h4>
                <div className="suggestion-meta">Software Engineer at TechGiant</div>
                <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 10px' }}>Connect</button>
              </div>
            </div>
          </div>

          {/* Ad Card */}
          <div className="card">
            <div className="ad-container">
              <div className="ad-label">Ad</div>
              <div className="ad-content">
                <div className="ad-image"></div>
                <div className="ad-text">
                  <h4>Master Product Management</h4>
                  <p className="ad-description">Take your career to the next level with our online certification course.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Resources Card */}
          <div className="card">
            <div className="sidebar-card-title">Recommended Learning</div>

            <div className="suggestion-item">
              <div className="suggestion-avatar">📊</div>
              <div className="suggestion-info">
                <h4>Data-Driven Product Development</h4>
                <div className="suggestion-meta">15,000 professionals enrolled this month</div>
              </div>
            </div>

            <div className="suggestion-item">
              <div className="suggestion-avatar">🚀</div>
              <div className="suggestion-info">
                <h4>Agile Leadership Essentials</h4>
                <div className="suggestion-meta">Recommended based on your profile</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 通知消息 - 使用ThemeNotification组件 */}
      {notification && (
        <ThemeNotification
          message={notification}
          visible={isVisible}
        />
      )}
    </div>
  );
};

export default App;
