export const coreTemplate = `import * as React from 'react';

export type ServiceId =
  | 'chatgpt'
  | 'claude'
  | 'gemini'
  | 'grok'
  | 'perplexity'
  | 'deepseek'
  | 'mistral'
  | 'copilot'
  | 'kagi'
  | 'google';

export interface AiService {
  name: string;
  url: string;
  icon?: React.ReactNode;
  buildUrl: (prompt: string) => string;
}

export const services: Record<ServiceId, AiService> = {
  chatgpt: {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" fill="currentColor" />
      </svg>
    ),
    buildUrl: (prompt) => \`https://chat.openai.com/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  claude: {
    name: 'Claude',
    url: 'https://claude.ai',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill="#D97757" />
      </svg>
    ),
    buildUrl: (prompt) => \`https://claude.ai/new?q=\\\${encodeURIComponent(prompt)}\`,
  },
  gemini: {
    name: 'Gemini',
    url: 'https://gemini.google.com',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="#3186FF" />
      </svg>
    ),
    buildUrl: (prompt) => \`https://gemini.google.com/app?q=\\\${encodeURIComponent(prompt)}\`,
  },
  grok: {
    name: 'Grok',
    url: 'https://grok.x.ai',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1Record<ServiceId, AiService> = {
  chatgpt: {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" fill="currentColor" />
      </svg>
    ),
    buildUrl: (prompt) => \`https://chat.openai.com/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  claude: {
    name: 'Claude',
    url: 'https://claude.ai',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill="#D97757" />
      </svg>
    ),
    buildUrl: (prompt) => \`https://claude.ai/new?q=\\\${encodeURIComponent(prompt)}\`,
  },
  gemini: {
    name: 'Gemini',
    url: 'https://gemini.google.com',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="#3186FF" />
      </svg>
    ),
    buildUrl: (prompt) => \`https://gemini.google.com/app?q=\\\${encodeURIComponent(prompt)}\`,
  },
  grok: {
    name: 'Grok',
    url: 'https://grok.x.ai',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815" fill="currentColor" />
      </svg>
    ),
    buildUrl: (prompt) => \`https://grok.x.ai/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  perplexity: {
    name: 'Perplexity',
    url: 'https://perplexity.ai',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z" fill="#22B8CD" />
      </svg>
    ),
    buildUrl: (prompt) => \`https://perplexity.ai/search?q=\\\${encodeURIComponent(prompt)}\`,
  },
  deepseek: {
    name: 'DeepSeek',
    url: 'https://chat.deepseek.com',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    buildUrl: (prompt) => \`https://chat.deepseek.com/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  mistral: {
    name: 'Mistral',
    url: 'https://chat.mistral.ai',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.428 3.4h3.429v3.428H3.428V3.4zm13.714 0h3.43v3.428h-3.43V3.4z" fill="gold"/><path d="M3.428 6.828h6.857v3.429H3.429V6.828zm10.286 0h6.857v3.429h-6.857V6.828z" fill="#FFAF00"/><path d="M3.428 10.258h17.144v3.428H3.428v-3.428z" fill="#FF8205"/><path d="M3.428 13.686h3.429v3.428H3.428v-3.428zm6.858 0h3.429v3.428h-3.429v-3.428zm6.856 0h3.43v3.428h-3.43v-3.428z" fill="#FA500F"/><path d="M0 17.114h10.286v3.429H0v-3.429zm13.714 0H24v3.429H13.714v-3.429z" fill="#E10500"/>
      </svg>
    ),
    buildUrl: (prompt) => \`https://chat.mistral.ai/chat?q=\\\${encodeURIComponent(prompt)}\`,
  },
  copilot: {
    name: 'Copilot',
    url: 'https://copilot.microsoft.com',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5c1.24 0 2.36.5 3.17 1.32l-1.29 1.29A2.987 2.987 0 0 0 10.5 9.5c-1.66 0-3 1.34-3 3s1.34 3 3 3c1.3 0 2.41-.84 2.83-2h-2.83v-1.5h4.5c.04.26.07.51.07.77 0 2.48-1.77 4.73-4.57 4.73zm6.35-4.5h-1.7v1.7h-1.3v-1.7h-1.7v-1.3h1.7v-1.7h1.3v1.7h1.7v1.3z" fill="currentColor" />
      </svg>
    ),
    buildUrl: (prompt) => \`https://copilot.microsoft.com/?q=\\\${encodeURIComponent(prompt)}\`,
  },
  kagi: {
    name: 'Kagi',
    url: 'https://kagi.com',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.5 3.75L12 11.68 4.5 7.93 12 4.18zM4 9.07l7 3.5v7.36l-7-3.5V9.07zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z" fill="currentColor" />
      </svg>
    ),
    buildUrl: (prompt) => \`https://kagi.com/assistant?q=\\\${encodeURIComponent(prompt)}\`,
  },
  google: {
    name: 'Google AI Studio',
    url: 'https://aistudio.google.com',
    icon: (
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    buildUrl: (prompt) => \`https://aistudio.google.com/app/prompts?q=\\\${encodeURIComponent(prompt)}\`,
  },
};

/**
 * Ensures the URL is not too long to prevent 414 URI Too Long errors.
 * Most browsers limit URLs to ~2000-8000 chars. We use 2000 to be safe.
 */
function truncatePrompt(prompt: string, maxLength: number = 2000): string {
  if (prompt.length > maxLength) {
    return prompt.slice(0, maxLength - 3) + '...';
  }
  return prompt;
}

export function buildPromptUrl(service: ServiceId, goal: string, content: string): string {
  const fullPrompt = \`\\\${goal}\\\\n\\\\n\\\${content}\`;
  const truncated = truncatePrompt(fullPrompt);
  return services[service].buildUrl(truncated);
}

export function openInAI(service: ServiceId, goal: string, content: string): void {
  const url = buildPromptUrl(service, goal, content);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function getAllServices(): ServiceId[] {
  return Object.keys(services) as ServiceId[];
}
`;

