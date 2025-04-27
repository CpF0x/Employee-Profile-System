import React from 'react';

interface Education {
  id: number;
  school: string;
  degree: string;
  period: string;
  logo: string;
}

interface EducationCardProps {
  educations?: Education[];
}

const EducationCard: React.FC<EducationCardProps> = ({
  educations = [
    {
      id: 1,
      school: 'Stanford University',
      degree: 'Master of Business Administration (MBA)',
      period: '2015 - 2017',
      logo: 'S'
    },
    {
      id: 2,
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      period: '2011 - 2015',
      logo: 'B'
    }
  ]
}) => {
  return (
    <div className="card">
      <div className="section-title">
        <h2>Education</h2>
        <button className="edit-profile">✏️</button>
      </div>

      {educations.map(education => (
        <div className="experience-item" key={education.id}>
          <div className="experience-logo">{education.logo}</div>
          <div className="experience-details">
            <h3>{education.school}</h3>
            <div className="experience-company">{education.degree}</div>
            <div className="experience-date">{education.period}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationCard; 