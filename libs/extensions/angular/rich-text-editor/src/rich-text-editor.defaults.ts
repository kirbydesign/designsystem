import type { RichTextEditorLabels } from './rich-text-editor.types';

export const formattingActions = [
  'bold',
  'italic',
  'underline',
  'bulletList',
  'orderedList',
] as const;

export const defaultLabels: Readonly<RichTextEditorLabels> = {
  editor: 'Rich text editor',
  placeholder: 'Write something...',
  toolbar: 'Text formatting',
};
