import React from 'react';

interface RecommendedUser {
  id: number;
  name: string;
  title: string;
  company: string;
  mutual: number;
}

interface RecommendedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  applicants: number;
}

interface RecommendationsProps {
  title: string;
  buttonText: string;
  type: 'users' | 'jobs';
  items: RecommendedUser[] | RecommendedJob[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ 
  title, 
  buttonText,
  type,
  items 
}) => {
  // 渲染推荐用户
  const renderUserItem = (item: RecommendedUser) => (
    <div className="recommendation-item" key={item.id}>
      <div className="recommendation-avatar"></div>
      <div className="recommendation-info">
        <div className="recommendation-name">{item.name}</div>
        <div className="recommendation-title">{item.title} at {item.company}</div>
        <div className="recommendation-mutual">{item.mutual} 个共同人脉</div>
      </div>
      <button className="btn btn-secondary btn-sm">关注</button>
    </div>
  );

  // 渲染推荐工作
  const renderJobItem = (item: RecommendedJob) => (
    <div className="recommendation-item" key={item.id}>
      <div className="job-logo"></div>
      <div className="recommendation-info">
        <div className="recommendation-name">{item.title}</div>
        <div className="recommendation-title">{item.company} · {item.location}</div>
        <div className="recommendation-mutual">{item.applicants} 人申请</div>
      </div>
      <button className="btn btn-secondary btn-sm">申请</button>
    </div>
  );

  return (
    <div className="card recommendations">
      <div className="recommendations-header">
        <h3>{title}</h3>
        <button className="recommendations-more">{buttonText}</button>
      </div>
      <div className="recommendations-list">
        {type === 'users' 
          ? (items as RecommendedUser[]).map(item => renderUserItem(item))
          : (items as RecommendedJob[]).map(item => renderJobItem(item))
        }
      </div>
    </div>
  );
};

export default Recommendations; 