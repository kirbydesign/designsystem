export const formattingActions = [
  'bold',
  'italic',
  'underline',
  'bulletList',
  'orderedList',
] as const;
export type FormattingAction = (typeof formattingActions)[number];
export type EditorAction = FormattingAction | 'undo' | 'redo';
export type BlockLevel = 0 | 1 | 2 | 3;

export interface EditorState {
  empty: boolean;
  active: FormattingAction[];
  block: BlockLevel;
  canUndo: boolean;
  canRedo: boolean;
}

export interface EditorSettings {
  placeholder: string;
  readonly: boolean;
  label: string;
  describedBy: string;
}

export interface EditorOptions extends EditorSettings {
  value: string;
  onChange(value: string): void;
  onStateChange(state: EditorState): void;
  onFocus(): void;
  onBlur(): void;
}

export interface RichTextEditorAdapter {
  mount(element: HTMLElement, options: EditorOptions): void;
  setValue(value: string): void;
  configure(settings: EditorSettings): void;
  execute(action: EditorAction): void;
  setBlock(level: BlockLevel): void;
  focus(): void;
  blur(): void;
  destroy(): void;
}

export function editorAttributes(settings: EditorSettings): Record<string, string> {
  return {
    class: 'kirby-rich-text-document',
    role: 'textbox',
    tabindex: '0',
    'aria-label': settings.label,
    'aria-multiline': 'true',
    'aria-describedby': settings.describedBy,
    'aria-placeholder': settings.placeholder,
    'aria-readonly': String(settings.readonly),
  };
}
