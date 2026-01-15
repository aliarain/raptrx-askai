import type { AiService, CreatePromptOptions, PromptContent, PromptResult } from './types';
import { getService, getServiceIds, DEFAULT_SERVICES } from './services';

/**
 * Detect if content looks like code
 */
function isCodeContent(content: string): boolean {
  const codeIndicators = [
    /^(import|export|const|let|var|function|class|interface|type)\s/m,
    /[{}\[\]();]=>/,
    /^\s*(def|class|import|from|if __name__)/m,
    /<\/?[a-z][\s\S]*>/i,
  ];
  return codeIndicators.some((pattern) => pattern.test(content));
}

/**
 * Format content based on type
 */
function formatContent(
  content: PromptContent,
  format?: 'text' | 'code' | 'markdown'
): string {
  if (typeof content === 'string') {
    if (format === 'code' || (!format && isCodeContent(content))) {
      return '```\n' + content + '\n```';
    }
    return content;
  }

  if ('text' in content && typeof content.text === 'string') {
    const lang = content.language || '';
    return '```' + lang + '\n' + content.text + '\n```';
  }

  return JSON.stringify(content, null, 2);
}

/**
 * Build the full prompt string
 */
function buildPromptString(goal: string, content: PromptContent, options?: CreatePromptOptions): string {
  const formattedContent = formatContent(content, options?.format);
  return `${goal}\n\n${formattedContent}`;
}

/**
 * Build a URL for a specific AI service
 */
function buildUrl(
  service: AiService,
  prompt: string,
  options?: CreatePromptOptions
): string {
  const config = getService(service);
  if (!config) {
    throw new Error(`Unknown AI service: ${service}`);
  }

  // Truncate if needed
  const maxLen = config.maxLength || 32000;
  const truncatedPrompt = prompt.length > maxLen
    ? prompt.slice(0, maxLen - 3) + '...'
    : prompt;

  const encoded = encodeURIComponent(truncatedPrompt);

  // Build URL based on method
  let url = config.baseUrl;

  if (config.method === 'hash') {
    url += '#' + config.promptParam + '=' + encoded;
  } else if (config.method === 'path') {
    url += '/' + encoded;
  } else {
    // Default: query string
    const separator = url.includes('?') ? '&' : '?';
    url += separator + config.promptParam + '=' + encoded;
  }

  // Add custom params
  if (options?.params) {
    for (const [key, value] of Object.entries(options.params)) {
      url += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }
  }

  // Handle model param for supported services
  if (options?.model && ['chatgpt', 'claude', 'gemini'].includes(service)) {
    url += '&model=' + encodeURIComponent(options.model);
  }

  return url;
}

/**
 * Create a deep-linked URL for an AI service
 *
 * @param goal - What you want the AI to do (e.g., "Explain this code")
 * @param content - The content to include in the prompt
 * @param service - The AI service to use
 * @param options - Optional configuration
 * @returns The ready-to-use URL
 *
 * @example
 * const url = createAiPrompt('Explain this', 'const x = 1;', 'chatgpt');
 * window.open(url, '_blank');
 *
 * @example
 * const url = createAiPrompt(
 *   'Review this code',
 *   { text: 'function add(a, b) { return a + b; }', language: 'javascript' },
 *   'claude',
 *   { model: 'claude-3-opus' }
 * );
 */
export function createAiPrompt(
  goal: string,
  content: PromptContent,
  service: AiService,
  options?: CreatePromptOptions
): string {
  const prompt = buildPromptString(goal, content, options);
  return buildUrl(service, prompt, options);
}

/**
 * Create URLs for multiple AI services at once
 *
 * @param goal - What you want the AI to do
 * @param content - The content to include
 * @param services - Array of services or 'all' for defaults
 * @param options - Optional configuration
 * @returns Array of results with service info and URLs
 *
 * @example
 * const urls = createAiPrompts('Summarize', text, ['chatgpt', 'claude']);
 *
 * @example
 * const urls = createAiPrompts('Explain', code, 'all');
 */
export function createAiPrompts(
  goal: string,
  content: PromptContent,
  services: AiService[] | 'all' = 'all',
  options?: CreatePromptOptions
): PromptResult[] {
  const serviceList = services === 'all' ? DEFAULT_SERVICES : services;
  const prompt = buildPromptString(goal, content, options);

  return serviceList.map((service) => {
    const config = getService(service);
    return {
      service,
      url: buildUrl(service, prompt, options),
      name: config?.name || service,
      icon: config?.icon,
      color: config?.color,
    };
  });
}

/**
 * Validate a service URL (basic check)
 */
export function validateUrl(service: AiService, url: string): boolean {
  const config = getService(service);
  if (!config) return false;

  try {
    const parsed = new URL(url);
    return parsed.origin === new URL(config.baseUrl).origin;
  } catch {
    return false;
  }
}

/**
 * Get the best service for content type
 */
export function suggestService(content: PromptContent): AiService {
  const text = typeof content === 'string' ? content : JSON.stringify(content);

  // Code -> Claude (artifacts support)
  if (isCodeContent(text)) {
    return 'claude';
  }

  // Research/questions -> Perplexity
  if (text.includes('?') || /\b(what|why|how|when|where|who)\b/i.test(text)) {
    return 'perplexity';
  }

  // Default to ChatGPT
  return 'chatgpt';
}

/**
 * Open an AI prompt in a new tab
 */
export function openAiPrompt(
  goal: string,
  content: PromptContent,
  service: AiService,
  options?: CreatePromptOptions
): void {
  const url = createAiPrompt(goal, content, service, options);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
