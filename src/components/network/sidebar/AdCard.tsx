import React from 'react';

interface AdCardProps {
  title?: string;
  description?: string;
}

const AdCard: React.FC<AdCardProps> = ({
  title = 'Master Product Management',
  description = 'Take your career to the next level with our online certification course.'
}) => {
  return (
    <div className="card">
      <div className="ad-container">
        <div className="ad-label">Ad</div>
        <div className="ad-content">
          <div className="ad-image"></div>
          <div className="ad-text">
            <h4>{title}</h4>
            <p className="ad-description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard; 