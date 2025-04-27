import React, { useState } from 'react';

interface NewPostFormProps {
  onPostSubmit: (postContent: string) => void;
  userAvatar?: string;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ 
  onPostSubmit, 
  userAvatar = '' 
}) => {
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim() === '') return;
    
    onPostSubmit(postContent);
    setPostContent('');
    setIsExpanded(false);
  };
  
  const handleFocus = () => {
    setIsExpanded(true);
  };
  
  const handleCancel = () => {
    setPostContent('');
    setIsExpanded(false);
  };

  return (
    <div className="card new-post-card">
      <form onSubmit={handleSubmit}>
        <div className="post-form-header">
          <div className="user-avatar">
            {userAvatar ? (
              <img src={userAvatar} alt="用户头像" />
            ) : (
              <div className="default-avatar">👤</div>
            )}
          </div>
          <textarea
            placeholder="分享你的想法..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            onFocus={handleFocus}
            rows={isExpanded ? 3 : 1}
            className="post-textarea"
          />
        </div>
        
        {isExpanded && (
          <div className="post-form-actions">
            <div className="post-attachments">
              <button type="button" className="attachment-button">
                <span className="attachment-icon">📷</span>
                <span>图片</span>
              </button>
              <button type="button" className="attachment-button">
                <span className="attachment-icon">🔗</span>
                <span>链接</span>
              </button>
              <button type="button" className="attachment-button">
                <span className="attachment-icon">📄</span>
                <span>文件</span>
              </button>
            </div>
            
            <div className="form-buttons">
              <button 
                type="button" 
                className="cancel-button"
                onClick={handleCancel}
              >
                取消
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={postContent.trim() === ''}
              >
                发布
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewPostForm; 