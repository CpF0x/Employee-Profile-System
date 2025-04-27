import React from 'react';

interface Resource {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

interface LearningResourcesProps {
  resources: Resource[];
}

const LearningResources: React.FC<LearningResourcesProps> = ({ resources }) => {
  return (
    <div className="learning-resources sidebar-card">
      <div className="card-header">
        <h3 className="card-title">学习资源</h3>
        <a href="/resources" className="see-all">查看全部</a>
      </div>
      <div className="resources-list">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-item">
            <div className="resource-image">
              <img src={resource.imageUrl} alt={resource.title} />
            </div>
            <div className="resource-content">
              <h4 className="resource-title">{resource.title}</h4>
              <p className="resource-description">{resource.description}</p>
              <a href={resource.linkUrl} className="resource-link" target="_blank" rel="noopener noreferrer">
                开始学习
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningResources; 