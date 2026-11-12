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
import { EDITOR_ADAPTER_FACTORY } from '../../editor-adapter/editor-adapter-factory';
import {
  EditorSettings,
  RichTextEditorAdapter,
} from '../../editor-adapter/rich-text-editor-adapter';
import {
  RichTextEditorAction,
  RichTextEditorBlockLevel,
  RichTextEditorCreatedEvent,
  RichTextEditorState,
} from '../../rich-text-editor.types';

@Component({
  selector: 'kirby-x-rich-text-editor-writing-area',
  templateUrl: './rich-text-editor-writing-area.component.html',
  styleUrl: './rich-text-editor-writing-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'kirby-rich-text-writing-area',
    '[class.with-toolbar]': 'hasToolbar',
  },
})
export class RichTextEditorWritingAreaComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() value = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() ariaLabel = '';
  @Input() ariaDescribedby = '';
  @Input() hasToolbar = true;
  @Output() valueChange = new EventEmitter<string>();
  @Output() stateChange = new EventEmitter<Readonly<RichTextEditorState>>();
  @Output() editorFocus = new EventEmitter<void>();
  @Output() editorBlur = new EventEmitter<void>();
  @Output() editorCreated = new EventEmitter<RichTextEditorCreatedEvent>();
  @ViewChild('editorHost', { static: true }) private editorHost!: ElementRef<HTMLElement>;

  protected readonly empty = signal(false);
  private readonly createAdapter = inject(EDITOR_ADAPTER_FACTORY);
  private readonly zone = inject(NgZone);
  private adapter?: RichTextEditorAdapter;
  private scrollClearance = 0;

  private get settings(): EditorSettings {
    return {
      placeholder: this.placeholder,
      readonly: this.readonly,
      label: this.ariaLabel,
      describedBy: this.ariaDescribedby,
      scrollClearance: this.scrollClearance,
    };
  }

  ngAfterViewInit(): void {
    this.initializeEditor();
    this.emitEditorCreated();
  }

  ngOnChanges(changes: SimpleChanges): void {
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
    this.adapter?.destroy();
    this.adapter = undefined;
  }

  execute(action: RichTextEditorAction): void {
    this.adapter?.execute(action);
  }

  setBlock(level: RichTextEditorBlockLevel): void {
    this.adapter?.setBlock(level);
    queueMicrotask(() => this.adapter?.focus());
  }

  setScrollClearance(bottom: number): void {
    if (!Number.isFinite(bottom) || bottom < 0)
      throw new RangeError('Scroll clearance must be a non-negative finite number');
    if (bottom === this.scrollClearance) return;
    this.scrollClearance = bottom;
    this.adapter?.configure(this.settings);
  }

  scrollIntoView(): void {
    if (!this.readonly && this.editorHost.nativeElement.contains(document.activeElement)) {
      this.adapter?.scrollIntoView();
    }
  }

  containsSelection(selection: Selection): boolean {
    return this.editorHost.nativeElement.contains(selection.anchorNode);
  }

  private initializeEditor(): void {
    this.adapter = this.createAdapter();
    this.adapter.mount(this.editorHost.nativeElement, {
      value: this.value,
      ...this.settings,
      onChange: (value) => this.zone.run(() => this.valueChange.emit(value)),
      onStateChange: (state) =>
        this.zone.run(() => {
          this.empty.set(state.empty);
          this.stateChange.emit(state);
        }),
      onFocus: () => this.zone.run(() => this.editorFocus.emit()),
      onBlur: () => this.zone.run(() => this.editorBlur.emit()),
    });
  }

  private emitEditorCreated(): void {
    this.editorCreated.emit({
      editor: {
        focus: () => this.adapter?.focus(),
        blur: () => this.adapter?.blur(),
      },
    });
  }
}
