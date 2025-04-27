import React from 'react';
import { Link } from 'react-router-dom';

interface TimelineCardProps {
  timelineLink?: string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ 
  timelineLink = '/timeline' 
}) => {
  return (
    <div className="card">
      <div style={{ padding: '25px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '15px', color: 'var(--text-color)', transition: 'color 0.3s ease' }}>
          查看我的专业经验时间线
        </h3>
        <p style={{ marginBottom: '20px', color: 'var(--nav-text)', transition: 'color 0.3s ease' }}>
          探索我的职业成长历程，了解我的项目经验和技能发展
        </p>
        <Link 
          to={timelineLink} 
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          <button className="btn btn-primary">
            <span>📋</span> 查看完整经验时间线
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TimelineCard; 