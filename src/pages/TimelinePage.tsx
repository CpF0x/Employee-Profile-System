import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Navbar from '../components/network/Navbar';
import ThemeToggle from '../components/ThemeToggle';
import ParticlesBackground from '../components/ParticlesBackground';
import '../styles/Timeline.css';

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  isLeft?: boolean;
  isActive?: boolean;
}

/**
 * 主题切换按钮Portal组件 - 将其渲染到body级别
 */
const ThemeTogglePortal: React.FC = () => {
  return createPortal(
    <ThemeToggle />,
    document.body
  );
};

/**
 * 页面过渡动画组件
 */
const PageTransition: React.FC = () => {
  return createPortal(
    <div className="page-transition" id="pageTransition"></div>,
    document.body
  );
};

// 时间轴项目组件
const TimelineItem: React.FC<TimelineItemProps> = ({
  year,
  title,
  company,
  description,
  skills,
  isLeft = false,
  isActive = false
}) => {
  return (
    <div className={`timeline-item ${isLeft ? 'left' : 'right'} ${isActive ? 'active' : ''}`}>
      <div className="timeline-badge">
        <span>{year}</span>
      </div>
      <div className="timeline-panel">
        <div className="timeline-header">
          <h3>{title}</h3>
          <h4>{company}</h4>
        </div>
        <div className="timeline-body">
          <p>{description}</p>
          <div className="timeline-skills">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 专业时间轴页面
 */
const TimelinePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // 时间轴数据
  const timelineItems: TimelineItemProps[] = [
    {
      year: '2023',
      title: '高级产品经理',
      company: 'TechCorp',
      description: '领导团队开发新一代AI驱动的产品分析平台，显著提升了客户参与度和留存率。与跨职能团队紧密合作，将产品愿景转化为可执行的路线图。',
      skills: ['产品战略', 'AI集成', '用户研究', '数据分析', 'A/B测试'],
      isLeft: true
    },
    {
      year: '2021',
      title: '产品经理',
      company: 'InnovateTech',
      description: '管理从概念到发布的产品生命周期，打造了提高用户满意度30%的关键功能。建立了数据驱动的产品开发流程，优化了决策制定。',
      skills: ['产品开发', '敏捷方法', '用户故事', '需求分析', '市场研究'],
      isLeft: false
    },
    {
      year: '2019',
      title: '助理产品经理',
      company: 'DigitalSolutions',
      description: '协助主要产品线的特性开发，收集并分析用户反馈以确定改进机会。参与设计冲刺和利益相关者会议，对产品战略产生了积极影响。',
      skills: ['需求收集', '竞争分析', '用户旅程', 'UI/UX设计', '发布管理'],
      isLeft: true
    },
    {
      year: '2017',
      title: '产品分析师',
      company: 'GlobalTech Inc.',
      description: '进行深入的市场研究和竞争分析，为产品团队提供可操作的洞察。创建详细的报告和仪表板，跟踪关键性能指标并识别趋势。',
      skills: ['数据可视化', '市场细分', 'SQL', '产品分析', '用户反馈'],
      isLeft: false
    },
    {
      year: '2015',
      title: '技术顾问',
      company: 'ConsultCore',
      description: '为多个客户项目提供技术解决方案，帮助公司优化其产品开发流程。作为客户与开发团队之间的桥梁，确保项目按时、按预算交付。',
      skills: ['解决方案架构', '项目管理', '客户关系', '技术评估', '敏捷方法'],
      isLeft: true
    }
  ];

  // 处理登出
  const handleLogout = () => {
    navigate('/');
  };

  // 处理滚动事件，更新激活的时间轴项目
  const handleScroll = () => {
    if (!timelineRef.current) return;
    
    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    let activeIndex = null;
    
    timelineItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemTop = rect.top + window.pageYOffset;
      const itemBottom = itemTop + rect.height;
      
      if (scrollPosition >= itemTop && scrollPosition <= itemBottom) {
        activeIndex = index;
      }
    });
    
    setActiveItemIndex(activeIndex);
  };

  useEffect(() => {
    // 设置页面标题
    document.title = '专业经验时间轴';
    
    // 加载外部粒子库脚本
    const loadParticlesScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.async = true;
      document.body.appendChild(script);
    };
    
    // 如果粒子库尚未加载，则加载
    if (!window.particlesJS) {
      loadParticlesScript();
    }

    // 监听滚动事件
    window.addEventListener('scroll', handleScroll);
    // 初始调用一次以设置初始状态
    handleScroll();
    
    return () => {
      // 移除滚动事件监听
      window.removeEventListener('scroll', handleScroll);
      
      // 清理粒子实例
      if (window.pJSDom && window.pJSDom.length) {
        window.pJSDom = [];
      }
    };
  }, []);

  return (
    <div className="timeline-page">
      <ParticlesBackground />
      <Navbar onLogout={handleLogout} />
      
      <div className="container">
        <div className="timeline-header-section">
          <h1>我的专业经验时间轴</h1>
          <p className="timeline-subtitle">探索我的职业发展历程和专业技能成长</p>
        </div>
        
        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-line"></div>
          
          {timelineItems.map((item, index) => (
            <TimelineItem 
              key={index}
              {...item}
              isActive={activeItemIndex === index}
            />
          ))}
          
          <div className="timeline-start">
            <div className="start-badge">
              <span>开始</span>
            </div>
          </div>
          
          <div className="timeline-end">
            <div className="end-badge">
              <span>现在</span>
            </div>
          </div>
        </div>
        
        <div className="timeline-skills-summary">
          <h2>核心技能概览</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3>产品管理</h3>
              <div className="skill-progress">
                <div className="progress-bar" style={{ width: '90%' }}></div>
                <span>专家</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>数据分析</h3>
              <div className="skill-progress">
                <div className="progress-bar" style={{ width: '85%' }}></div>
                <span>高级</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>敏捷方法论</h3>
              <div className="skill-progress">
                <div className="progress-bar" style={{ width: '80%' }}></div>
                <span>高级</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>用户体验设计</h3>
              <div className="skill-progress">
                <div className="progress-bar" style={{ width: '75%' }}></div>
                <span>进阶</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>项目管理</h3>
              <div className="skill-progress">
                <div className="progress-bar" style={{ width: '85%' }}></div>
                <span>高级</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="back-to-profile">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/home')}
          >
            <span>👤</span> 返回个人主页
          </button>
        </div>
      </div>
      
      {/* 页面过渡动画元素 */}
      <PageTransition />
      
      {/* 主题切换按钮 */}
      <ThemeTogglePortal />
    </div>
  );
};

export default TimelinePage; 