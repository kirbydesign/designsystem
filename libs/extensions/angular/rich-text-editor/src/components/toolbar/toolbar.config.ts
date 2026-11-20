import type {
  RichTextEditorBlockLevel,
  RichTextEditorFormattingAction,
  RichTextEditorToolbarItem,
} from '../../rich-text-editor.types';

export type ToolbarControl =
  | {
      kind: 'button';
      id: RichTextEditorFormattingAction;
      label: string;
      icon: string;
      shortcut: string;
    }
  | {
      kind: 'dropdown';
      id: 'textStyle';
      label: string;
      placeholder: string;
      options: { text: string; level: RichTextEditorBlockLevel }[];
    };

const buttons = {
  bold: { icon: 'bold', shortcut: 'Control+B Meta+B' },
  italic: { icon: 'italic', shortcut: 'Control+I Meta+I' },
  underline: { icon: 'underline', shortcut: 'Control+U Meta+U' },
  bulletList: { icon: 'unordered-bullets', shortcut: 'Control+Shift+8 Meta+Shift+8' },
  orderedList: { icon: 'ordered-bullets', shortcut: 'Control+Shift+7 Meta+Shift+7' },
} satisfies Record<RichTextEditorFormattingAction, { icon: string; shortcut: string }>;

export function createToolbarControl(item: RichTextEditorToolbarItem): ToolbarControl {
  if (item.id === 'textStyle') {
    return {
      kind: 'dropdown',
      id: item.id,
      label: item.label,
      placeholder: item.normal,
      options: [
        { text: item.heading1, level: 1 },
        { text: item.heading2, level: 2 },
        { text: item.heading3, level: 3 },
        { text: item.normal, level: 0 },
      ],
    };
  }
  return { ...item, kind: 'button', ...buttons[item.id] };
}
