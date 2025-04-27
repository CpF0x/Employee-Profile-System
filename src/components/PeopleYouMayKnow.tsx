import React from 'react';

interface PersonCardProps {
  id: string;
  name: string;
  avatar: string;
  mutualConnections: number;
  occupation?: string;
}

interface PeopleYouMayKnowProps {
  people: PersonCardProps[];
}

const PeopleYouMayKnow: React.FC<PeopleYouMayKnowProps> = ({ people }) => {
  return (
    <div className="people-you-may-know sidebar-card">
      <div className="sidebar-card-title">
        <h3>你可能认识的人</h3>
      </div>
      <div className="people-list">
        {people.map((person) => (
          <div key={person.id} className="person-card">
            <div className="person-avatar">
              <img src={person.avatar} alt={person.name} />
            </div>
            <div className="person-info">
              <h4 className="person-name">{person.name}</h4>
              {person.occupation && (
                <p className="person-occupation">{person.occupation}</p>
              )}
              <p className="mutual-connections">
                {person.mutualConnections} 个共同好友
              </p>
            </div>
            <div className="connection-actions">
              <button className="connect-btn">添加</button>
              <button className="ignore-btn">
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="see-more-action">
        <a href="#" className="see-all-link">查看更多推荐 <i className="fa fa-arrow-right"></i></a>
      </div>
    </div>
  );
};

export default PeopleYouMayKnow; 