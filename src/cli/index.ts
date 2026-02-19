import prompts from 'prompts';
import pc from 'picocolors';
import fs from 'fs';
import path from 'path';
import { coreTemplate, buttonTemplate, buttonBarTemplate } from './templates';

const LOGO = `
  ${pc.bold(pc.cyan('askai'))} ${pc.dim('v1.0')}
  ${pc.dim('Add AI buttons to your app')}
`;

const AI_SERVICES = [
  { title: 'ChatGPT', value: 'chatgpt' },
  { title: 'Claude', value: 'claude' },
  { title: 'Gemini', value: 'gemini' },
  { title: 'Grok', value: 'grok' },
  { title: 'Perplexity', value: 'perplexity' },
  { title: 'DeepSeek', value: 'deepseek' },
  { title: 'Mistral', value: 'mistral' },
  { title: 'Copilot', value: 'copilot' },
  { title: 'Kagi', value: 'kagi' },
  { title: 'Google AI', value: 'google' },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function ensureDir(filePath: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ─────────────────────────────────────────────────────────────
// Commands
// ─────────────────────────────────────────────────────────────

async function init(): Promise<void> {
  console.log(LOGO);

  // Detect environment
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  let framework = 'React';
  let hasSrc = fs.existsSync(path.join(process.cwd(), 'src'));
  let hasApp = fs.existsSync(path.join(process.cwd(), 'app'));

  if (fs.existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps['next']) {
        framework = 'Next.js';
        hasApp = fs.existsSync(path.join(process.cwd(), 'app')) || fs.existsSync(path.join(process.cwd(), 'src/app'));
      } else if (deps['vite']) {
        framework = 'Vite';
      } else if (deps['@remix-run/react']) {
        framework = 'Remix';
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  console.log(pc.dim(`  Detecting environment: ${pc.cyan(framework)} found.`));
  console.log();

  const response = await prompts([
    {
      type: 'text',
      name: 'goal',
      message: 'What is your default goal/prompt?',
      initial: 'Explain this code',
    },
    {
      type: 'multiselect',
      name: 'services',
      message: 'Which AI tools do you want to add? (Space to select, Enter to confirm)',
      choices: AI_SERVICES,
      min: 1,
    },
    {
      type: 'text',
      name: 'componentsPath',
      message: 'Where should we create the Ask AI components?',
      initial: framework === 'Next.js'
        ? (hasApp ? './app/components/ask-ai' : './components/ask-ai')
        : (hasSrc ? './src/components/ask-ai' : './components/ask-ai'),
    },
  ]);

  if (!response.componentsPath || !response.services || response.services.length === 0) {
    console.log(pc.dim('Cancelled.'));
    return;
  }

  const outDir = path.resolve(process.cwd(), response.componentsPath);
  ensureDir(path.join(outDir, 'core.tsx'));

  const corePath = path.join(outDir, 'core.tsx');
  const buttonPath = path.join(outDir, 'AskAiButton.tsx');
  const buttonBarPath = path.join(outDir, 'AskAiButtonBar.tsx');

  // Filter services from core template
  let finalCoreTemplate = coreTemplate;
  const servicesToKeep = response.services as string[];

  // Create regex pattern to match service configs to remove
  const allServices = AI_SERVICES.map(s => s.value);
  for (const service of allServices) {
    if (!servicesToKeep.includes(service)) {
      // Regex to match: service_name: { ... }, 
      const regex = new RegExp(`\\s*${service}:\\s*{[^{}]*{[^{}]*}[^{}]*},?|\\s*${service}:\\s*{[^{}]*},?`, 'g');
      finalCoreTemplate = finalCoreTemplate.replace(regex, '');
    }
  }

  // Inject defaults into components
  const finalButtonTemplate = buttonTemplate
    .replace("'chatgpt'", "'" + servicesToKeep[0] + "'")
    .replace("'Explain this code'", "'" + response.goal + "'");

  const arrayString = "['" + servicesToKeep.join("', '") + "']";
  const finalButtonBarTemplate = buttonBarTemplate
    .replace("['chatgpt', 'claude', 'gemini']", arrayString)
    .replace("'Explain this code'", "'" + response.goal + "'");


  // Write files
  fs.writeFileSync(corePath, finalCoreTemplate);
  console.log(pc.green('✓'), 'Created', pc.cyan(corePath));

  fs.writeFileSync(buttonPath, finalButtonTemplate);
  console.log(pc.green('✓'), 'Created', pc.cyan(buttonPath));

  fs.writeFileSync(buttonBarPath, finalButtonBarTemplate);
  console.log(pc.green('✓'), 'Created', pc.cyan(buttonBarPath));

  console.log();
  console.log(pc.bold('Success! Next steps:'));
  console.log();
  console.log('  ' + pc.cyan("import { AskAiButton } from '" + response.componentsPath + "/AskAiButton'"));
  console.log('  <AskAiButton content={yourContent} />');
  console.log();
  console.log('  ' + pc.cyan("import { AskAiButtonBar } from '" + response.componentsPath + "/AskAiButtonBar'"));
  console.log('  <AskAiButtonBar content={yourContent} />');
  console.log();
  console.log(pc.yellow('  Open for new opportunities: ') + pc.underline('https://aliarain.com'));
  console.log(pc.dim('  Support and contributions are welcome!\\n'));

  // Write config
  const config = {
    goal: response.goal,
    services: response.services,
    path: response.componentsPath,
    framework,
    version: '1.2.0'
  };
  fs.writeFileSync(path.join(process.cwd(), '.askaiconfig.json'), JSON.stringify(config, null, 2));
}

function showHelp(): void {
  console.log(LOGO);
  console.log(
    '\\n' +
    pc.bold('Usage:') + '\\n' +
    '  npx @raptrx/askai ' + pc.cyan('<command>') + ' [options]\\n\\n' +
    pc.bold('Commands:') + '\\n' +
    '  ' + pc.cyan('init') + '              Initialize askai in your project\\n\\n' +
    pc.bold('Examples:') + '\\n' +
    '  npx @raptrx/askai init\\n\\n' +
    pc.dim('Documentation: https://github.com/aliarain/askai') + '\\n'
  );
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'init':
      await init();
      break;
    case '-h':
    case '--help':
    case 'help':
    case undefined:
      showHelp();
      break;
    case '-v':
    case '--version':
      console.log('1.2.0');
      break;
    default:
      console.log(pc.red('✗'), 'Unknown command:', pc.yellow(command));
      console.log();
      console.log('Run', pc.cyan('npx @raptrx/askai --help'), 'for usage.');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(pc.red('Error:'), err.message);
  process.exit(1);
});
