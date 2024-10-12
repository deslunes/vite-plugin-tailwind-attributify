import type { Plugin } from 'vite';
import { updateMarkup } from './updateMarkup';
import { updateMarkupJSX } from './handleJSX';

interface AttributifyOptions {
  tailwindPath?: string;
}

export default function Attributify(options: AttributifyOptions = {}): Plugin {
  return {
    name: 'vite-plugin-tailwind-attributify',
    enforce: "pre",
    async transform(code:any, id: string) {
      if (/\.(svelte|vue)$/.test(id)) return updateMarkup(code);
      if (/\.(jsx|tsx)$/.test(id)) return updateMarkupJSX(code);

      return code;
    },
  };
}

export { Attributify, updateMarkup, updateMarkupJSX }
