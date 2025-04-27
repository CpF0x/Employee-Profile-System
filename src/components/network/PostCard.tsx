import React, { useState } from 'react';

interface PostCardProps {
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

const PostCard: React.FC<PostCardProps> = ({
  id,
  author,
  content,
  timestamp,
  likes,
  comments,
  shares,
  isLiked = false
}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(isLiked);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="card post-card">
      <div className="post-header">
        <div className="author-avatar">
          <img src={author.avatar} alt={author.name} />
        </div>
        <div className="post-info">
          <h3 className="author-name">{author.name}</h3>
          {author.title && <p className="author-title">{author.title}</p>}
          <p className="post-time">{timestamp}</p>
        </div>
      </div>
      
      <div className="post-content">
        <p>{content}</p>
      </div>
      
      <div className="post-stats">
        <div className="likes">
          <span className="reaction-icon">👍</span>
          <span className="stat-count">{likeCount}</span>
        </div>
        <div className="comments-shares">
          <span>{comments} 评论</span>
          <span>{shares} 分享</span>
        </div>
      </div>
      
      <div className="post-actions">
        <button 
          className={`action-button ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span className="action-icon">👍</span>
          <span>赞</span>
        </button>
        
        <button className="action-button">
          <span className="action-icon">💬</span>
          <span>评论</span>
        </button>
        
        <button className="action-button">
          <span className="action-icon">↗️</span>
          <span>分享</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard; 