export const buttonTemplate = `'use client';

import * as React from 'react';
import { services, openInAI, type ServiceId } from './core';

export interface AskAikButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  service?: ServiceId;
  goal?: string;
  content: string;
}

// These defaults can be injected by the CLI tool during init
export const DEFAULT_SERVICE: ServiceId = 'chatgpt';
export const DEFAULT_GOAL: string = 'Explain this code';

export const AskAiButton = React.forwardRef<HTMLButtonElement, AskAikButtonProps>(
  ({ className, service = DEFAULT_SERVICE, goal = DEFAULT_GOAL, content, children, ...props }, ref) => {
    const serviceDetails = services[service];
    const serviceName = serviceDetails?.name || service;
    const Icon = serviceDetails?.icon;

    return (
      <button
        ref={ref}
        onClick={(e) => {
          openInAI(service, goal, content);
          props.onClick?.(e);
        }}
        className={className}
        {...props}
      >
        {children || (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            {Icon}
            <span>Ask {serviceName}</span>
          </span>
        )}
      </button>
    );
  }
);
AskAiButton.displayName = 'AskAiButton';
`;

export const buttonBarTemplate = `'use client';

import * as React from 'react';
import { services, openInAI, getAllServices, type ServiceId } from './core';

export interface AskAiButtonBarProps extends React.HTMLAttributes<HTMLDivElement> {
  goal?: string;
  content: string;
  services?: ServiceId[] | 'all';
  buttonClassName?: string;
  direction?: 'row' | 'column';
  gap?: number;
}

export const DEFAULT_GOAL: string = 'Explain this code';

export const AskAiButtonBar = React.forwardRef<HTMLDivElement, AskAiButtonBarProps>(
  ({ 
    className, 
    buttonClassName, 
    goal = DEFAULT_GOAL, 
    content, 
    services: selectedServices = ['chatgpt', 'claude', 'gemini'],
    direction = 'row',
    gap = 8,
    ...props 
  }, ref) => {
    const serviceList = selectedServices === 'all' ? getAllServices() : selectedServices;

    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: 'flex',
          flexDirection: direction,
          gap,
          flexWrap: 'wrap',
          ...props.style
        }}
        {...props}
      >
        {serviceList.map((id) => {
          const serviceDetails = services[id];
          const serviceName = serviceDetails?.name || id;
          const Icon = serviceDetails?.icon;
          
          return (
            <button
              key={id}
              onClick={() => openInAI(id, goal, content)}
              className={buttonClassName}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
            >
              {Icon}
              <span>{serviceName}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
AskAiButtonBar.displayName = 'AskAiButtonBar';
`;
