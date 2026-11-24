import { Extension, textInputRule, textPasteRule } from '@tiptap/core';
import { RichTextEditorFormatting } from './rich-text-editor.types';

const smileys = {
  ':-)': '😊',
  ':)': '😊',
  ':-(': '😞',
  ':(': '😞',
  ':-D': '😃',
  ':D': '😃',
  ';-)': '😉',
  ';)': '😉',
  ':-P': '😛',
  ':P': '😛',
  ':-O': '😮',
  ':O': '😮',
  '<3': '❤️',
  ':-/': '😕',
  '>:|': '😠',
};

const smileyPatterns = Object.entries(smileys).map(([shortcut, replace]) => ({
  pattern: shortcut.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  replace,
}));

export const smileyFormatting = Extension.create({
  name: 'smileys',
  addInputRules() {
    return smileyPatterns.map(({ pattern, replace }) =>
      textInputRule({ find: new RegExp(`${pattern}$`), replace })
    );
  },
  addPasteRules() {
    return smileyPatterns.map(({ pattern, replace }) =>
      textPasteRule({ find: new RegExp(pattern, 'g'), replace })
    );
  },
});

export function formattingRules(formatting: readonly RichTextEditorFormatting[] = []): string[] {
  if (!Array.isArray(formatting)) {
    throw new TypeError('Rich text editor formatting must be an array');
  }
  return formatting.flatMap((format) => {
    switch (format) {
      case 'markdown':
        return ['bold', 'italic', 'heading', 'bulletList', 'orderedList'];
      case 'smileys':
        return ['smileys'];
      default:
        throw new TypeError(`Unsupported rich text editor formatting: ${format}`);
    }
  });
}
