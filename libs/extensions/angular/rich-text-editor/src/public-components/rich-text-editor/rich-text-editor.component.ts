import {
  ChangeDetectionStrategy,
  Component,
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
import { RichTextEditorToolbarComponent } from '../../components/rich-text-editor-toolbar/rich-text-editor-toolbar.component';
import { RichTextEditorWritingAreaComponent } from '../../components/rich-text-editor-writing-area/rich-text-editor-writing-area.component';
import {
  RichTextEditorAction,
  RichTextEditorBlockLevel,
  RichTextEditorCreatedEvent,
  RichTextEditorState,
  RichTextEditorTexts,
} from '../../rich-text-editor.types';

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
  imports: [RichTextEditorToolbarComponent, RichTextEditorWritingAreaComponent],
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'kirby-surface-raised',
    '[class.editor-without-toolbar]': '!showToolbar',
    '[attr.aria-label]': 'null',
    '[attr.aria-describedby]': 'null',
  },
})
export class RichTextEditorComponent implements OnChanges, OnDestroy {
  @Input() value = '';
  @Input() placeholder = 'Write something...';
  @Input() showToolbar = true;
  @Input() get readonly(): boolean {
    return this.readonlyState();
  }
  set readonly(value: boolean) {
    this.readonlyState.set(value);
  }
  @Input() texts: Partial<RichTextEditorTexts> = {};
  @Input('aria-label') ariaLabel = 'Rich text editor';
  @Input('aria-describedby') ariaDescribedby = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() editorFocus = new EventEmitter<void>();
  @Output() editorBlur = new EventEmitter<void>();
  @Output() editorCreated = new EventEmitter<RichTextEditorCreatedEvent>();
  @ViewChild(RichTextEditorWritingAreaComponent, { static: true })
  private writingArea!: RichTextEditorWritingAreaComponent;

  private readonly readonlyState = signal(false);
  protected readonly editorState = signal<Readonly<RichTextEditorState> | undefined>(undefined);
  private readonly editorFocused = signal(false);
  private readonly textLabels = signal<Readonly<RichTextEditorTexts>>(defaultTexts);
  readonly state = this.editorState.asReadonly();
  readonly focused = this.editorFocused.asReadonly();
  readonly labels = this.textLabels.asReadonly();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['texts']) {
      this.textLabels.set({ ...defaultTexts, ...this.texts });
    }
  }

  ngOnDestroy(): void {
    this.editorState.set(undefined);
    this.editorFocused.set(false);
  }

  execute(action: RichTextEditorAction): void {
    this.writingArea?.execute(action);
  }

  setBlock(level: RichTextEditorBlockLevel): void {
    this.writingArea?.setBlock(level);
  }

  setScrollClearance(bottom: number): void {
    this.writingArea.setScrollClearance(bottom);
  }

  scrollIntoView(): void {
    this.writingArea.scrollIntoView();
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
}
