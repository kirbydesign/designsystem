import type { RichTextEditorLabels, RichTextEditorToolbarItem } from './rich-text-editor.types';

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
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  bulletList: 'Unordered list',
  orderedList: 'Ordered list',
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
  normal: 'Normal',
  toolbar: 'Text formatting',
  textStyle: 'Text style',
};

export const defaultToolbarItems: readonly RichTextEditorToolbarItem[] = [
  ...formattingActions,
  'textStyle',
];
