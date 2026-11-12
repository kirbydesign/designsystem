import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import {
  BlockLevel,
  EditorAction,
  editorAttributes,
  EditorOptions,
  editorScrollOptions,
  EditorSettings,
  formattingActions,
  RichTextEditorAdapter,
} from './rich-text-editor-adapter';

const commands = {
  bold: 'toggleBold',
  italic: 'toggleItalic',
  underline: 'toggleUnderline',
  bulletList: 'toggleBulletList',
  orderedList: 'toggleOrderedList',
  undo: 'undo',
  redo: 'redo',
} as const;

export class TiptapAdapter implements RichTextEditorAdapter {
  private editor!: Editor;
  private options!: EditorOptions;

  mount(element: HTMLElement, options: EditorOptions): void {
    this.options = options;
    this.editor = new Editor({
      element,
      content: options.value,
      editable: !options.readonly,
      enableInputRules: false,
      enablePasteRules: false,
      extensions: [
        StarterKit.configure({
          blockquote: false,
          code: false,
          codeBlock: false,
          dropcursor: false,
          gapcursor: false,
          heading: { levels: [1, 2, 3] },
          horizontalRule: false,
          link: false,
          strike: false,
          trailingNode: false,
          listKeymap: false,
        }),
      ],
      editorProps: {
        attributes: editorAttributes(options),
        ...editorScrollOptions(options.scrollClearance),
        handleDOMEvents: { keydown: (_view, event) => event.key === 'Tab' },
      },
      onUpdate: () => options.onChange(this.editor.getHTML()),
      onTransaction: () => this.publishState(),
      onFocus: () => options.onFocus(),
      onBlur: () => options.onBlur(),
    });
    this.publishState();
  }

  setValue(value: string): void {
    if (value === this.editor.getHTML()) return;
    this.editor
      .chain()
      .setMeta('addToHistory', false)
      .setContent(value, { emitUpdate: false })
      .run();
    this.publishState();
  }

  configure(settings: EditorSettings): void {
    this.editor.setOptions({
      editorProps: {
        ...this.editor.options.editorProps,
        attributes: editorAttributes(settings),
        ...editorScrollOptions(settings.scrollClearance),
      },
    });
    this.editor.setEditable(!settings.readonly, false);
    this.publishState();
  }

  execute(action: EditorAction): void {
    if (!this.editor.isEditable) return;
    this.editor.chain().focus()[commands[action]]().run();
  }

  setBlock(level: BlockLevel): void {
    if (!this.editor.isEditable) return;
    const chain = this.editor.chain().focus();
    if (level === 0) chain.setParagraph().run();
    else chain.setHeading({ level }).run();
  }

  focus(): void {
    this.editor.commands.focus();
  }

  blur(): void {
    this.editor.commands.blur();
  }

  scrollIntoView(): void {
    this.editor.commands.scrollIntoView();
  }

  destroy(): void {
    this.editor.destroy();
  }

  private publishState(): void {
    const doc = this.editor.state.doc;
    this.options.onStateChange({
      empty:
        doc.childCount === 1 && !!doc.firstChild?.isTextblock && doc.firstChild.content.size === 0,
      active: formattingActions.filter((action) => this.editor.isActive(action)),
      block: ([1, 2, 3] as const).find((level) => this.editor.isActive('heading', { level })) ?? 0,
      canUndo: this.editor.can().undo(),
      canRedo: this.editor.can().redo(),
    });
  }
}
