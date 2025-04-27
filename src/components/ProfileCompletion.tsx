import React from 'react';

interface ProfileCompletionProps {
  completionPercentage: number;
  pendingTasks: string[];
}

const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ 
  completionPercentage, 
  pendingTasks 
}) => {
  return (
    <div className="profile-completion sidebar-card">
      <div className="sidebar-card-title">
        <h3>完善你的个人资料</h3>
      </div>
      <div className="completion-status">
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="completion-percentage">
          <span>{completionPercentage}%</span> 完成
        </div>
      </div>
      <div className="pending-tasks">
        <h4>待完成事项：</h4>
        <ul>
          {pendingTasks.map((task, index) => (
            <li key={index} className="task-item">
              <i className="fa fa-circle"></i>
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="action-button">
        <button className="complete-profile-btn">编辑个人资料</button>
      </div>
    </div>
  );
};

export default ProfileCompletion; 