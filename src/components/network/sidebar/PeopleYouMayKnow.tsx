import React from 'react';

interface Person {
  id: number;
  name: string;
  title: string;
  company: string;
  avatar: string;
}

interface PeopleYouMayKnowProps {
  people?: Person[];
}

const PeopleYouMayKnow: React.FC<PeopleYouMayKnowProps> = ({
  people = [
    {
      id: 1,
      name: 'Sarah Williams',
      title: 'Product Director at CloudTech',
      company: 'CloudTech',
      avatar: 'S'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'UX Designer at DesignLabs',
      company: 'DesignLabs',
      avatar: 'M'
    },
    {
      id: 3,
      name: 'Jessica Taylor',
      title: 'Software Engineer at TechGiant',
      company: 'TechGiant',
      avatar: 'J'
    }
  ]
}) => {
  return (
    <div className="card">
      <div className="sidebar-card-title">People you may know</div>
      
      {people.map(person => (
        <div className="suggestion-item" key={person.id}>
          <div className="suggestion-avatar">{person.avatar}</div>
          <div className="suggestion-info">
            <h4>{person.name}</h4>
            <div className="suggestion-meta">{person.title}</div>
            <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 10px' }}>
              Connect
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleYouMayKnow; 