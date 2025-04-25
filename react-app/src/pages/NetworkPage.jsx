import React, { useState, useEffect, useRef } from 'react';
import styles from './NetworkPage.module.css';
// import '../assets/portal.css'; // 可能需要导入 portal.css

// 占位符 - 粒子效果组件
const ParticleComponent = () => {
    // 理想情况下，如果粒子效果是全局背景，应将其放在 App.jsx 中
    // 或者复用之前创建的 ParticleComponent
    // 如果需要为该页面定制粒子效果，则需要创建或调整 ParticleComponent
    const particlesRef = useRef(null);
    useEffect(() => {
        // 检查 window.particlesJS 是否已加载（可能由其他页面加载）
        if (window.particlesJS) {
            window.particlesJS("network-particles-js", {
                // ... (从 HTML 中复制的 particles.js 配置) ...
                "particles": {
                    "number": {
                        "value": 50,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#dbeafe" // 使用 CSS 变量或硬编码
                    },
                    "shape": {
                        "type": "circle"
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": true
                    },
                    "size": {
                        "value": 3,
                        "random": true
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#93c5fd", // 使用 CSS 变量或硬编码
                        "opacity": 0.2,
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
        } else {
            console.warn('particles.js library not loaded for NetworkPage.');
        }
        // 返回清理函数 (如果 particles.js 提供)
        return () => {
            // 尝试清理，具体方法取决于库实现
            const pJS = window.pJSDom?.find(p => p.pJS?.canvas?.el?.id === 'network-particles-js');
            if (pJS && pJS.pJS?.fn?.vendors?.destroypJS) {
                // pJS.pJS.fn.vendors.destroypJS();
                console.log('Attempted destroy particlesJS on NetworkPage');
            }
        };
    }, []);
    return <div id="network-particles-js" ref={particlesRef} className={styles['particles-js-container']} />; // 添加一个包裹 div 和样式
};

// 占位符 - 通知组件
const Notification = ({ message, show, onDismiss }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 3500); // 显示 3 秒后自动消失
            return () => clearTimeout(timer);
        }
    }, [show, onDismiss]);

    if (!show) return null;

    return (
        <div className={styles.notification}>
            {message}
        </div>
    );
};

function NetworkPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "Alex Johnson",
        headline: "Senior Product Manager | Technology Enthusiast",
        currentPosition: "Product Lead at TechCorp",
        location: "San Francisco Bay Area",
        avatarUrl: "", // 初始为空，可以设置默认图片 URL
        bannerUrl: "" // 初始为空，可以设置默认图片 URL
    });
    // 用于编辑模式的临时状态
    const [editFormData, setEditFormData] = useState({});
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    // 文件引用
    const avatarUploadRef = useRef(null);
    const bannerUploadRef = useRef(null);

    const handleEditClick = () => {
        setEditFormData({ ...profileData }); // 将当前数据填入编辑表单
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        setProfileData({ ...editFormData }); // 保存编辑后的数据
        setIsEditing(false);
        setNotificationMessage('Profile updated successfully!');
        setShowNotification(true);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEditFormData(prev => ({ ...prev, [id.replace('Input', '')]: value }));
    };

    // 文件上传处理 (简化)
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const url = event.target.result;
                setEditFormData(prev => ({ ...prev, [type]: url }));
                // 预览效果 (可选)
                if (type === 'avatarUrl') {
                    // 更新编辑状态下的预览，或直接更新主数据
                    // document.getElementById('editProfileAvatar').style.backgroundImage = `url(${url})`;
                } else if (type === 'bannerUrl') {
                    // 更新编辑状态下的预览
                    // document.getElementById('editProfileBanner').style.backgroundImage = `url(${url})`;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const dismissNotification = () => {
        setShowNotification(false);
    };

    // 用于设置背景图片样式
    const avatarStyle = { 
        backgroundImage: `url(${isEditing ? editFormData.avatarUrl : profileData.avatarUrl})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
    };
    const bannerStyle = { 
        backgroundImage: `url(${isEditing ? editFormData.bannerUrl : profileData.bannerUrl})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
    };


    return (
        <div className={styles.networkPageContainer}> {/* 应用容器样式 */}
            <ParticleComponent />
            <header className={styles.header}>
                <div className={`${styles.container} ${styles['header-content']}`}>
                    <a href="#" className={styles.logo}>ProNet</a>

                    <div className={styles['search-bar']}>
                        <span className={styles['search-icon']}>🔍</span>
                        <input type="text" placeholder="Search" />
                    </div>

                    <ul className={styles['nav-links']}>
                        <li className={styles['nav-item']}>
                            <span className={styles.icon}>🏠</span>
                            {/* 使用 Link 组件进行路由跳转 */} <a href="#">Home</a>
                        </li>
                        <li className={styles['nav-item']}>
                            <span className={styles.icon}>👥</span>
                            <a href="#">Network</a>
                        </li>
                        <li className={styles['nav-item']}>
                            <span className={styles.icon}>💼</span>
                            <a href="#">Jobs</a>
                        </li>
                        <li className={styles['nav-item']}>
                            <span className={styles.icon}>✉️</span>
                            <a href="#">Messages</a>
                        </li>
                        <li className={styles['nav-item']}>
                            <span className={styles.icon}>🔔</span>
                            <span className={styles['notification-badge']}>3</span>
                            <a href="#">Notifications</a>
                        </li>
                    </ul>

                    <div className={styles['profile-section']}>
                        <div className={styles['profile-pic']} style={avatarStyle /* 简单应用头像 */}></div>
                        <span>Me ▼</span> {/* 下拉菜单功能需要额外实现 */} 
                    </div>
                </div>
            </header>

            <div className={`${styles.container} ${styles['main-content']}`}>
                <div className={styles['content-column']}>
                    {/* Profile Card */}
                    <div className={styles.card}>
                        <div className={styles['profile-banner']} style={bannerStyle} id="profileBanner"></div>
                        <div className={`${styles['profile-info']} ${isEditing ? styles['edit-mode'] : ''}`}>
                            <button className={styles['edit-profile']} onClick={handleEditClick} style={{ display: isEditing ? 'none' : 'block' }}>✏️</button>

                            {/* View Mode */}
                            <div className={styles['profile-header']} style={{ display: isEditing ? 'none' : 'block' }}>
                                <div className={styles['profile-avatar']} style={avatarStyle}></div>
                                <h1 className={styles['profile-name']}>
                                    {profileData.name} <span className={styles['verified-badge']}>✓</span>
                                </h1>
                                <p className={styles['profile-headline']}>{profileData.headline}</p>

                                <div className={styles['profile-current']}>
                                    <div className={styles['company-logo']}>T</div> {/* 根据公司名动态生成或显示图片 */} 
                                    <span>{profileData.currentPosition}</span>
                                </div>

                                <div className={styles['profile-location']}>
                                    <span>📍</span>
                                    <span>{profileData.location}</span>
                                </div>

                                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                                    <span>500+ connections</span> {/* 需要动态获取 */} 
                                </div>

                                <div className={styles['profile-actions']}>
                                    <button className={`${styles.btn} ${styles['btn-primary']}`}>
                                        <span>✉️</span> Message
                                    </button>
                                    <button className={`${styles.btn} ${styles['btn-secondary']}`}>
                                        <span>👤</span> Connect
                                    </button>
                                </div>
                            </div>

                            {/* Edit Mode */} 
                            <div className={styles['profile-header']} style={{ display: isEditing ? 'block' : 'none' }}>
                                <div className={styles['avatar-upload']}>
                                    <div className={styles['profile-avatar']} style={avatarStyle} id="editProfileAvatar"></div> {/* 预览用 */} 
                                    <label htmlFor="avatarUpload" className={styles['upload-label']}>📸</label>
                                    <input type="file" id="avatarUpload" accept="image/*" ref={avatarUploadRef} onChange={(e) => handleFileChange(e, 'avatarUrl')} style={{ display: 'none' }} />
                                </div>

                                <div className={styles['banner-upload']}>
                                     <div className={styles['profile-banner']} style={bannerStyle} id="editProfileBanner"></div> {/* 预览用 */} 
                                    <label htmlFor="bannerUpload" className={styles['banner-upload-label']}>📸 Update cover photo</label>
                                    <input type="file" id="bannerUpload" accept="image/*" ref={bannerUploadRef} onChange={(e) => handleFileChange(e, 'bannerUrl')} style={{ display: 'none' }} />
                                </div>

                                <label htmlFor="nameInput">Name</label>
                                <input type="text" id="nameInput" value={editFormData.name || ''} onChange={handleInputChange} />

                                <label htmlFor="headlineInput">Headline</label>
                                <input type="text" id="headlineInput" value={editFormData.headline || ''} onChange={handleInputChange} />

                                <label htmlFor="currentPositionInput">Current Position</label>
                                <input type="text" id="currentPositionInput" value={editFormData.currentPosition || ''} onChange={handleInputChange} />

                                <label htmlFor="locationInput">Location</label>
                                <input type="text" id="locationInput" value={editFormData.location || ''} onChange={handleInputChange} />

                                <div className={styles['edit-buttons']}>
                                    <button className={`${styles.btn} ${styles['btn-primary']}`} onClick={handleSaveClick}>Save</button>
                                    <button className={`${styles.btn} ${styles['btn-secondary']}`} onClick={handleCancelClick}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Experience Card --- (结构类似，省略以保持简洁) */}
                    <div className={styles.card}>
                        <div className={styles['section-title']}>
                            <h2>Experience</h2>
                             {/* <button className={styles['edit-profile']}>✏️</button> */} {/* 编辑功能待实现 */} 
                        </div>
                        {/* ... experience items ... */} 
                        <div className={styles['experience-item']}>
                             {/* ... content ... */} 
                        </div>
                    </div>
                    
                    {/* --- Education Card --- (结构类似，省略以保持简洁) */}
                     <div className={styles.card}>
                        <div className={styles['section-title']}>
                            <h2>Education</h2>
                             {/* <button className={styles['edit-profile']}>✏️</button> */} {/* 编辑功能待实现 */} 
                        </div>
                        {/* ... education items ... */} 
                         <div className={styles['experience-item']}> 
                            {/* ... content ... */} 
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    {/* --- Profile Completion Card --- (结构类似，省略) */}
                    <div className={styles.card}>
                        <div className={styles['sidebar-card-title']}>Profile Strength</div>
                        <div className={styles['profile-completion']}>
                            {/* ... progress bar and text ... */}
                        </div>
                    </div>

                    {/* --- People You May Know Card --- (结构类似，省略) */}
                     <div className={styles.card}>
                         <div className={styles['sidebar-card-title']}>People you may know</div>
                         {/* ... suggestion items ... */} 
                         <div className={styles['suggestion-item']}>
                              {/* ... content ... */} 
                         </div>
                     </div>

                    {/* --- Ad Card --- (结构类似，省略) */}
                    <div className={styles.card}>
                         <div className={styles['ad-container']}>
                             {/* ... ad content ... */} 
                         </div>
                     </div>
                    
                     {/* --- Learning Resources Card --- (结构类似，省略) */}
                     <div className={styles.card}>
                         <div className={styles['sidebar-card-title']}>Recommended Learning</div>
                          {/* ... suggestion items ... */} 
                         <div className={styles['suggestion-item']}>
                              {/* ... content ... */} 
                         </div>
                     </div>
                </div>
            </div>
            <Notification message={notificationMessage} show={showNotification} onDismiss={dismissNotification} />
        </div>
    );
}

export default NetworkPage; 