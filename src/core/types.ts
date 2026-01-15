/**
 * Supported AI service identifiers
 */
export type AiService =
  | 'chatgpt'
  | 'claude'
  | 'gemini'
  | 'grok'
  | 'perplexity'
  | 'google'
  | 'kagi'
  | 'deepseek'
  | 'mistral'
  | 'copilot'
  | (string & {});

/**
 * Configuration for an AI service
 */
export interface ServiceConfig {
  /** Display name for the service */
  name: string;
  /** Base URL pattern for the service */
  baseUrl: string;
  /** URL parameter name for the prompt */
  promptParam: string;
  /** Optional additional parameters */
  params?: Record<string, string>;
  /** Method to build the URL (default: 'query') */
  method?: 'query' | 'hash' | 'path';
  /** Maximum prompt length (chars) */
  maxLength?: number;
  /** Icon identifier */
  icon?: string;
  /** Service color (hex) */
  color?: string;
}

/**
 * Options for creating an AI prompt URL
 */
export interface CreatePromptOptions {
  /** Model to use (if supported by service) */
  model?: string;
  /** Enable artifacts/canvas mode (Claude, ChatGPT) */
  artifacts?: boolean;
  /** Additional URL parameters */
  params?: Record<string, string>;
  /** Open in new tab (for UI components) */
  newTab?: boolean;
  /** Custom formatting for the prompt */
  format?: 'text' | 'code' | 'markdown';
}

/**
 * Result from batch URL generation
 */
export interface PromptResult {
  service: AiService;
  url: string;
  name: string;
  icon?: string;
  color?: string;
}

/**
 * Content types that can be passed to createAiPrompt
 */
export type PromptContent = string | { text: string; language?: string } | Record<string, unknown>;
