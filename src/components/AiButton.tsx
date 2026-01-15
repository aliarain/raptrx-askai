import React, { useCallback, useMemo, useState } from 'react';
import {
  createAiPrompt,
  getService,
  type AiService,
  type CreatePromptOptions,
  type PromptContent,
} from '../core';
import { getIcon } from './icons';
import { buttonStyles, themes, type Theme } from './styles';

export interface AiButtonProps {
  /** What the AI should do (e.g., "Explain this code") */
  goal: string;
  /** Content to send to the AI */
  content: PromptContent;
  /** Which AI service to use */
  service: AiService;
  /** Custom button label (defaults to service name) */
  label?: string;
  /** Show service icon */
  showIcon?: boolean;
  /** Button theme */
  theme?: Theme;
  /** Custom className */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Options for URL generation */
  options?: CreatePromptOptions;
  /** Callback when button is clicked */
  onClick?: (url: string, service: AiService) => void;
  /** Callback for analytics/tracking */
  onTrack?: (service: AiService, goal: string) => void;
  /** Disable the button */
  disabled?: boolean;
  /** Accessible label */
  ariaLabel?: string;
}

/**
 * A button that opens an AI prompt in a new tab
 *
 * @example
 * <AiButton
 *   goal="Explain this code"
 *   content={codeSnippet}
 *   service="chatgpt"
 * />
 *
 * @example
 * <AiButton
 *   goal="Summarize"
 *   content={text}
 *   service="claude"
 *   theme="brand"
 *   showIcon
 * />
 */
export const AiButton: React.FC<AiButtonProps> = ({
  goal,
  content,
  service,
  label,
  showIcon = true,
  theme = 'light',
  className,
  style,
  options,
  onClick,
  onTrack,
  disabled = false,
  ariaLabel,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const serviceConfig = useMemo(() => getService(service), [service]);
  const Icon = useMemo(() => getIcon(service), [service]);

  const url = useMemo(
    () => createAiPrompt(goal, content, service, options),
    [goal, content, service, options]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      onTrack?.(service, goal);
      onClick?.(url, service);

      // Open in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    },
    [disabled, url, service, goal, onClick, onTrack]
  );

  const displayLabel = label || serviceConfig?.name || service;

  const computedStyle = useMemo((): React.CSSProperties => {
    const brandColor = serviceConfig?.color || '#10a37f';

    if (theme === 'brand') {
      return {
        ...buttonStyles,
        backgroundColor: isHovered ? adjustColor(brandColor, -15) : brandColor,
        color: '#ffffff',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      };
    }

    const themeStyles = themes[theme] || themes.light;
    return {
      ...buttonStyles,
      backgroundColor: isHovered ? themeStyles.hoverBackground : themeStyles.background,
      color: themeStyles.color,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style,
    };
  }, [theme, serviceConfig, isHovered, disabled, style]);

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={computedStyle}
      disabled={disabled}
      aria-label={ariaLabel || `Open in ${displayLabel}`}
      title={`Ask ${displayLabel}: ${goal}`}
    >
      {showIcon && <Icon size={18} />}
      <span>{displayLabel}</span>
    </button>
  );
};

/**
 * Darken/lighten a hex color
 */
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export default AiButton;
