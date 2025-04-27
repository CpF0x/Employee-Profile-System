import React, { useState } from 'react';

interface ProfileData {
  name: string;
  headline: string;
  currentPosition: string;
  location: string;
  avatarUrl: string;
  bannerUrl: string;
}

interface ProfileCardProps {
  initialData?: ProfileData;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  initialData = {
    name: "Alex Johnson",
    headline: "Senior Product Manager | Technology Enthusiast",
    currentPosition: "Product Lead at TechCorp",
    location: "San Francisco Bay Area",
    avatarUrl: "",
    bannerUrl: ""
  }
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(initialData);
  const [formData, setFormData] = useState<ProfileData>(initialData);

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

  // 保存资料更改
  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
    // 显示通知信息（可以使用context或事件来实现）
    window.setTimeout(() => {
      alert('个人资料已更新！');
    }, 100);
  };

  // 取消编辑
  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div 
        className="profile-banner"
        style={profileData.bannerUrl ? { backgroundImage: `url(${profileData.bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        {isEditing && (
          <div className="banner-upload">
            <label htmlFor="bannerUpload" className="banner-upload-label">📸 更新封面照片</label>
            <input 
              type="file" 
              id="bannerUpload" 
              accept="image/*"
              onChange={handleBannerUpload}
            />
          </div>
        )}
      </div>
      
      <div className="profile-info">
        <div 
          className="profile-avatar"
          style={profileData.avatarUrl ? { backgroundImage: `url(${profileData.avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          {isEditing && (
            <div className="avatar-upload">
              <label htmlFor="avatarUpload" className="upload-label">📸</label>
              <input 
                type="file" 
                id="avatarUpload" 
                accept="image/*"
                onChange={handleAvatarUpload}
              />
            </div>
          )}
        </div>
        
        <button 
          className="edit-profile" 
          onClick={() => setIsEditing(!isEditing)}
          aria-label="编辑个人资料"
        >
          ✏️
        </button>

        {/* 查看模式 */}
        {!isEditing && (
          <div className="profile-header">
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

        {/* 编辑模式 */}
        {isEditing && (
          <div className="profile-header edit-mode">
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
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard; 