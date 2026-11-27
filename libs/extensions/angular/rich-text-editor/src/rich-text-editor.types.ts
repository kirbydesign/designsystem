export type RichTextEditorFormattingAction =
  'bold' | 'italic' | 'underline' | 'bulletList' | 'orderedList';

export type RichTextEditorAction = RichTextEditorFormattingAction | 'undo' | 'redo';
export type RichTextEditorBlockLevel = 0 | 1 | 2 | 3;
export type RichTextEditorFormatting = 'markdown' | 'smileys';
export interface RichTextEditorTextStyleLabels {
  readonly label: string;
  readonly normal: string;
  readonly heading1: string;
  readonly heading2: string;
  readonly heading3: string;
}

export type RichTextEditorToolbarItem =
  | {
      readonly id: RichTextEditorFormattingAction;
      readonly label: string;
    }
  | ({ readonly id: 'textStyle' } & RichTextEditorTextStyleLabels);

export interface RichTextEditorConfig {
  readonly toolbarItems?: readonly RichTextEditorToolbarItem[];
  readonly inputFormatting?: readonly RichTextEditorFormatting[];
  readonly pasteFormatting?: readonly RichTextEditorFormatting[];
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
  toolbar: string;
}
