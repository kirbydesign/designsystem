import { InjectionToken } from '@angular/core';
import { RichTextEditorAdapter } from './rich-text-editor-adapter';
import { TiptapAdapter } from './tiptap-adapter';

export const EDITOR_ADAPTER_FACTORY = new InjectionToken<() => RichTextEditorAdapter>(
  'Kirby rich text editor adapter factory',
  { providedIn: 'root', factory: () => () => new TiptapAdapter() }
);
