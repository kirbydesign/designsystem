import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';
import { UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';
import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import type { RichTextEditorComponent } from '../../public-components/rich-text-editor/rich-text-editor.component';
import {
  RichTextEditorAction,
  RichTextEditorBlockLevel,
  RichTextEditorTexts,
} from '../../rich-text-editor.types';

@Component({
  selector: 'kirby-x-rich-text-editor-toolbar',
  imports: [ButtonComponent, DropdownComponent, ListItemTemplateDirective],
  templateUrl: './rich-text-editor-toolbar.component.html',
  styleUrl: './rich-text-editor-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'kirby-surface-raised',
    role: 'group',
    '[attr.aria-label]': 'labels().toolbar',
    '[class.editor-focused]': 'editor().focused()',
    '[class.editor-readonly]': 'editor().readonly',
    '[style.--editor-keyboard-bottom]': 'keyboardBottom() + "px"',
  },
})
export class RichTextEditorToolbarComponent implements AfterViewInit, OnDestroy {
  readonly editor = input.required<RichTextEditorComponent>();
  protected readonly labels = computed(() => this.editor().labels());
  protected readonly state = computed(() => this.editor().state());
  protected readonly disabled = computed(() => this.editor().readonly || !this.state());
  protected readonly keyboardBottom = signal(0);
  protected readonly styleLabelId = UniqueIdGenerator.scopedTo('rich-text-editor-style').next();
  protected readonly toolbar = [
    { action: 'bold', text: 'boldText', shortcut: 'Control+B Meta+B' },
    { action: 'italic', text: 'italicText', shortcut: 'Control+I Meta+I' },
    { action: 'underline', text: 'underlineText', shortcut: 'Control+U Meta+U' },
    { action: 'bulletList', text: null, shortcut: 'Control+Shift+8 Meta+Shift+8' },
    { action: 'orderedList', text: null, shortcut: 'Control+Shift+7 Meta+Shift+7' },
  ] satisfies {
    action: RichTextEditorAction;
    text: keyof RichTextEditorTexts | null;
    shortcut: string;
  }[];
  protected readonly history = [
    { action: 'undo', shortcut: 'Control+Z Meta+Z' },
    { action: 'redo', shortcut: 'Control+Shift+Z Meta+Shift+Z' },
  ] satisfies { action: 'undo' | 'redo'; shortcut: string }[];
  protected readonly blockStyles: {
    key: keyof RichTextEditorTexts;
    text: string;
    level: RichTextEditorBlockLevel;
  }[] = [
    { key: 'heading1', text: '', level: 1 },
    { key: 'heading2', text: '', level: 2 },
    { key: 'heading3', text: '', level: 3 },
    { key: 'normal', text: '', level: 0 },
  ];
  protected readonly blockIndex = computed(() =>
    this.blockStyles.findIndex((style) => style.level === (this.state()?.block ?? 0))
  );
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private viewport?: VisualViewport;
  private viewportFrame?: number;
  private resizeObserver?: ResizeObserver;
  private readonly updateViewport = () => {
    if (!this.viewport) return;
    this.keyboardBottom.set(
      Math.max(0, window.innerHeight - this.viewport.height - this.viewport.offsetTop)
    );
    this.scheduleViewportUpdate();
  };

  constructor() {
    this.observeLabels();
    this.observeEditorViewport();
  }

  ngAfterViewInit(): void {
    this.observeToolbarSize();
    this.observeViewport();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.viewport?.removeEventListener('resize', this.updateViewport);
    this.viewport?.removeEventListener('scroll', this.updateViewport);
    if (this.viewportFrame !== undefined) cancelAnimationFrame(this.viewportFrame);
  }

  protected setBlock(value: unknown): void {
    const style = this.blockStyles.find((item) => item === value);
    if (!style) throw new Error('Unknown editor block style');
    this.editor().setBlock(style.level);
  }

  private observeLabels(): void {
    effect(() => {
      const labels = this.labels();
      for (const style of this.blockStyles) style.text = labels[style.key];
    });
  }

  private observeEditorViewport(): void {
    effect((onCleanup) => {
      const editor = this.editor();
      this.disabled();
      editor.focused();
      this.scheduleViewportUpdate();
      onCleanup(() => editor.setScrollClearance(0));
    });
  }

  private observeToolbarSize(): void {
    this.resizeObserver = new ResizeObserver(() => this.scheduleViewportUpdate());
    this.resizeObserver.observe(this.elementRef.nativeElement);
  }

  private observeViewport(): void {
    this.viewport = window.visualViewport ?? undefined;
    this.viewport?.addEventListener('resize', this.updateViewport);
    this.viewport?.addEventListener('scroll', this.updateViewport);
    this.updateViewport();
  }

  private scheduleViewportUpdate(): void {
    if (this.viewportFrame !== undefined) cancelAnimationFrame(this.viewportFrame);
    this.viewportFrame = requestAnimationFrame(() => {
      this.viewportFrame = undefined;
      const editor = this.editor();
      const height =
        !editor.readonly && window.matchMedia('(max-width: 632px)').matches
          ? this.elementRef.nativeElement.getBoundingClientRect().height
          : 0;
      editor.setScrollClearance(height ? height + 16 : 0);
      editor.scrollIntoView();
    });
  }
}
