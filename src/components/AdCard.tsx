import React from 'react';

interface AdCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  sponsor?: string;
}

const AdCard: React.FC<AdCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  linkUrl, 
  sponsor 
}) => {
  return (
    <div className="ad-card sidebar-card">
      <div className="ad-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="ad-content">
        <h4 className="ad-title">{title}</h4>
        <p className="ad-description">{description}</p>
        {sponsor && <p className="ad-sponsor">赞助商: {sponsor}</p>}
        <a href={linkUrl} className="ad-link" target="_blank" rel="noopener noreferrer">
          了解更多 <i className="fa fa-external-link"></i>
        </a>
      </div>
      <button className="ad-dismiss">
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
};

export default AdCard; 