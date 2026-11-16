export type RichTextEditorFormattingAction =
  'bold' | 'italic' | 'underline' | 'bulletList' | 'orderedList';

export type RichTextEditorAction = RichTextEditorFormattingAction | 'undo' | 'redo';
export type RichTextEditorBlockLevel = 0 | 1 | 2 | 3;
export type RichTextEditorToolbarItem = RichTextEditorFormattingAction | 'textStyle';

export interface RichTextEditorConfig {
  readonly extensions?: Extensions;
  readonly enableInputRules?: EditorOptions['enableInputRules'];
  readonly enablePasteRules?: EditorOptions['enablePasteRules'];
}

export interface RichTextEditorState {
  empty: boolean;
  active: readonly RichTextEditorFormattingAction[];
  block: RichTextEditorBlockLevel;
  canUndo: boolean;
  canRedo: boolean;
}

export interface RichTextEditorLabels {
  editor: string;
  placeholder: string;
  bold: string;
  italic: string;
  underline: string;
  bulletList: string;
  orderedList: string;
  heading1: string;
  heading2: string;
  heading3: string;
  normal: string;
  toolbar: string;
  textStyle: string;
}
import type { EditorOptions, Extensions } from '@tiptap/core';
