import React, { useState } from 'react';
import ContentBlock from './ContentBlock';
import NewPostForm from './NewPostForm';
import PostCard from './PostCard';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    title?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}

const Activity: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: '张明',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        title: '产品经理 @ 科技公司'
      },
      content: '我很高兴地宣布，我们的新产品今天正式发布了！感谢团队的每一个成员，没有你们的努力，这一切都不可能实现。期待看到用户的反馈！',
      timestamp: '2小时前',
      likes: 42,
      comments: 8,
      shares: 3
    },
    {
      id: '2',
      author: {
        name: '李婷',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        title: 'UX设计师 @ 创意工作室'
      },
      content: '今天参加了一个关于用户体验设计的研讨会，获益匪浅。现在的设计不仅要美观，更要关注用户的实际需求和使用场景。分享一些会议的要点：1.始终以用户为中心 2.简化复杂流程 3.定期收集用户反馈',
      timestamp: '昨天',
      likes: 25,
      comments: 4,
      shares: 1
    }
  ]);

  const handlePostSubmit = (postContent: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: '当前用户',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        title: '软件工程师'
      },
      content: postContent,
      timestamp: '刚刚',
      likes: 0,
      comments: 0,
      shares: 0
    };
    
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="activity-section">
      <ContentBlock title="发表动态">
        <NewPostForm onPostSubmit={handlePostSubmit} />
      </ContentBlock>
      
      <ContentBlock 
        title="最新动态" 
        actionButton={{
          text: '筛选',
          icon: '🔍',
          onClick: () => console.log('筛选动态')
        }}
      >
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
        
        <div className="load-more">
          <button className="load-more-button">
            加载更多动态
          </button>
        </div>
      </ContentBlock>
    </div>
  );
};

export default Activity; 