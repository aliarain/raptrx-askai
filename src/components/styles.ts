import type { CSSProperties } from 'react';

export const buttonStyles: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  textDecoration: 'none',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

export const buttonBarStyles: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
};

export const themes = {
  light: {
    background: '#f3f4f6',
    color: '#1f2937',
    hoverBackground: '#e5e7eb',
  },
  dark: {
    background: '#374151',
    color: '#f9fafb',
    hoverBackground: '#4b5563',
  },
  brand: {
    // Uses service color
    background: 'var(--ai-button-color, #10a37f)',
    color: '#ffffff',
    hoverBackground: 'var(--ai-button-color-hover, #0d8a6a)',
  },
};

export type Theme = keyof typeof themes | 'brand';
