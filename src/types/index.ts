// 主题相关类型
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// 表单相关类型
export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface RememberForgotProps {
  rememberChecked: boolean;
  onRememberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onForgotClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface SocialLoginProps {
  onGoogleLogin?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onGithubLogin?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface LoginFormProps {
  onLogin?: (data: LoginFormData) => void;
  onRegister?: () => void;
  onForgotPassword?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onGoogleLogin?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onGithubLogin?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface LoginCardProps {
  children: React.ReactNode;
}

// 粒子背景相关类型
export interface ParticlesBackgroundProps {
  className?: string;
}

// 全局窗口扩展
declare global {
  interface Window {
    particlesJS: any;
    pJSDom: any[];
    __THEME_INITIALIZED__: boolean;
    __CURRENT_THEME__: Theme;
  }
}
