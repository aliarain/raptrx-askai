import { describe, it, expect, beforeEach } from 'vitest';
import {
  getService,
  getServices,
  getServiceIds,
  addService,
  removeService,
  resetServices,
  hasService,
} from './services';

describe('services registry', () => {
  beforeEach(() => {
    resetServices();
  });

  describe('getService', () => {
    it('should return ChatGPT config', () => {
      const service = getService('chatgpt');
      expect(service).toBeDefined();
      expect(service?.name).toBe('ChatGPT');
      expect(service?.baseUrl).toContain('chatgpt.com');
    });

    it('should be case-insensitive', () => {
      expect(getService('ChatGPT')).toBeDefined();
      expect(getService('CHATGPT')).toBeDefined();
    });

    it('should return undefined for unknown service', () => {
      expect(getService('nonexistent')).toBeUndefined();
    });
  });

  describe('getServices', () => {
    it('should return all services', () => {
      const services = getServices();
      expect(Object.keys(services).length).toBeGreaterThan(5);
      expect(services.chatgpt).toBeDefined();
      expect(services.claude).toBeDefined();
    });
  });

  describe('getServiceIds', () => {
    it('should return array of service IDs', () => {
      const ids = getServiceIds();
      expect(Array.isArray(ids)).toBe(true);
      expect(ids).toContain('chatgpt');
      expect(ids).toContain('claude');
    });
  });

  describe('addService', () => {
    it('should add a custom service', () => {
      addService('myai', {
        name: 'My AI',
        baseUrl: 'https://myai.com/chat',
        promptParam: 'prompt',
        color: '#ff0000',
      });

      const service = getService('myai');
      expect(service).toBeDefined();
      expect(service?.name).toBe('My AI');
      expect(service?.method).toBe('query'); // default
    });

    it('should override existing service', () => {
      addService('chatgpt', {
        name: 'Custom ChatGPT',
        baseUrl: 'https://custom.chatgpt.com',
        promptParam: 'q',
      });

      const service = getService('chatgpt');
      expect(service?.name).toBe('Custom ChatGPT');
    });
  });

  describe('removeService', () => {
    it('should remove a service', () => {
      expect(hasService('chatgpt')).toBe(true);
      const result = removeService('chatgpt');
      expect(result).toBe(true);
      expect(hasService('chatgpt')).toBe(false);
    });

    it('should return false for non-existent service', () => {
      expect(removeService('nonexistent')).toBe(false);
    });
  });

  describe('hasService', () => {
    it('should return true for existing service', () => {
      expect(hasService('claude')).toBe(true);
    });

    it('should return false for non-existent service', () => {
      expect(hasService('doesnotexist')).toBe(false);
    });
  });

  describe('resetServices', () => {
    it('should restore default services', () => {
      removeService('chatgpt');
      addService('custom', {
        name: 'Custom',
        baseUrl: 'https://custom.com',
        promptParam: 'q',
      });

      resetServices();

      expect(hasService('chatgpt')).toBe(true);
      expect(hasService('custom')).toBe(false);
    });
  });
});
