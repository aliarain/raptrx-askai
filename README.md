# @raptrx/askai

> One package. Any AI. One click.

Generate deep-link URLs for ChatGPT, Claude, Gemini, Grok, Perplexity, and more. Works with vanilla JS, Node.js, and React.

## Install

```bash
npm install @raptrx/askai
```

## Quick Start

### Vanilla JS / Node.js

```typescript
import { createAiPrompt, createAiPrompts, openAiPrompt } from '@raptrx/askai';

// Single service
const url = createAiPrompt('Explain this code', 'const x = 1;', 'chatgpt');

// Multiple services
const urls = createAiPrompts('Summarize', text, ['chatgpt', 'claude', 'gemini']);

// Open directly
openAiPrompt('Review this', code, 'claude');
```

### React

```tsx
import { AiButton, AiButtonBar } from '@raptrx/askai/react';

// Single button
<AiButton goal="Explain" content={code} service="chatgpt" />

// Button bar with multiple services
<AiButtonBar
  goal="Review this code"
  content={code}
  services={['chatgpt', 'claude', 'gemini']}
  theme="brand"
/>
```

## Supported Services

| Service    | ID           |
|------------|--------------|
| ChatGPT    | `chatgpt`    |
| Claude     | `claude`     |
| Gemini     | `gemini`     |
| Grok       | `grok`       |
| Perplexity | `perplexity` |
| DeepSeek   | `deepseek`   |
| Mistral    | `mistral`    |
| Copilot    | `copilot`    |
| Kagi       | `kagi`       |
| Google AI  | `google`     |

## API

### `createAiPrompt(goal, content, service, options?)`

Create a URL for one AI service.

```typescript
const url = createAiPrompt('Explain this', code, 'chatgpt');
window.open(url, '_blank');
```

### `createAiPrompts(goal, content, services, options?)`

Create URLs for multiple services.

```typescript
const results = createAiPrompts('Summarize', text, ['chatgpt', 'claude']);
// Returns: [{ service, url, name, color }, ...]
```

### `openAiPrompt(goal, content, service, options?)`

Open AI prompt directly in new tab.

```typescript
openAiPrompt('Analyze', data, 'perplexity');
```

### `suggestService(content)`

Auto-detect best service for content.

```typescript
suggestService('const x = 1;');  // 'claude' (code)
suggestService('What is 2+2?'); // 'perplexity' (question)
```

### `addService(id, config)`

Add custom AI service.

```typescript
import { addService } from '@raptrx/askai';

addService('myai', {
  name: 'My AI',
  baseUrl: 'https://myai.com/chat',
  promptParam: 'q',
  color: '#ff0000',
});
```

## React Components

### `<AiButton />`

```tsx
<AiButton
  goal="Explain"           // What to ask
  content={text}           // Content to send
  service="chatgpt"        // Service ID
  theme="brand"            // 'light' | 'dark' | 'brand'
  showIcon={true}          // Show service icon
  label="Ask GPT"          // Custom label
  onClick={(url) => {}}    // Click callback
/>
```

### `<AiButtonBar />`

```tsx
<AiButtonBar
  goal="Review"
  content={code}
  services={['chatgpt', 'claude']}  // Or 'all'
  theme="brand"
  direction="row"           // 'row' | 'column'
  gap={8}
  maxServices={3}
/>
```

## Content Formats

```typescript
// Plain text
createAiPrompt('Explain', 'Hello world', 'chatgpt');

// Code with language
createAiPrompt('Review', { text: code, language: 'typescript' }, 'claude');

// Auto-detects code and wraps in code blocks
createAiPrompt('Explain', 'function test() {}', 'chatgpt');
```

## License

MIT
