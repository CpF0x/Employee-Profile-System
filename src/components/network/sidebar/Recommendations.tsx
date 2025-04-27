import React from 'react';

interface Recommendation {
  id: string;
  name: string;
  title: string;
  avatar: string;
  connections: number;
}

interface RecommendationsProps {
  recommendations: Recommendation[];
  onFollow: (id: string) => void;
  onDismiss: (id: string) => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
  onFollow,
  onDismiss
}) => {
  return (
    <div className="recommendations sidebar-card">
      <div className="card-header">
        <h3 className="card-title">推荐关注</h3>
        <a href="/recommendations" className="see-all">查看全部</a>
      </div>
      
      <div className="recommendations-list">
        {recommendations.map(recommendation => (
          <div key={recommendation.id} className="recommendation-item">
            <div className="recommendation-avatar">
              <img src={recommendation.avatar} alt={recommendation.name} />
            </div>
            <div className="recommendation-info">
              <h4 className="recommendation-name">{recommendation.name}</h4>
              <p className="recommendation-title">{recommendation.title}</p>
              <p className="recommendation-connections">
                {recommendation.connections} 个共同好友
              </p>
              <div className="recommendation-actions">
                <button 
                  className="follow-btn"
                  onClick={() => onFollow(recommendation.id)}
                >
                  关注
                </button>
                <button 
                  className="dismiss-btn"
                  onClick={() => onDismiss(recommendation.id)}
                >
                  <span>✕</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {recommendations.length === 0 && (
        <div className="empty-recommendations">
          <p>暂无推荐关注</p>
        </div>
      )}
    </div>
  );
};

export default Recommendations; 