import { describe, it, expect } from 'vitest';
import {
  createAiPrompt,
  createAiPrompts,
  validateUrl,
  suggestService,
} from './builder';

describe('createAiPrompt', () => {
  it('should create a ChatGPT URL', () => {
    const url = createAiPrompt('Explain this', 'Hello world', 'chatgpt');
    expect(url).toContain('chatgpt.com');
    expect(url).toContain('q=');
    expect(url).toContain('Explain%20this');
    expect(url).toContain('Hello%20world');
  });

  it('should create a Claude URL', () => {
    const url = createAiPrompt('Review', 'const x = 1;', 'claude');
    expect(url).toContain('claude.ai');
    expect(url).toContain('Review');
  });

  it('should handle code content with formatting', () => {
    const url = createAiPrompt('Explain', 'function test() {}', 'chatgpt', {
      format: 'code',
    });
    expect(url).toContain('%60%60%60'); // encoded backticks
  });

  it('should handle object content', () => {
    const url = createAiPrompt('Analyze', { text: 'test', language: 'js' }, 'gemini');
    expect(url).toContain('gemini.google.com');
    expect(url).toContain('test');
  });

  it('should throw for unknown service', () => {
    expect(() => createAiPrompt('Test', 'content', 'unknownservice123')).toThrow(
      'Unknown AI service'
    );
  });
});

describe('createAiPrompts', () => {
  it('should create URLs for multiple services', () => {
    const results = createAiPrompts('Summarize', 'Test content', ['chatgpt', 'claude']);
    expect(results).toHaveLength(2);
    expect(results[0].service).toBe('chatgpt');
    expect(results[1].service).toBe('claude');
    expect(results[0].url).toContain('chatgpt.com');
    expect(results[1].url).toContain('claude.ai');
  });

  it('should use default services when "all" is specified', () => {
    const results = createAiPrompts('Test', 'content', 'all');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.service === 'chatgpt')).toBe(true);
  });

  it('should include service metadata', () => {
    const results = createAiPrompts('Test', 'content', ['chatgpt']);
    expect(results[0].name).toBe('ChatGPT');
    expect(results[0].color).toBe('#10a37f');
    expect(results[0].icon).toBe('chatgpt');
  });
});

describe('validateUrl', () => {
  it('should validate correct ChatGPT URL', () => {
    const url = createAiPrompt('Test', 'content', 'chatgpt');
    expect(validateUrl('chatgpt', url)).toBe(true);
  });

  it('should reject wrong origin', () => {
    expect(validateUrl('chatgpt', 'https://evil.com/?q=test')).toBe(false);
  });

  it('should reject unknown service', () => {
    expect(validateUrl('unknown123', 'https://example.com')).toBe(false);
  });
});

describe('suggestService', () => {
  it('should suggest Claude for code', () => {
    expect(suggestService('const x = 1; function test() {}')).toBe('claude');
  });

  it('should suggest Perplexity for questions', () => {
    expect(suggestService('What is the capital of France?')).toBe('perplexity');
  });

  it('should default to ChatGPT', () => {
    expect(suggestService('Hello there')).toBe('chatgpt');
  });
});
