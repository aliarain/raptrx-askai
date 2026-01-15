import prompts from 'prompts';
import pc from 'picocolors';
import { getServices, DEFAULT_SERVICES } from '../core';

export const PRESET_GOALS = [
  { title: 'Explain this code', value: 'Explain this code' },
  { title: 'Review for bugs', value: 'Review this code for bugs and improvements' },
  { title: 'Summarize', value: 'Summarize the following' },
  { title: 'Translate', value: 'Translate the following' },
  { title: pc.dim('Custom prompt...'), value: '__custom__' },
];

export async function askGoal(): Promise<string | null> {
  const response = await prompts({
    type: 'select',
    name: 'goal',
    message: 'What do you want AI to help with?',
    choices: PRESET_GOALS,
    initial: 0,
  });

  if (!response.goal) return null;

  if (response.goal === '__custom__') {
    const custom = await prompts({
      type: 'text',
      name: 'value',
      message: 'Enter your prompt:',
    });
    return custom.value || null;
  }

  return response.goal;
}

export async function askContent(): Promise<string | null> {
  const response = await prompts({
    type: 'text',
    name: 'content',
    message: 'Paste your content (code, text, etc.):',
  });

  return response.content || null;
}

export async function askServices(): Promise<string[] | null> {
  const allServices = getServices();

  const choices = DEFAULT_SERVICES.map((id) => ({
    title: allServices[id]?.name || id,
    value: id,
    selected: ['chatgpt', 'claude'].includes(id),
  }));

  // Add remaining services
  Object.keys(allServices).forEach((id) => {
    if (!DEFAULT_SERVICES.includes(id as any)) {
      choices.push({
        title: allServices[id].name,
        value: id,
        selected: false,
      });
    }
  });

  const response = await prompts({
    type: 'multiselect',
    name: 'services',
    message: 'Which AI services? (space to select)',
    choices,
    hint: '- Space to select. Enter to confirm',
    instructions: false,
    min: 1,
  });

  return response.services?.length ? response.services : null;
}

export async function confirmOpen(count: number): Promise<boolean> {
  const response = await prompts({
    type: 'confirm',
    name: 'open',
    message: `Open ${count} AI service${count > 1 ? 's' : ''} in browser?`,
    initial: true,
  });

  return response.open ?? false;
}
