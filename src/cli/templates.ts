export const coreTemplate = `import * as React from 'react';

export type ServiceId =
  | 'chatgpt'
  | 'claude'
  | 'gemini'
  | 'grok'
  | 'perplexity'
  | 'deepseek'
  | 'mistral'
  | 'copilot'
  | 'kagi'
  | 'google';

export interface AiService {
  name: string;
  url: string;
  icon?: React.ReactNode;
  buildUrl: (prompt: string) => string;
}

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const services: Record<ServiceId, AiService> = {
  chatgpt: {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    icon: <IconWrapper><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></IconWrapper>,
    buildUrl: (prompt) => \`https://chat.openai.com/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  claude: {
    name: 'Claude',
    url: 'https://claude.ai',
    icon: <IconWrapper><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></IconWrapper>,
    buildUrl: (prompt) => \`https://claude.ai/new?q=\\\${encodeURIComponent(prompt)}\`,
  },
  gemini: {
    name: 'Gemini',
    url: 'https://gemini.google.com',
    icon: <IconWrapper><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></IconWrapper>,
    buildUrl: (prompt) => \`https://gemini.google.com/app?q=\\\${encodeURIComponent(prompt)}\`,
  },
  grok: {
    name: 'Grok',
    url: 'https://grok.x.ai',
    icon: <IconWrapper><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></IconWrapper>,
    buildUrl: (prompt) => \`https://grok.x.ai/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  perplexity: {
    name: 'Perplexity',
    url: 'https://perplexity.ai',
    icon: <IconWrapper><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></IconWrapper>,
    buildUrl: (prompt) => \`https://perplexity.ai/search?q=\\\${encodeURIComponent(prompt)}\`,
  },
  deepseek: {
    name: 'DeepSeek',
    url: 'https://chat.deepseek.com',
    icon: <IconWrapper><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></IconWrapper>,
    buildUrl: (prompt) => \`https://chat.deepseek.com/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  mistral: {
    name: 'Mistral',
    url: 'https://chat.mistral.ai',
    icon: <IconWrapper><path d="M17.7 7.7a2.5 2.5 0 1 1-1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></IconWrapper>,
    buildUrl: (prompt) => \`https://chat.mistral.ai/chat?q=\\\${encodeURIComponent(prompt)}\`,
  },
  copilot: {
    name: 'Copilot',
    url: 'https://copilot.microsoft.com',
    icon: <IconWrapper><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></IconWrapper>,
    buildUrl: (prompt) => \`https://copilot.microsoft.com/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  kagi: {
    name: 'Kagi',
    url: 'https://kagi.com',
    icon: <IconWrapper><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></IconWrapper>,
    buildUrl: (prompt) => \`https://kagi.com/assistant?q=\\\${encodeURIComponent(prompt)}\`,
  },
  google: {
    name: 'Google AI Studio',
    url: 'https://aistudio.google.com',
    icon: <IconWrapper><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></IconWrapper>,
    buildUrl: (prompt) => \`https://aistudio.google.com/app/prompts?q=\\\${encodeURIComponent(prompt)}\`,
  },
};

/**
 * Ensures the URL is not too long to prevent 414 URI Too Long errors.
 * Most browsers limit URLs to ~2000-8000 chars. We use 2000 to be safe.
 */
function truncatePrompt(prompt: string, maxLength: number = 2000): string {
  if (prompt.length > maxLength) {
    return prompt.slice(0, maxLength - 3) + '...';
  }
  return prompt;
}

export function buildPromptUrl(service: ServiceId, goal: string, content: string): string {
  const fullPrompt = \`\\\${goal}\\\\n\\\\n\\\${content}\`;
  const truncated = truncatePrompt(fullPrompt);
  return services[service].buildUrl(truncated);
}

export function openInAI(service: ServiceId, goal: string, content: string): void {
  const url = buildPromptUrl(service, goal, content);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function getAllServices(): ServiceId[] {
  return Object.keys(services) as ServiceId[];
}
`;

export const buttonTemplate = `'use client';

import * as React from 'react';
import { services, openInAI, type ServiceId } from './core';

export interface AskAikButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  service?: ServiceId;
  goal?: string;
  content: string;
}

// These defaults can be injected by the CLI tool during init
export const DEFAULT_SERVICE: ServiceId = 'chatgpt';
export const DEFAULT_GOAL: string = 'Explain this code';

export const AskAiButton = React.forwardRef<HTMLButtonElement, AskAikButtonProps>(
  ({ className, service = DEFAULT_SERVICE, goal = DEFAULT_GOAL, content, children, ...props }, ref) => {
    const serviceDetails = services[service];
    const serviceName = serviceDetails?.name || service;
    const Icon = serviceDetails?.icon;

    return (
      <button
        ref={ref}
        onClick={(e) => {
          openInAI(service, goal, content);
          props.onClick?.(e);
        }}
        className={className}
        {...props}
      >
        {children || (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            {Icon}
            <span>Ask {serviceName}</span>
          </span>
        )}
      </button>
    );
  }
);
AskAiButton.displayName = 'AskAiButton';
`;

export const buttonBarTemplate = `'use client';

import * as React from 'react';
import { services, openInAI, getAllServices, type ServiceId } from './core';

export interface AskAiButtonBarProps extends React.HTMLAttributes<HTMLDivElement> {
  goal?: string;
  content: string;
  services?: ServiceId[] | 'all';
  buttonClassName?: string;
  direction?: 'row' | 'column';
  gap?: number;
}

export const DEFAULT_GOAL: string = 'Explain this code';

export const AskAiButtonBar = React.forwardRef<HTMLDivElement, AskAiButtonBarProps>(
  ({ 
    className, 
    buttonClassName, 
    goal = DEFAULT_GOAL, 
    content, 
    services: selectedServices = ['chatgpt', 'claude', 'gemini'],
    direction = 'row',
    gap = 8,
    ...props 
  }, ref) => {
    const serviceList = selectedServices === 'all' ? getAllServices() : selectedServices;

    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: 'flex',
          flexDirection: direction,
          gap,
          flexWrap: 'wrap',
          ...props.style
        }}
        {...props}
      >
        {serviceList.map((id) => {
          const serviceDetails = services[id];
          const serviceName = serviceDetails?.name || id;
          const Icon = serviceDetails?.icon;
          
          return (
            <button
              key={id}
              onClick={() => openInAI(id, goal, content)}
              className={buttonClassName}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                background: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9fafb';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              {Icon}
              <span>{serviceName}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
AskAiButtonBar.displayName = 'AskAiButtonBar';
`;
