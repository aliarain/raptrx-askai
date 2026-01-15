# askai

> Add "Ask AI" buttons to your app in seconds. No dependencies. You own the code.

Send content to ChatGPT, Claude, Gemini, Grok, Perplexity and 5 more AI services with one click.

## Quick Start

```bash
npx @raptrx/askai init
```

```bash
npx @raptrx/askai add button
```

That's it. You now have an AI button in your project.

## How It Works

This is **NOT** a dependency. Like [shadcn/ui](https://ui.shadcn.com), we copy the code directly into your project:

```
your-project/
├── askai.json                    # Config
├── src/
│   ├── lib/askai.ts             # AI services (you own this)
│   └── components/askai/
│       └── ask-ai-button.tsx    # Components (you own this)
```

**You own the code.** Customize it however you want.

## Usage

### Button

```tsx
import { AskAIButton } from '@/components/askai/ask-ai-button';

<AskAIButton
  service="chatgpt"
  goal="Explain this code"
  content={codeString}
/>
```

### Link (SSR-friendly)

```tsx
import { AskAILink } from '@/components/askai/ask-ai-link';

<AskAILink
  service="claude"
  goal="Review this"
  content={codeString}
>
  Ask Claude
</AskAILink>
```

### Dropdown (multiple services)

```tsx
import { AskAIDropdown } from '@/components/askai/ask-ai-dropdown';

<AskAIDropdown
  goal="Explain this code"
  content={codeString}
  services={['chatgpt', 'claude', 'gemini', 'perplexity']}
/>
```

### Direct URL (vanilla JS)

```ts
import { buildPromptUrl, openInAI } from '@/lib/askai';

// Get URL
const url = buildPromptUrl('chatgpt', 'Explain this', code);

// Or open directly
openInAI('claude', 'Review this', code);
```

## CLI Commands

```bash
# Initialize in your project
npx @raptrx/askai init

# Add components
npx @raptrx/askai add button      # AskAIButton
npx @raptrx/askai add link        # AskAILink
npx @raptrx/askai add dropdown    # AskAIDropdown

# Help
npx @raptrx/askai --help
```

## Supported AI Services

| Service | ID | URL |
|---------|-------|-----|
| ChatGPT | `chatgpt` | chat.openai.com |
| Claude | `claude` | claude.ai |
| Gemini | `gemini` | gemini.google.com |
| Grok | `grok` | grok.x.ai |
| Perplexity | `perplexity` | perplexity.ai |
| DeepSeek | `deepseek` | chat.deepseek.com |
| Mistral | `mistral` | chat.mistral.ai |
| Copilot | `copilot` | copilot.microsoft.com |
| Kagi | `kagi` | kagi.com |
| Google AI Studio | `google` | aistudio.google.com |

## Configuration

After running `init`, you'll have an `askai.json`:

```json
{
  "typescript": true,
  "srcDir": "src",
  "utilsPath": "./src/lib/askai",
  "componentsPath": "./src/components/askai"
}
```

## Customization

Since you own the code, you can:

- Add your own AI services
- Change the button styles
- Modify the URL building logic
- Add analytics/tracking
- Integrate with your design system

Example - add a new AI service:

```ts
// In src/lib/askai.ts
export const services = {
  // ... existing services
  myai: {
    name: 'My AI',
    url: 'https://myai.com',
    buildUrl: (prompt) => `https://myai.com/chat?q=${encodeURIComponent(prompt)}`,
  },
};
```

## Why askai?

- **Zero runtime dependencies** - Code is copied to your project
- **Full control** - Customize everything
- **Type-safe** - Full TypeScript support
- **10 AI services** - ChatGPT, Claude, Gemini, and more
- **Framework agnostic** - Works with React, Next.js, Remix, etc.

## Examples

### Code Explainer

```tsx
function CodeBlock({ code, language }) {
  return (
    <div>
      <pre>{code}</pre>
      <AskAIDropdown
        goal={`Explain this ${language} code`}
        content={code}
        services={['chatgpt', 'claude']}
      />
    </div>
  );
}
```

### Documentation Helper

```tsx
function DocPage({ content }) {
  return (
    <article>
      {content}
      <AskAIButton
        service="perplexity"
        goal="Find more information about"
        content={content}
      >
        Research More
      </AskAIButton>
    </article>
  );
}
```

### Error Assistant

```tsx
function ErrorBoundary({ error }) {
  return (
    <div>
      <p>Something went wrong</p>
      <AskAIButton
        service="chatgpt"
        goal="Help me fix this error"
        content={error.stack}
      >
        Ask AI for Help
      </AskAIButton>
    </div>
  );
}
```

## License

MIT
