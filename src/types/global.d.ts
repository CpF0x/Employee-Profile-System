import { ParticlesConfig } from './index';

declare global {
  interface Window {
    particlesJS: (id: string, config: ParticlesConfig) => void;
    pJSDom: any[];
    __THEME_INITIALIZED__?: boolean;
    __CURRENT_THEME__?: string;
  }
} 