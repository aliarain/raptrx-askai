export const coreTemplate = `export type ServiceId =
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
  buildUrl: (prompt: string) => string;
}

export const services: Record<ServiceId, AiService> = {
  chatgpt: {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    buildUrl: (prompt) => \`https://chat.openai.com/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  claude: {
    name: 'Claude',
    url: 'https://claude.ai',
    buildUrl: (prompt) => \`https://claude.ai/new?q=\\\${encodeURIComponent(prompt)}\`,
  },
  gemini: {
    name: 'Gemini',
    url: 'https://gemini.google.com',
    buildUrl: (prompt) => \`https://gemini.google.com/app?q=\\\${encodeURIComponent(prompt)}\`,
  },
  grok: {
    name: 'Grok',
    url: 'https://grok.x.ai',
    buildUrl: (prompt) => \`https://grok.x.ai/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  perplexity: {
    name: 'Perplexity',
    url: 'https://perplexity.ai',
    buildUrl: (prompt) => \`https://perplexity.ai/search?q=\\\${encodeURIComponent(prompt)}\`,
  },
  deepseek: {
    name: 'DeepSeek',
    url: 'https://chat.deepseek.com',
    buildUrl: (prompt) => \`https://chat.deepseek.com/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  mistral: {
    name: 'Mistral',
    url: 'https://chat.mistral.ai',
    buildUrl: (prompt) => \`https://chat.mistral.ai/chat?q=\\\${encodeURIComponent(prompt)}\`,
  },
  copilot: {
    name: 'Copilot',
    url: 'https://copilot.microsoft.com',
    buildUrl: (prompt) => \`https://copilot.microsoft.com/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  kagi: {
    name: 'Kagi',
    url: 'https://kagi.com',
    buildUrl: (prompt) => \`https://kagi.com/assistant?q=\\\${encodeURIComponent(prompt)}\`,
  },
  google: {
    name: 'Google AI Studio',
    url: 'https://aistudio.google.com',
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
    const serviceName = services[service]?.name || service;

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
        {children || \`Ask \\\${serviceName}\`}
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
          const serviceName = services[id]?.name || id;
          return (
            <button
              key={id}
              onClick={() => openInAI(id, goal, content)}
              className={buttonClassName}
              style={{
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
              {serviceName}
            </button>
          );
        })}
      </div>
    );
  }
);
AskAiButtonBar.displayName = 'AskAiButtonBar';
`;
