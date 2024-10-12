import type { Plugin } from "vite";
import { updateMarkup } from "./updateMarkup";

import * as fs from "fs/promises";
import * as path from "path";

interface AttributifyOptions {
  tailwindPath?: string;
}

export default function Attributify(options: AttributifyOptions = {}): Plugin {
  return {
    name: "vite-plugin-tailwind-attributify",
    enforce: "pre",

    async configResolved() {
      if (options.tailwindPath) {
        try {
          const resolvedTailwindPath = path.resolve(process.cwd(), options.tailwindPath);
          let content = await fs.readFile(resolvedTailwindPath, "utf-8");

          const regex = /content:\s*(\[[\s\S]*?\])/;

          const match = content.match(regex);
          const originalContent = match ? match[1] : null;

          content = content.replace(
            regex,
            `	content: {
          files: ${originalContent},
          transform: Object.fromEntries(
            ['tsx', 'jsx', 'svelte', 'vue'].map(ext => [ext, (content) => updateMarkup(content)])
          )
        }`
          );

          await fs.writeFile(resolvedTailwindPath, content);
          console.log(`Updated Tailwind config at ${resolvedTailwindPath}`);
        } catch (err) {
          console.error(`Failed to update Tailwind config: ${err}`);
        }
      }
    },

    async transform(code: any, id: string) {
      if (/\.(svelte|vue)$/.test(id)) return updateMarkup(code);
      if (/\.(jsx|tsx)$/.test(id)) return updateMarkup(code, "className");

      return code;
    },
  };
}

export { Attributify, updateMarkup };
