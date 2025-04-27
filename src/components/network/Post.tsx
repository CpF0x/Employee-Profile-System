import React from 'react';

interface PostData {
  id: number;
  author: string;
  avatar: string;
  title: string;
  company: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { author, title, company, time, content, likes, comments, shares } = post;

  return (
    <div className="card">
      <div className="post-content">
        <div className="post-header">
          <div className="post-avatar"></div>
          <div className="post-user-info">
            <div className="post-user-name">{author}</div>
            <div className="post-meta">
              <span>{title}</span>
              <span>at {company}</span>
              <span className="post-time">{time}</span>
            </div>
          </div>
        </div>
        <div className="post-text">
          {content}
        </div>
        <div className="post-actions">
          <button className="action-button">
            <span className="action-icon">👍</span>
            <span>点赞 {likes > 0 && `(${likes})`}</span>
          </button>
          <button className="action-button">
            <span className="action-icon">💬</span>
            <span>评论 {comments > 0 && `(${comments})`}</span>
          </button>
          <button className="action-button">
            <span className="action-icon">↗️</span>
            <span>分享 {shares > 0 && `(${shares})`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post; 