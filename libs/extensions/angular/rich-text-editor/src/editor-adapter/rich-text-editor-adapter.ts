import type {
  RichTextEditorBlockLevel as BlockLevel,
  RichTextEditorAction as EditorAction,
  RichTextEditorState as EditorState,
} from '../rich-text-editor.types';

export type {
  RichTextEditorAction as EditorAction,
  RichTextEditorBlockLevel as BlockLevel,
  RichTextEditorFormattingAction as FormattingAction,
  RichTextEditorState as EditorState,
} from '../rich-text-editor.types';

export const formattingActions = [
  'bold',
  'italic',
  'underline',
  'bulletList',
  'orderedList',
] as const;
export interface EditorSettings {
  placeholder: string;
  readonly: boolean;
  label: string;
  describedBy: string;
  scrollClearance: number;
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
  scrollIntoView(): void;
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

export function editorScrollOptions(bottom: number) {
  return {
    scrollThreshold: { top: 0, right: 0, bottom, left: 0 },
    scrollMargin: { top: 5, right: 5, bottom: Math.max(5, bottom), left: 5 },
  };
}
