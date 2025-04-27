import React, { useState } from 'react';
import ProfileStrength from './sidebar/ProfileStrength';
import PeopleYouMayKnow from './sidebar/PeopleYouMayKnow';
import AdCard from './sidebar/AdCard';
import LearningResources from './sidebar/LearningResources';
import Recommendations from './sidebar/Recommendations';

const Sidebar: React.FC = () => {
  const [recommendations, setRecommendations] = useState([
    {
      id: '1',
      name: '王伟',
      title: '市场总监 @ 新兴科技公司',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      connections: 8
    },
    {
      id: '2',
      name: '赵敏',
      title: '数据分析师 @ 金融科技',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      connections: 4
    }
  ]);
  
  const handleFollow = (id: string) => {
    // 实际应用中这里会调用API关注用户
    console.log(`关注用户: ${id}`);
    // 从推荐列表中移除该用户
    setRecommendations(recommendations.filter(rec => rec.id !== id));
  };
  
  const handleDismiss = (id: string) => {
    // 从推荐列表中移除用户
    setRecommendations(recommendations.filter(rec => rec.id !== id));
  };

  return (
    <div className="sidebar">
      {/* 个人资料完成度卡片 */}
      <ProfileStrength percentage={65} />
      
      {/* 推荐关注卡片 */}
      <Recommendations 
        recommendations={recommendations}
        onFollow={handleFollow}
        onDismiss={handleDismiss}
      />
      
      {/* 你可能认识的人卡片 */}
      <PeopleYouMayKnow />
      
      {/* 广告卡片 */}
      <AdCard 
        title="掌握产品管理技能"
        description="通过我们在线认证课程提升您的职业水平"
        imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        linkUrl="/courses/product-management"
        sponsor="专业技能学院"
      />
      
      {/* 学习资源卡片 */}
      <LearningResources 
        resources={[
          {
            id: "res1",
            title: "数据驱动的产品开发",
            description: "学习如何利用数据分析指导产品决策",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            linkUrl: "/courses/data-driven-product-development"
          },
          {
            id: "res2",
            title: "敏捷领导力精要",
            description: "掌握敏捷团队管理的核心技能",
            imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            linkUrl: "/courses/agile-leadership"
          }
        ]}
      />
    </div>
  );
};

export default Sidebar; 