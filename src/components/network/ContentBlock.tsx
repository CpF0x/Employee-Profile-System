import React, { ReactNode } from 'react';

interface ContentBlockProps {
  title: string;
  children: ReactNode;
  actionButton?: {
    text: string;
    onClick: () => void;
    icon?: string;
  };
  className?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  children,
  actionButton,
  className = ''
}) => {
  return (
    <div className={`content-block ${className}`}>
      <div className="content-block-header">
        <h2 className="content-block-title">{title}</h2>
        {actionButton && (
          <button 
            className="content-block-action" 
            onClick={actionButton.onClick}
          >
            {actionButton.icon && <span className="action-icon">{actionButton.icon}</span>}
            {actionButton.text}
          </button>
        )}
      </div>
      <div className="content-block-body">
        {children}
      </div>
    </div>
  );
};

export default ContentBlock; 