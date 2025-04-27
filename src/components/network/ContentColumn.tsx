import React from 'react';
import ProfileCard from '../profile/ProfileCard';
import EducationCard from './EducationCard';
import TimelineCard from './TimelineCard';
import Activity from './Activity';

// 主内容区域展示用户资料、动态、时间线链接和教育信息
const ContentColumn: React.FC = () => {
  return (
    <div className="content-column">
      {/* 个人资料卡片 */}
      <ProfileCard />
      
      {/* 动态区域 */}
      <Activity />
      
      {/* 经验时间线链接卡片 */}
      <TimelineCard />
      
      {/* 教育信息卡片 */}
      <EducationCard educationItems={[
        {
          school: "斯坦福大学",
          degree: "工商管理硕士",
          field: "商业管理与领导力",
          startDate: "2015",
          endDate: "2017"
        },
        {
          school: "加州大学伯克利分校",
          degree: "计算机科学学士",
          field: "软件工程与人工智能",
          startDate: "2011",
          endDate: "2015"
        }
      ]} />
    </div>
  );
};

export default ContentColumn; 