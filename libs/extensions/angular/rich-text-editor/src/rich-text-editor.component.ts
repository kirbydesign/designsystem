import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  signal,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';
import { UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';
import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { EDITOR_ADAPTER_FACTORY } from './editor-adapter/editor-adapter-factory';
import {
  BlockLevel,
  EditorAction,
  EditorSettings,
  EditorState,
  RichTextEditorAdapter,
} from './editor-adapter/rich-text-editor-adapter';
import { RichTextEditorCreatedEvent, RichTextEditorTexts } from './rich-text-editor.types';

const defaultTexts: Readonly<RichTextEditorTexts> = {
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  bulletList: 'Unordered list',
  orderedList: 'Ordered list',
  undo: 'Undo',
  redo: 'Redo',
  boldText: 'B',
  italicText: 'I',
  underlineText: 'U',
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
  normal: 'Normal',
  toolbar: 'Text formatting',
  textStyle: 'Text style',
};

@Component({
  selector: 'kirby-x-rich-text-editor',
  imports: [ButtonComponent, DropdownComponent, ListItemTemplateDirective],
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'kirby-surface-raised',
    '[attr.aria-label]': 'null',
    '[attr.aria-describedby]': 'null',
  },
})
export class RichTextEditorComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() value = '';
  @Input() placeholder = 'Write something...';
  @Input() readonly = false;
  @Input() texts: Partial<RichTextEditorTexts> = {};
  @Input('aria-label') ariaLabel = 'Rich text editor';
  @Input('aria-describedby') ariaDescribedby = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() editorFocus = new EventEmitter<void>();
  @Output() editorBlur = new EventEmitter<void>();
  @Output() editorCreated = new EventEmitter<RichTextEditorCreatedEvent>();
  @ViewChild('editorHost', { static: true }) private editorHost!: ElementRef<HTMLElement>;
  @ViewChild('toolbarHost', { static: true }) private toolbarHost!: ElementRef<HTMLElement>;

  protected readonly state = signal<EditorState | undefined>(undefined);
  protected readonly focused = signal(false);
  protected readonly keyboardBottom = signal(0);
  protected labels: RichTextEditorTexts = defaultTexts;
  protected readonly styleLabelId = UniqueIdGenerator.scopedTo('rich-text-editor-style').next();
  protected readonly toolbar = [
    { action: 'bold', text: 'boldText', shortcut: 'Control+B Meta+B' },
    { action: 'italic', text: 'italicText', shortcut: 'Control+I Meta+I' },
    { action: 'underline', text: 'underlineText', shortcut: 'Control+U Meta+U' },
    {
      action: 'bulletList',
      text: null,
      shortcut: 'Control+Shift+8 Meta+Shift+8',
    },
    {
      action: 'orderedList',
      text: null,
      shortcut: 'Control+Shift+7 Meta+Shift+7',
    },
  ] satisfies { action: EditorAction; text: keyof RichTextEditorTexts | null; shortcut: string }[];
  protected readonly history = [
    { action: 'undo', shortcut: 'Control+Z Meta+Z' },
    { action: 'redo', shortcut: 'Control+Shift+Z Meta+Shift+Z' },
  ] satisfies { action: 'undo' | 'redo'; shortcut: string }[];
  protected readonly blockStyles: {
    key: keyof RichTextEditorTexts;
    text: string;
    level: BlockLevel;
  }[] = [
    { key: 'heading1', text: defaultTexts.heading1, level: 1 },
    { key: 'heading2', text: defaultTexts.heading2, level: 2 },
    { key: 'heading3', text: defaultTexts.heading3, level: 3 },
    { key: 'normal', text: defaultTexts.normal, level: 0 },
  ];

  protected get blockIndex(): number {
    return this.blockStyles.findIndex((style) => style.level === (this.state()?.block ?? 0));
  }

  private readonly createAdapter = inject(EDITOR_ADAPTER_FACTORY);
  private readonly zone = inject(NgZone);
  private adapter?: RichTextEditorAdapter;
  private viewport?: VisualViewport;
  private selectionFrame?: number;
  private readonly updateViewport = () => {
    if (!this.viewport) return;
    this.keyboardBottom.set(
      Math.max(0, window.innerHeight - this.viewport.height - this.viewport.offsetTop)
    );
    this.scheduleSelectionVisibility();
  };

  private get settings(): EditorSettings {
    return {
      placeholder: this.placeholder,
      readonly: this.readonly,
      label: this.ariaLabel,
      describedBy: this.ariaDescribedby,
    };
  }

  ngAfterViewInit(): void {
    this.adapter = this.createAdapter();
    this.adapter.mount(this.editorHost.nativeElement, {
      value: this.value,
      ...this.settings,
      onChange: (value) => this.zone.run(() => this.valueChange.emit(value)),
      onStateChange: (state) =>
        this.zone.run(() => {
          this.state.set(state);
          this.scheduleSelectionVisibility();
        }),
      onFocus: () =>
        this.zone.run(() => {
          this.focused.set(true);
          this.editorFocus.emit();
          this.scheduleSelectionVisibility();
        }),
      onBlur: () =>
        this.zone.run(() => {
          this.focused.set(false);
          this.editorBlur.emit();
        }),
    });
    this.viewport = window.visualViewport ?? undefined;
    this.viewport?.addEventListener('resize', this.updateViewport);
    this.viewport?.addEventListener('scroll', this.updateViewport);
    this.updateViewport();
    this.editorCreated.emit({
      editor: {
        focus: () => this.adapter?.focus(),
        blur: () => this.adapter?.blur(),
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['texts']) {
      this.labels = { ...defaultTexts, ...this.texts };
      for (const style of this.blockStyles) style.text = this.labels[style.key];
    }
    if (changes['value']) this.adapter?.setValue(this.value);
    if (
      changes['placeholder'] ||
      changes['readonly'] ||
      changes['ariaLabel'] ||
      changes['ariaDescribedby']
    ) {
      this.adapter?.configure(this.settings);
    }
  }

  ngOnDestroy(): void {
    this.viewport?.removeEventListener('resize', this.updateViewport);
    this.viewport?.removeEventListener('scroll', this.updateViewport);
    if (this.selectionFrame !== undefined) cancelAnimationFrame(this.selectionFrame);
    this.adapter?.destroy();
    this.adapter = undefined;
  }

  protected execute(action: EditorAction): void {
    this.adapter?.execute(action);
  }

  protected setBlock(value: unknown): void {
    const style = this.blockStyles.find((item) => item === value);
    if (!style) throw new Error('Unknown editor block style');
    this.adapter?.setBlock(style.level);
    queueMicrotask(() => this.adapter?.focus());
  }

  private scheduleSelectionVisibility(): void {
    if (this.selectionFrame !== undefined) cancelAnimationFrame(this.selectionFrame);
    this.selectionFrame = requestAnimationFrame(() => {
      this.selectionFrame = undefined;
      if (!this.focused() || this.readonly || !window.matchMedia('(max-width: 632px)').matches)
        return;
      const selection = window.getSelection();
      if (!selection?.rangeCount || !this.editorHost.nativeElement.contains(selection.anchorNode))
        return;
      const caret = selection.getRangeAt(0).getBoundingClientRect();
      const toolbarTop = this.toolbarHost.nativeElement.getBoundingClientRect().top;
      if (caret.height && caret.bottom > toolbarTop - 16) {
        window.scrollBy(0, caret.bottom - toolbarTop + 16);
      }
    });
  }
}
