import type { AiService, ServiceConfig } from './types';

/**
 * Default AI service configurations
 */
const defaultServices: Record<string, ServiceConfig> = {
  chatgpt: {
    name: 'ChatGPT',
    baseUrl: 'https://chatgpt.com/',
    promptParam: 'q',
    method: 'query',
    maxLength: 32000,
    icon: 'chatgpt',
    color: '#10a37f',
  },
  claude: {
    name: 'Claude',
    baseUrl: 'https://claude.ai/new',
    promptParam: 'q',
    method: 'query',
    maxLength: 100000,
    icon: 'claude',
    color: '#cc9b7a',
  },
  gemini: {
    name: 'Gemini',
    baseUrl: 'https://gemini.google.com/app',
    promptParam: 'q',
    method: 'query',
    maxLength: 30000,
    icon: 'gemini',
    color: '#8e44ad',
  },
  grok: {
    name: 'Grok',
    baseUrl: 'https://grok.com/',
    promptParam: 'q',
    method: 'query',
    maxLength: 25000,
    icon: 'grok',
    color: '#000000',
  },
  perplexity: {
    name: 'Perplexity',
    baseUrl: 'https://www.perplexity.ai/search',
    promptParam: 'q',
    method: 'query',
    maxLength: 32000,
    icon: 'perplexity',
    color: '#20b2aa',
  },
  google: {
    name: 'Google AI',
    baseUrl: 'https://aistudio.google.com/prompts/new_chat',
    promptParam: 'q',
    method: 'query',
    maxLength: 30000,
    icon: 'google',
    color: '#4285f4',
  },
  kagi: {
    name: 'Kagi',
    baseUrl: 'https://kagi.com/assistant',
    promptParam: 'q',
    method: 'query',
    maxLength: 25000,
    icon: 'kagi',
    color: '#ffb319',
  },
  deepseek: {
    name: 'DeepSeek',
    baseUrl: 'https://chat.deepseek.com/',
    promptParam: 'q',
    method: 'query',
    maxLength: 32000,
    icon: 'deepseek',
    color: '#4d6bfe',
  },
  mistral: {
    name: 'Mistral',
    baseUrl: 'https://chat.mistral.ai/chat',
    promptParam: 'q',
    method: 'query',
    maxLength: 32000,
    icon: 'mistral',
    color: '#ff7000',
  },
  copilot: {
    name: 'Copilot',
    baseUrl: 'https://copilot.microsoft.com/',
    promptParam: 'q',
    method: 'query',
    maxLength: 16000,
    icon: 'copilot',
    color: '#0078d4',
  },
};

/**
 * Service registry - mutable copy of services
 */
let services: Record<string, ServiceConfig> = { ...defaultServices };

/**
 * Get a service configuration by ID
 */
export function getService(service: AiService): ServiceConfig | undefined {
  return services[service.toLowerCase()];
}

/**
 * Get all registered services
 */
export function getServices(): Record<string, ServiceConfig> {
  return { ...services };
}

/**
 * Get list of all service IDs
 */
export function getServiceIds(): AiService[] {
  return Object.keys(services) as AiService[];
}

/**
 * Add or update a custom service
 * @example
 * addService('myai', {
 *   name: 'My AI',
 *   baseUrl: 'https://myai.com/chat',
 *   promptParam: 'prompt',
 *   color: '#ff0000'
 * });
 */
export function addService(id: string, config: ServiceConfig): void {
  services[id.toLowerCase()] = {
    method: 'query',
    maxLength: 32000,
    ...config,
  };
}

/**
 * Remove a service from the registry
 */
export function removeService(id: string): boolean {
  const key = id.toLowerCase();
  if (services[key]) {
    delete services[key];
    return true;
  }
  return false;
}

/**
 * Reset services to defaults
 */
export function resetServices(): void {
  services = { ...defaultServices };
}

/**
 * Check if a service exists
 */
export function hasService(id: string): boolean {
  return id.toLowerCase() in services;
}

/**
 * Default services to show when 'all' is specified
 */
export const DEFAULT_SERVICES: AiService[] = [
  'chatgpt',
  'claude',
  'gemini',
  'perplexity',
  'grok',
];
