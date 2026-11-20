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
import { DocumentComponent } from '../../components/document/document.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { defaultLabels } from '../../rich-text-editor.defaults';
import { assertToolbarItems } from '../../rich-text-editor.toolbar';
import {
  RichTextEditorAction,
  RichTextEditorBlockLevel,
  RichTextEditorConfig,
  RichTextEditorLabels,
  RichTextEditorState,
} from '../../rich-text-editor.types';

@Component({
  selector: 'kirby-x-rich-text-editor',
  imports: [ToolbarComponent, DocumentComponent],
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.aria-describedby]': 'null',
  },
})
export class RichTextEditorComponent implements OnInit, OnDestroy {
  @Input() value = '';
  @Input() config: RichTextEditorConfig = {};
  @Input() labels: Partial<RichTextEditorLabels> = {};
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
  @ViewChild(DocumentComponent, { static: true })
  private document!: DocumentComponent;

  private readonly readonlyState = signal(false);
  protected readonly editorState = signal<Readonly<RichTextEditorState> | undefined>(undefined);
  private readonly labelState = signal<Readonly<RichTextEditorLabels>>(defaultLabels);
  readonly state = this.editorState.asReadonly();
  readonly resolvedLabels = this.labelState.asReadonly();

  ngOnInit(): void {
    assertToolbarItems(this.config.toolbarItems ?? []);
    this.initializeLabels();
  }

  ngOnDestroy(): void {
    this.editorState.set(undefined);
  }

  execute(action: RichTextEditorAction): void {
    this.document?.execute(action);
  }

  focus(): void {
    this.document?.focus();
  }

  blur(): void {
    this.document?.blur();
  }

  setBlock(level: RichTextEditorBlockLevel): void {
    this.document?.setBlock(level);
  }

  containsSelection(selection: Selection): boolean {
    return this.document.containsSelection(selection);
  }

  private initializeLabels(): void {
    this.labelState.set({ ...defaultLabels, ...this.labels });
  }
}
