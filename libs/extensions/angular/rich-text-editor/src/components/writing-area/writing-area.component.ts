import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  signal,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Editor, EditorOptions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { formattingActions } from '../../rich-text-editor.defaults';
import {
  RichTextEditorAction,
  RichTextEditorBlockLevel,
  RichTextEditorConfig,
  RichTextEditorState,
} from '../../rich-text-editor.types';

const commands = {
  bold: 'toggleBold',
  italic: 'toggleItalic',
  underline: 'toggleUnderline',
  bulletList: 'toggleBulletList',
  orderedList: 'toggleOrderedList',
  undo: 'undo',
  redo: 'redo',
} as const;

@Component({
  selector: 'kirby-x-rich-text-editor-writing-area',
  templateUrl: './writing-area.component.html',
  styleUrl: './writing-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class WritingAreaComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() value = '';
  @Input() config: RichTextEditorConfig = {};
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() ariaLabel = '';
  @Input() ariaDescribedby = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() stateChange = new EventEmitter<Readonly<RichTextEditorState>>();
  @Output() editorFocus = new EventEmitter<void>();
  @Output() editorBlur = new EventEmitter<void>();
  @ViewChild('editorHost', { static: true }) private editorHost!: ElementRef<HTMLElement>;

  protected readonly empty = signal(false);
  private editor?: Editor;

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && this.editor) {
      throw new Error(
        'Rich text editor config cannot be changed after initialization. Recreate the editor to apply a new config.'
      );
    }
    if (changes['value']) this.updateValue();
    if (
      changes['placeholder'] ||
      changes['readonly'] ||
      changes['ariaLabel'] ||
      changes['ariaDescribedby']
    ) {
      this.updateSettings();
    }
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
    this.editor = undefined;
  }

  execute(action: RichTextEditorAction): void {
    if (!this.editor?.isEditable) return;
    this.editor.chain().focus()[commands[action]]().run();
  }

  focus(): void {
    this.editor?.commands.focus();
  }

  blur(): void {
    this.editor?.commands.blur();
  }

  setBlock(level: RichTextEditorBlockLevel): void {
    if (this.editor?.isEditable) {
      const chain = this.editor.chain().focus();
      if (level === 0) chain.setParagraph().run();
      else chain.setHeading({ level }).run();
    }
    queueMicrotask(() => this.focus());
  }

  containsSelection(selection: Selection): boolean {
    return this.editorHost.nativeElement.contains(selection.anchorNode);
  }

  private initializeEditor(): void {
    this.editor = new Editor({
      element: this.editorHost.nativeElement,
      content: this.value,
      editable: !this.readonly,
      enableInputRules: this.config.enableInputRules ?? false,
      enablePasteRules: this.config.enablePasteRules ?? false,
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
        ...(this.config.extensions ?? []),
      ],
      editorProps: this.editorProps,
      onUpdate: ({ editor }) => this.valueChange.emit(editor.getHTML()),
      onTransaction: ({ editor }) => this.publishState(editor),
      onFocus: () => this.editorFocus.emit(),
      onBlur: () => this.editorBlur.emit(),
    });
    this.publishState(this.editor);
  }

  private get editorProps(): EditorOptions['editorProps'] {
    return {
      attributes: {
        class: 'kirby-rich-text-document',
        role: 'textbox',
        tabindex: '0',
        'aria-label': this.ariaLabel,
        'aria-multiline': 'true',
        'aria-describedby': this.ariaDescribedby,
        'aria-placeholder': this.placeholder,
        'aria-readonly': String(this.readonly),
      },
      handleDOMEvents: { keydown: (_view, event) => event.key === 'Tab' },
    };
  }

  private updateValue(): void {
    const editor = this.editor;
    if (!editor || this.value === editor.getHTML()) return;
    editor
      .chain()
      .setMeta('addToHistory', false)
      .setContent(this.value, { emitUpdate: false })
      .run();
    this.publishState(editor);
  }

  private updateSettings(): void {
    const editor = this.editor;
    if (!editor) return;
    editor.setOptions({
      editorProps: { ...editor.options.editorProps, ...this.editorProps },
    });
    editor.setEditable(!this.readonly, false);
    this.publishState(editor);
  }

  private publishState(editor: Editor): void {
    const doc = editor.state.doc;
    const state: RichTextEditorState = {
      empty:
        doc.childCount === 1 && !!doc.firstChild?.isTextblock && doc.firstChild.content.size === 0,
      active: formattingActions.filter((action) => editor.isActive(action)),
      block: ([1, 2, 3] as const).find((level) => editor.isActive('heading', { level })) ?? 0,
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    };
    this.empty.set(state.empty);
    this.stateChange.emit(state);
  }
}
