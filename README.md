# 专业简历网站

本项目是一个现代化的个人简历/作品集网站，包含登录页面、主页、专业经验时间轴等功能，采用React + TypeScript开发。

## 应用分析报告

### 应用概述
该应用是一个个人简历/作品集网站，主要功能包括专业经验时间轴页面。用户可以查看、添加、编辑和删除职业经历，这些经历按时间顺序（从新到旧）排列在可视化时间轴上。

### 技术栈
- 前端框架：React
- 路由：React Router
- UI：自定义CSS（Timeline.css）
- 动画：粒子背景动画（ParticlesBackground组件）
- 存储：LocalStorage用于数据持久化

### 关键组件

#### 1. TimelinePage
主要页面组件，负责管理整个时间轴的显示和交互逻辑。

#### 2. TimelineItem
显示单个职业经历的组件，包含年份、职位、公司、描述和技能标签。支持左右交替布局和激活状态。

#### 3. ThemeTogglePortal
使用React Portal实现的主题切换组件，渲染到body级别。

#### 4. ParticlesBackground
实现页面背景的粒子动画效果。

### 主要功能

#### 1. 时间轴数据管理
- 默认提供5个职业经历样例
- 使用LocalStorage持久化存储数据
- 支持按年份从新到旧排序

#### 2. 交互功能
- 添加新经历
- 编辑现有经历
- 删除经历
- 设置经历显示在左侧还是右侧
- 滚动时高亮当前查看的经历项

#### 3. 表单操作
- 编辑模式使用模态窗口
- 支持输入年份、职位、公司、描述
- 技能标签使用逗号分隔输入

#### 4. 页面导航
- 导航回主页功能
- 退出登录功能
- 使用自定义动画导航钩子

#### 5. 滚动管理
- 复杂的滚动状态管理机制
- 防抖处理的滚动事件
- 多层保障确保滚动功能正常工作

### UI设计
- 时间轴使用中央线条连接各个经历项
- 左右交替布局增强可读性
- 技能标签使用标签云展示
- 页面底部展示核心技能概览和评级
- 自适应设计

### 特殊处理
- 细致的滚动状态管理和修复机制
- 模态窗口打开时禁用背景滚动
- 页面加载和卸载时的状态清理

### 数据结构
时间轴项目使用以下接口结构：
```typescript
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
```

### 性能优化
- 使用debounce函数优化滚动事件处理
- 仅在必要时更新DOM
- useCallback和useRef钩子优化渲染效率

### 辅助功能
- 主题切换支持（通过ThemeToggle组件）
- 可访问的UI设计
- 焦点状态管理

## 代码库结构说明文档

### 1. 文件/目录路径

#### 根目录结构
- `/src` - 源代码主目录
- `/public` - 静态资源文件
- `/node_modules` - 项目依赖
- `/tsconfig.json` - TypeScript配置
- `/vite.config.ts` - Vite构建工具配置
- `/tailwind.config.js` - Tailwind CSS配置

#### 源代码结构
- `/src/components` - 可复用UI组件
- `/src/pages` - 页面级组件
- `/src/hooks` - 自定义React钩子
- `/src/styles` - CSS样式文件
- `/src/context` - React上下文管理
- `/src/utils` - 实用工具函数
- `/src/transitions` - 过渡动画相关组件
- `/src/types` - TypeScript类型定义

### 2. 主要功能和作用

#### 核心文件
- `/src/main.tsx` - 应用入口点，启动React应用
- `/src/App.tsx` - 应用主组件，定义路由结构
- `/src/particles.js` - 粒子动画配置

#### 页面组件
- `/src/pages/LoginPage.tsx` - 登录页面
- `/src/pages/NetworkPage.tsx` - 专业社交网络页面
- `/src/pages/TimelinePage.tsx` - 专业经验时间轴页面
- `/src/pages/ThemeDemo.tsx` - 主题演示页面

#### 关键组件
- `/src/components/ParticlesBackground.tsx` - 粒子背景效果组件
- `/src/components/ThemeToggle.tsx` - 主题切换组件
- `/src/components/LoginCard.tsx` - 登录卡片组件
- `/src/components/network/` - 网络相关组件

#### 样式文件
- `/src/styles/Timeline.css` - 时间轴页面样式
- `/src/styles/Login.css` - 登录页面样式
- `/src/styles/Network.css` - 社交网络页面样式
- `/src/styles/theme.css` - 主题相关样式

#### 自定义钩子
- `/src/hooks/useAnimatedNavigation.ts` - 页面导航动画钩子
- `/src/hooks/useThemeNotification.ts` - 主题通知钩子
- `/src/hooks/useForm.ts` - 表单处理钩子

### 3. 与其他文件的关键关系

#### 导航与路由
- `App.tsx` 定义路由表，链接各页面组件
- 页面组件通过 `useAnimatedNavigation` 钩子实现页面间平滑过渡

#### 主题系统
- `ThemeToggle.tsx` 提供主题切换功能
- `theme.css` 定义不同主题的样式变量
- 页面组件通过 Portal 技术渲染主题切换器

#### 组件复用
- `ParticlesBackground.tsx` 被多个页面共用作为背景效果
- 页面组件通过 props 将状态和回调传递给子组件

#### 数据持久化
- `TimelinePage.tsx` 使用 LocalStorage 存储时间轴数据
- 登录状态可能通过 Context API 在组件树间共享

### 4. 重要类/函数/组件的简要说明

#### 页面组件
- `TimelinePage` - 管理专业经验时间轴，支持CRUD操作和滚动交互
- `LoginPage` - 处理用户登录，包含表单验证和动画效果
- `NetworkPage` - 展示专业社交网络界面

#### UI组件
- `TimelineItem` - 渲染单个时间轴项目，支持左右布局和激活状态
- `ParticlesBackground` - 创建交互式粒子背景效果
- `ThemeToggle` - 切换深色/浅色主题

#### 自定义钩子
- `useAnimatedNavigation` - 封装带动画效果的导航逻辑，确保页面过渡平滑
- `useThemeNotification` - 管理主题切换相关的通知
- `useForm` - 处理表单状态、验证和提交

#### 实用函数
- `debounce` - 优化高频事件处理（如滚动事件）
- `resetScrollState` - 修复滚动状态的功能函数

#### 动画与过渡
- 粒子背景使用 `particles.js` 库实现
- 页面过渡使用自定义CSS动画结合React组件生命周期

## 安装与运行

### 环境要求
- Node.js (14.0.0+)
- npm或yarn

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 开发模式运行
```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

## 特性与亮点

1. **交互式粒子背景** - 创造沉浸式用户体验
2. **专业时间轴** - 可视化展示职业经历
3. **主题切换** - 支持深色/浅色模式切换
4. **动画过渡** - 页面间平滑过渡效果
5. **响应式设计** - 适配各种设备尺寸

## 贡献指南

欢迎提交问题报告和改进建议！如需贡献代码，请遵循以下步骤：
1. Fork本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启Pull Request 