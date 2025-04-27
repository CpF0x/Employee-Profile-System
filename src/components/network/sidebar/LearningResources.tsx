import React from 'react';

interface LearningResource {
  id: number;
  title: string;
  meta: string;
  icon: string;
}

interface LearningResourcesProps {
  resources?: LearningResource[];
}

const LearningResources: React.FC<LearningResourcesProps> = ({
  resources = [
    {
      id: 1,
      title: 'Data-Driven Product Development',
      meta: '15,000 professionals enrolled this month',
      icon: '📊'
    },
    {
      id: 2,
      title: 'Agile Leadership Essentials',
      meta: 'Recommended based on your profile',
      icon: '🚀'
    }
  ]
}) => {
  return (
    <div className="card">
      <div className="sidebar-card-title">Recommended Learning</div>
      
      {resources.map(resource => (
        <div className="suggestion-item" key={resource.id}>
          <div className="suggestion-avatar">{resource.icon}</div>
          <div className="suggestion-info">
            <h4>{resource.title}</h4>
            <div className="suggestion-meta">{resource.meta}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningResources; 