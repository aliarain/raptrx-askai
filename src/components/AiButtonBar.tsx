import React, { useMemo } from 'react';
import {
  DEFAULT_SERVICES,
  type AiService,
  type CreatePromptOptions,
  type PromptContent,
} from '../core';
import { AiButton } from './AiButton';
import { buttonBarStyles, type Theme } from './styles';

export interface AiButtonBarProps {
  /** What the AI should do */
  goal: string;
  /** Content to send to the AI */
  content: PromptContent;
  /** Services to show (array or 'all' for defaults) */
  services?: AiService[] | 'all';
  /** Theme for all buttons */
  theme?: Theme;
  /** Show icons on buttons */
  showIcons?: boolean;
  /** Custom className for container */
  className?: string;
  /** Custom styles for container */
  style?: React.CSSProperties;
  /** Options for URL generation */
  options?: CreatePromptOptions;
  /** Callback when any button is clicked */
  onClick?: (url: string, service: AiService) => void;
  /** Callback for analytics/tracking */
  onTrack?: (service: AiService, goal: string) => void;
  /** Layout direction */
  direction?: 'row' | 'column';
  /** Gap between buttons */
  gap?: number | string;
  /** Maximum number of services to show */
  maxServices?: number;
}

/**
 * A bar of AI service buttons
 *
 * @example
 * <AiButtonBar
 *   goal="Explain this"
 *   content={code}
 *   services={['chatgpt', 'claude', 'gemini']}
 * />
 *
 * @example
 * <AiButtonBar
 *   goal="Summarize"
 *   content={text}
 *   services="all"
 *   theme="brand"
 * />
 */
export const AiButtonBar: React.FC<AiButtonBarProps> = ({
  goal,
  content,
  services = 'all',
  theme = 'light',
  showIcons = true,
  className,
  style,
  options,
  onClick,
  onTrack,
  direction = 'row',
  gap = 8,
  maxServices,
}) => {
  const serviceList = useMemo(() => {
    const list = services === 'all' ? DEFAULT_SERVICES : services;
    return maxServices ? list.slice(0, maxServices) : list;
  }, [services, maxServices]);

  const containerStyle = useMemo(
    (): React.CSSProperties => ({
      ...buttonBarStyles,
      flexDirection: direction,
      gap: typeof gap === 'number' ? `${gap}px` : gap,
      ...style,
    }),
    [direction, gap, style]
  );

  return (
    <div className={className} style={containerStyle} role="group" aria-label="AI services">
      {serviceList.map((service) => (
        <AiButton
          key={service}
          goal={goal}
          content={content}
          service={service}
          theme={theme}
          showIcon={showIcons}
          options={options}
          onClick={onClick}
          onTrack={onTrack}
        />
      ))}
    </div>
  );
};

export default AiButtonBar;
