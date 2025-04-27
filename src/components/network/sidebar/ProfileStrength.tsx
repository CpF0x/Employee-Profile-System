import React from 'react';

interface ProfileStrengthProps {
  percentage: number;
  text?: string;
}

const ProfileStrength: React.FC<ProfileStrengthProps> = ({
  percentage,
  text = 'Your profile is 65% complete. Add a profile photo to improve visibility.'
}) => {
  return (
    <div className="card">
      <div className="sidebar-card-title">Profile Strength</div>
      <div className="profile-completion">
        <div className="completion-bar">
          <div 
            className="completion-progress" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="completion-text">{text}</p>
      </div>
    </div>
  );
};

export default ProfileStrength; 