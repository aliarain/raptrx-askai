import pc from 'picocolors';

export const LOGO = `
  ${pc.cyan('╭─────────────────────────────────────╮')}
  ${pc.cyan('│')}   ${pc.bold('🤖 askai')} ${pc.dim('- Ask Any AI')}           ${pc.cyan('│')}
  ${pc.cyan('╰─────────────────────────────────────╯')}
`;

export const success = (msg: string) => console.log(pc.green('✓ ') + msg);
export const info = (msg: string) => console.log(pc.blue('→ ') + msg);
export const error = (msg: string) => console.log(pc.red('✗ ') + msg);
export const dim = (msg: string) => pc.dim(msg);

export const SERVICE_COLORS: Record<string, (s: string) => string> = {
  chatgpt: pc.green,
  claude: pc.yellow,
  gemini: pc.magenta,
  grok: pc.white,
  perplexity: pc.cyan,
  deepseek: pc.blue,
  mistral: pc.yellow,
  copilot: pc.blue,
  kagi: pc.yellow,
  google: pc.blue,
};

export function colorService(service: string): string {
  const colorFn = SERVICE_COLORS[service.toLowerCase()] || pc.white;
  return colorFn(service);
}
