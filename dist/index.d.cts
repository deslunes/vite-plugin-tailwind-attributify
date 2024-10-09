import { Plugin } from 'vite';

declare function Attributify(): Plugin;
declare function updateMarkup(html: string): string;

export { Attributify, Attributify as default, updateMarkup };
