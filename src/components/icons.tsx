import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// OpenAI / ChatGPT official logo
export const ChatGPTIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

// Claude / Anthropic
export const ClaudeIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M4.709 15.955l4.72-2.647.08-.08v-.08l-.08-.08-2.093-1.04c-.053-.026-.053-.053 0-.08l2.093-1.093.08-.054v-.08l-.08-.053-4.72-2.7c-.053-.027-.106 0-.106.053v7.88c0 .054.053.08.106.054zm6.373-5.721l5.32-3.074c.08-.053.08-.133 0-.16l-3.827-2.16c-.053-.027-.133-.027-.16 0L7.122 8.008c-.053.053-.053.106 0 .16l3.853 2.066c.054.027.08.027.107 0zm5.32 1.52l-5.32-3.074c-.027-.026-.053-.026-.107 0l-3.853 2.12c-.053.027-.053.107 0 .134l3.853 2.093c.027.027.08.027.107 0l5.32-3.12c.08-.027.08-.107 0-.133v-.02zm-5.213 3.72l-4.72 2.673c-.053.027-.106 0-.106-.053V10.24c0-.053.053-.08.106-.053l4.72 2.7c.027.026.053.026.08 0l.08-.08v-.054c0-.026-.027-.053-.08-.08l-2.093-1.093c-.053-.026-.053-.053 0-.08l2.093-1.066c.053-.027.08-.054.08-.08v-.054l-.08-.08c-.027-.026-.053-.026-.08 0l-4.72 2.647c-.053.026-.106 0-.106-.054v-2.24c0-.053.053-.106.106-.08l7.387 4.214c.053.026.053.106 0 .133l-2.56 1.467c-.027.026-.054.026-.107 0v-.027z"/>
  </svg>
);

// Google Gemini
export const GeminiIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12"/>
  </svg>
);

// X / Grok
export const GrokIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Perplexity
export const PerplexityIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 1L4 5v6.5L1 13v5l3 1.5V22l8-4 8 4v-2.5l3-1.5v-5l-3-1.5V5l-8-4zm0 2.236L17.5 6v4.882L12 13.764 6.5 10.882V6L12 3.236zM5 12.118l5 2.5v4.764l-5-2.5v-4.764zm14 0v4.764l-5 2.5v-4.764l5-2.5z"/>
  </svg>
);

// DeepSeek
export const DeepSeekIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3 3h6v2H9V8zm-2 4h10v2H7v-2zm2 4h6v2H9v-2z"/>
  </svg>
);

// Mistral
export const MistralIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M3 3h4v4H3V3zm7 0h4v4h-4V3zm7 0h4v4h-4V3zM3 10h4v4H3v-4zm7 0h4v4h-4v-4zm7 0h4v4h-4v-4zM3 17h4v4H3v-4zm7 0h4v4h-4v-4zm7 0h4v4h-4v-4z"/>
  </svg>
);

// Microsoft Copilot
export const CopilotIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5c1.24 0 2.36.5 3.17 1.32l-1.29 1.29A2.987 2.987 0 0 0 10.5 9.5c-1.66 0-3 1.34-3 3s1.34 3 3 3c1.3 0 2.41-.84 2.83-2h-2.83v-1.5h4.5c.04.26.07.51.07.77 0 2.48-1.77 4.73-4.57 4.73zm6.35-4.5h-1.7v1.7h-1.3v-1.7h-1.7v-1.3h1.7v-1.7h1.3v1.7h1.7v1.3z"/>
  </svg>
);

// Kagi
export const KagiIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.5 3.75L12 11.68 4.5 7.93 12 4.18zM4 9.07l7 3.5v7.36l-7-3.5V9.07zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"/>
  </svg>
);

// Google AI Studio
export const GoogleIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// Default AI icon
export const DefaultIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5z"/>
  </svg>
);

export const icons: Record<string, React.FC<IconProps>> = {
  chatgpt: ChatGPTIcon,
  claude: ClaudeIcon,
  gemini: GeminiIcon,
  grok: GrokIcon,
  perplexity: PerplexityIcon,
  deepseek: DeepSeekIcon,
  mistral: MistralIcon,
  copilot: CopilotIcon,
  kagi: KagiIcon,
  google: GoogleIcon,
  default: DefaultIcon,
};

export function getIcon(service: string): React.FC<IconProps> {
  return icons[service.toLowerCase()] || icons.default;
}
