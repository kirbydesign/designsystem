import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { WritingAreaComponent } from '../../components/writing-area/writing-area.component';
import { defaultLabels, defaultToolbarItems } from '../../rich-text-editor.defaults';
import {
  RichTextEditorAction,
  RichTextEditorBlockLevel,
  RichTextEditorConfig,
  RichTextEditorLabels,
  RichTextEditorState,
  RichTextEditorToolbarItem,
} from '../../rich-text-editor.types';

@Component({
  selector: 'kirby-x-rich-text-editor',
  imports: [ToolbarComponent, WritingAreaComponent],
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'kirby-surface-raised',
    '[class.editor-without-toolbar]': '!toolbarItems.length',
    '[attr.aria-describedby]': 'null',
  },
})
export class RichTextEditorComponent implements OnInit, OnDestroy {
  @Input() value = '';
  @Input() config: RichTextEditorConfig = {};
  @Input() labels: Partial<RichTextEditorLabels> = {};
  @Input() get toolbarItems(): readonly RichTextEditorToolbarItem[] {
    return this.toolbarItemState();
  }
  set toolbarItems(items: readonly RichTextEditorToolbarItem[]) {
    this.updateToolbarItems(items);
  }
  @Input() get readonly(): boolean {
    return this.readonlyState();
  }
  set readonly(value: boolean) {
    this.readonlyState.set(value);
  }
  @Input('aria-describedby') ariaDescribedby = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() editorFocus = new EventEmitter<void>();
  @Output() editorBlur = new EventEmitter<void>();
  @ViewChild(WritingAreaComponent, { static: true })
  private writingArea!: WritingAreaComponent;

  private readonly readonlyState = signal(false);
  protected readonly editorState = signal<Readonly<RichTextEditorState> | undefined>(undefined);
  private readonly editorFocused = signal(false);
  private readonly toolbarItemState = signal(defaultToolbarItems);
  private readonly labelState = signal<Readonly<RichTextEditorLabels>>(defaultLabels);
  readonly state = this.editorState.asReadonly();
  readonly focused = this.editorFocused.asReadonly();
  readonly resolvedLabels = this.labelState.asReadonly();

  ngOnInit(): void {
    this.initializeLabels();
  }

  ngOnDestroy(): void {
    this.editorState.set(undefined);
    this.editorFocused.set(false);
  }

  execute(action: RichTextEditorAction): void {
    this.writingArea?.execute(action);
  }

  focus(): void {
    this.writingArea?.focus();
  }

  blur(): void {
    this.writingArea?.blur();
  }

  setBlock(level: RichTextEditorBlockLevel): void {
    this.writingArea?.setBlock(level);
  }

  containsSelection(selection: Selection): boolean {
    return this.writingArea.containsSelection(selection);
  }

  protected onFocus(): void {
    this.editorFocused.set(true);
    this.editorFocus.emit();
  }

  protected onBlur(): void {
    this.editorFocused.set(false);
    this.editorBlur.emit();
  }

  private initializeLabels(): void {
    this.labelState.set({ ...defaultLabels, ...this.labels });
  }

  private updateToolbarItems(items: readonly RichTextEditorToolbarItem[]): void {
    if (!Array.isArray(items) || items.some((item) => !defaultToolbarItems.includes(item))) {
      throw new TypeError('Toolbar items must contain only supported rich text editor controls');
    }
    if (new Set(items).size !== items.length) {
      throw new Error('Rich text editor toolbar items must be unique');
    }
    this.toolbarItemState.set([...items]);
  }
}
