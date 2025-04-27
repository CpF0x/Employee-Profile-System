import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Navbar from '../components/network/Navbar';
import ThemeToggle from '../components/ThemeToggle';
import ParticlesBackground from '../components/ParticlesBackground';
import { useAnimatedNavigation } from '../hooks/useAnimatedNavigation';
import '../styles/Timeline.css';

interface TimelineItemProps {
  id: string;
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

// 创建一个简单的debounce函数
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// 时间轴项目组件
const TimelineItem: React.FC<TimelineItemProps & {
  onEdit: (item: TimelineItemProps) => void;
}> = ({
  id,
  year,
  title,
  company,
  description,
  skills,
  isLeft = false,
  isActive = false,
  onEdit
}) => {
  return (
    <div className={`timeline-item ${isLeft ? 'left' : 'right'} ${isActive ? 'active' : ''}`}>
      <div className="timeline-badge">
        <span>{year}</span>
      </div>
      <div className="timeline-panel">
        <button className="timeline-edit-button" onClick={() => onEdit({id, year, title, company, description, skills, isLeft, isActive})}>✏️</button>
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
  const { animatedNavigate } = useAnimatedNavigation();
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const initialScrollApplied = useRef<boolean>(false);
  const [pageFullyLoaded, setPageFullyLoaded] = useState<boolean>(false);
  
  // 时间轴数据转为状态 - 添加LocalStorage持久化
  const [timelineItems, setTimelineItems] = useState<TimelineItemProps[]>(() => {
    // 从LocalStorage加载数据，如果没有则使用默认值
    const savedItems = localStorage.getItem('timelineItems');
    return savedItems ? JSON.parse(savedItems) : [
      {
        id: '1',
        year: '2023',
        title: '高级产品经理',
        company: 'TechCorp',
        description: '领导团队开发新一代AI驱动的产品分析平台，显著提升了客户参与度和留存率。与跨职能团队紧密合作，将产品愿景转化为可执行的路线图。',
        skills: ['产品战略', 'AI集成', '用户研究', '数据分析', 'A/B测试'],
        isLeft: true
      },
      {
        id: '2',
        year: '2021',
        title: '产品经理',
        company: 'InnovateTech',
        description: '管理从概念到发布的产品生命周期，打造了提高用户满意度30%的关键功能。建立了数据驱动的产品开发流程，优化了决策制定。',
        skills: ['产品开发', '敏捷方法', '用户故事', '需求分析', '市场研究'],
        isLeft: false
      },
      {
        id: '3',
        year: '2019',
        title: '助理产品经理',
        company: 'DigitalSolutions',
        description: '协助主要产品线的特性开发，收集并分析用户反馈以确定改进机会。参与设计冲刺和利益相关者会议，对产品战略产生了积极影响。',
        skills: ['需求收集', '竞争分析', '用户旅程', 'UI/UX设计', '发布管理'],
        isLeft: true
      },
      {
        id: '4',
        year: '2017',
        title: '产品分析师',
        company: 'GlobalTech Inc.',
        description: '进行深入的市场研究和竞争分析，为产品团队提供可操作的洞察。创建详细的报告和仪表板，跟踪关键性能指标并识别趋势。',
        skills: ['数据可视化', '市场细分', 'SQL', '产品分析', '用户反馈'],
        isLeft: false
      },
      {
        id: '5',
        year: '2015',
        title: '技术顾问',
        company: 'ConsultCore',
        description: '为多个客户项目提供技术解决方案，帮助公司优化其产品开发流程。作为客户与开发团队之间的桥梁，确保项目按时、按预算交付。',
        skills: ['解决方案架构', '项目管理', '客户关系', '技术评估', '敏捷方法'],
        isLeft: true
      }
    ];
  });

  // 保存Timeline数据到LocalStorage的副作用
  useEffect(() => {
    localStorage.setItem('timelineItems', JSON.stringify(timelineItems));
  }, [timelineItems]);

  // 编辑状态管理
  const [isTimelineEditing, setIsTimelineEditing] = useState(false);
  const [editingTimelineItem, setEditingTimelineItem] = useState<TimelineItemProps | null>(null);

  // 重置滚动位置的函数
  const resetScrollPosition = useCallback(() => {
    // 重置滚动位置到页面顶部
    window.scrollTo(0, 0);
    initialScrollApplied.current = true;
  }, []);

  // 强化版重置滚动状态的函数
  const resetScrollState = useCallback(() => {
    // 确保滚动状态恢复正常
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.bottom = '';
    document.body.style.overflow = '';
    document.body.style.overflowY = 'auto';
    document.body.style.overflowX = 'auto';
    document.body.style.maxHeight = '';
    document.body.style.height = '';
    
    document.documentElement.style.overflow = '';
    document.documentElement.style.overflowY = 'auto';
    document.documentElement.style.overflowX = 'auto';
    document.documentElement.style.maxHeight = '';
    document.documentElement.style.height = '';
    
    // 尝试释放其他可能限制滚动的CSS属性
    const html = document.documentElement;
    const body = document.body;

    // 移除可能影响滚动的类
    html.classList.remove('no-scroll');
    body.classList.remove('no-scroll');

    // 延迟重置滚动位置，确保样式变更已应用
    setTimeout(resetScrollPosition, 10);
  }, [resetScrollPosition]);

  // 处理时间轴项目编辑
  const handleTimelineEdit = (item: TimelineItemProps) => {
    setEditingTimelineItem({...item});
    setIsTimelineEditing(true);
    // 禁用背景滚动
    document.body.style.overflow = 'hidden';
  };

  // 添加新的时间轴项目
  const handleTimelineAdd = () => {
    const newItem: TimelineItemProps = {
      id: Date.now().toString(),
      year: '',
      title: '',
      company: '',
      description: '',
      skills: [],
      isLeft: timelineItems.length % 2 === 0 // 左右交替
    };
    setEditingTimelineItem(newItem);
    setIsTimelineEditing(true);
    // 禁用背景滚动
    document.body.style.overflow = 'hidden';
  };

  // 处理时间轴项目输入变化
  const handleTimelineInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEditingTimelineItem(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [id]: value
      };
    });
  };

  // 处理技能输入变化
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    setEditingTimelineItem(prev => {
      if (!prev) return null;
      return {
        ...prev,
        skills
      };
    });
  };

  // 保存时间轴项目
  const handleTimelineSave = () => {
    if (!editingTimelineItem) return;
    
    const index = timelineItems.findIndex(item => item.id === editingTimelineItem.id);
    
    let newTimelineItems;
    if (index >= 0) {
      // 更新现有项
      newTimelineItems = [...timelineItems];
      newTimelineItems[index] = editingTimelineItem;
    } else {
      // 添加新项
      newTimelineItems = [...timelineItems, editingTimelineItem];
    }
    
    // 按年份从新到旧排序
    newTimelineItems.sort((a, b) => {
      // 解析年份为数字进行比较
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA; // 降序排列，从新到旧
    });
    
    setTimelineItems(newTimelineItems);
    setIsTimelineEditing(false);
    setEditingTimelineItem(null);
    // 恢复背景滚动
    resetScrollState();
  };

  // 取消时间轴项目编辑
  const handleTimelineCancel = () => {
    setIsTimelineEditing(false);
    setEditingTimelineItem(null);
    // 恢复背景滚动
    resetScrollState();
  };

  // 删除时间轴项目
  const handleTimelineDelete = (id: string) => {
    setTimelineItems(timelineItems.filter(item => item.id !== id));
    setIsTimelineEditing(false);
    setEditingTimelineItem(null);
    // 恢复背景滚动
    resetScrollState();
  };

  // 处理登出
  const handleLogout = () => {
    animatedNavigate('/');
  };

  // 处理滚动事件，更新激活的时间轴项目
  const handleScroll = useCallback(() => {
    if (!timelineRef.current) return;
    
    // 确保滚动状态正常
    if ((document.body.style.overflow === 'hidden' || 
         document.documentElement.style.overflow === 'hidden') && 
        !isTimelineEditing) {
      resetScrollState();
    }
    
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
  }, [isTimelineEditing, resetScrollState]);

  // 防抖处理的滚动事件
  const debouncedHandleScroll = useCallback(debounce(handleScroll, 50), [handleScroll]);

  // 检查页面滚动状态
  const checkScrollability = useCallback(() => {
    // 将当前滚动位置保存
    const currentScroll = window.scrollY;
    
    // 尝试向上滚动一点
    window.scrollBy(0, -10);
    
    // 如果滚动位置没有变化，可能存在向上滚动限制
    if (currentScroll === window.scrollY && currentScroll > 0) {
      console.log('发现向上滚动限制，尝试修复...');
      resetScrollState();
      // 强制尝试滚动到顶部
      window.scrollTo({top: 0, behavior: 'auto'});
    }
    
    // 恢复原始滚动位置
    window.scrollTo(0, currentScroll);
  }, [resetScrollState]);

  // 初始化页面和监听事件
  useEffect(() => {
    // 设置页面标题
    document.title = '专业经验时间轴';
    
    // 确保页面加载时滚动功能正常
    resetScrollState();
    
    // 强制滚动到顶部
    resetScrollPosition();
    
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
    window.addEventListener('scroll', debouncedHandleScroll);
    
    // 初始调用一次以设置初始状态
    handleScroll();
    
    // 添加beforeunload事件，确保页面刷新前恢复滚动状态
    const handleBeforeUnload = () => {
      resetScrollState();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // 添加load事件，确保DOM完全加载后再次检查滚动状态
    const handleLoad = () => {
      setPageFullyLoaded(true);
      // 确保页面可以正常滚动
      resetScrollState();
      // 检查滚动能力
      setTimeout(checkScrollability, 500);
    };
    window.addEventListener('load', handleLoad);
    
    // 定期检查滚动状态的安全措施
    const scrollCheckInterval = setInterval(() => {
      checkScrollability();
    }, 2000);
    
    // 如果页面已加载，立即检查滚动状态
    if (document.readyState === 'complete') {
      handleLoad();
    }
    
    return () => {
      // 移除滚动事件监听
      window.removeEventListener('scroll', debouncedHandleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
      
      // 清除定期检查
      clearInterval(scrollCheckInterval);
      
      // 确保组件卸载时恢复滚动状态
      resetScrollState();
      
      // 清理粒子实例
      if (window.pJSDom && window.pJSDom.length) {
        window.pJSDom = [];
      }
    };
  }, [resetScrollState, resetScrollPosition, handleScroll, debouncedHandleScroll, checkScrollability]);

  // 页面完全加载后的额外检查
  useEffect(() => {
    if (pageFullyLoaded) {
      // 页面完全加载后，确保滚动状态正常
      resetScrollState();
      
      // 等待一段时间后再次检查滚动状态
      setTimeout(() => {
        checkScrollability();
        // 强制滚动到顶部
        resetScrollPosition();
      }, 1000);
    }
  }, [pageFullyLoaded, resetScrollState, checkScrollability, resetScrollPosition]);

  return (
    <div className="timeline-page">
      <ParticlesBackground />
      <Navbar onLogout={handleLogout} />
      
      <div className="container">
        <div className="timeline-header-section">
          <h1>我的专业经验时间轴</h1>
          <p className="timeline-subtitle">探索我的职业发展历程和专业技能成长</p>
          <button className="add-timeline-item" onClick={handleTimelineAdd}>
            添加经历
          </button>
        </div>
        
        {isTimelineEditing && editingTimelineItem && (
          <div className="timeline-edit-modal">
            <div className="timeline-edit-form">
              <h2>{editingTimelineItem.id && timelineItems.some(item => item.id === editingTimelineItem.id) ? '编辑经历' : '添加经历'}</h2>
              
              <div className="form-group">
                <label htmlFor="year">年份</label>
                <input
                  type="text"
                  id="year"
                  value={editingTimelineItem.year}
                  onChange={handleTimelineInputChange}
                  placeholder="例如: 2023"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="title">职位</label>
                <input
                  type="text"
                  id="title"
                  value={editingTimelineItem.title}
                  onChange={handleTimelineInputChange}
                  placeholder="例如: 高级产品经理"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">公司</label>
                <input
                  type="text"
                  id="company"
                  value={editingTimelineItem.company}
                  onChange={handleTimelineInputChange}
                  placeholder="例如: TechCorp"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">职责描述</label>
                <textarea
                  id="description"
                  value={editingTimelineItem.description}
                  onChange={handleTimelineInputChange}
                  placeholder="描述你的职责和成就"
                  rows={4}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="skills">技能(用逗号分隔)</label>
                <input
                  type="text"
                  id="skills"
                  value={editingTimelineItem.skills.join(', ')}
                  onChange={handleSkillsChange}
                  placeholder="例如: 产品战略, 用户研究, 数据分析"
                />
              </div>
              
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={editingTimelineItem.isLeft}
                    onChange={(e) => setEditingTimelineItem({
                      ...editingTimelineItem,
                      isLeft: e.target.checked
                    })}
                  />
                  显示在左侧
                </label>
              </div>
              
              <div className="edit-buttons">
                <button className="btn btn-primary" onClick={handleTimelineSave}>保存</button>
                <button className="btn btn-secondary" onClick={handleTimelineCancel}>取消</button>
                {editingTimelineItem.id && timelineItems.some(item => item.id === editingTimelineItem.id) && (
                  <button className="btn btn-danger" onClick={() => handleTimelineDelete(editingTimelineItem.id)}>删除</button>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-line"></div>
          
          {timelineItems.map((item, index) => (
            <TimelineItem 
              key={item.id}
              {...item}
              isActive={activeItemIndex === index}
              onEdit={handleTimelineEdit}
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
            onClick={() => animatedNavigate('/home')}
          >
            <span>👤</span> 返回个人主页
          </button>
        </div>
      </div>
      
      <ThemeTogglePortal />
    </div>
  );
};

export default TimelinePage; 