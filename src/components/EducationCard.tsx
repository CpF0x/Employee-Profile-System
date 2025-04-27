import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

interface EducationItem {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  logo?: string;
}

interface EducationCardProps {
  educationItems: EducationItem[];
}

const EducationCard: React.FC<EducationCardProps> = ({ educationItems }) => {
  return (
    <div className="card">
      <div className="section-title">
        <h2>教育经历</h2>
      </div>
      <div className="card-content">
        {educationItems.map((item, index) => (
          <div key={index} className="experience-item">
            <div className="experience-logo">
              {item.logo ? (
                <img src={item.logo} alt={item.school} />
              ) : (
                <FaGraduationCap />
              )}
            </div>
            <div className="experience-details">
              <h3>{item.degree}</h3>
              <div className="experience-company">{item.school}</div>
              <div className="experience-date">
                {item.startDate} - {item.endDate}
              </div>
              <div className="experience-field">{item.field}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationCard; 