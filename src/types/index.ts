// 主题相关类型
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: string;
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

export interface ParticlesConfig {
  particles: {
    number: {
      value: number;
      density: {
        enable: boolean;
        value_area: number;
      };
    };
    color: {
      value: string;
    };
    shape: {
      type: string;
    };
    opacity: {
      value: number;
      random: boolean;
    };
    size: {
      value: number;
      random: boolean;
    };
    line_linked: {
      enable: boolean;
      distance: number;
      color: string;
      opacity: number;
      width: number;
    };
    move: {
      enable: boolean;
      speed: number;
      direction: string;
      random: boolean;
      straight: boolean;
      out_mode: string;
      bounce: boolean;
    };
  };
  interactivity: {
    detect_on: string;
    events: {
      onhover: {
        enable: boolean;
        mode: string;
      };
      onclick: {
        enable: boolean;
        mode: string;
      };
      resize: boolean;
    };
    modes: {
      grab: {
        distance: number;
        line_linked: {
          opacity: number;
        };
      };
      push: {
        particles_nb: number;
      };
    };
  };
  retina_detect: boolean;
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
