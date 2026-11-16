import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import type { RichTextEditorComponent } from '../../public-components/rich-text-editor/rich-text-editor.component';
import {
  RichTextEditorBlockLevel,
  RichTextEditorFormattingAction,
} from '../../rich-text-editor.types';

@Component({
  selector: 'kirby-x-rich-text-editor-toolbar',
  imports: [ButtonComponent, DropdownComponent, IconComponent, ListItemTemplateDirective],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'kirby-surface-raised',
    role: 'group',
    '[attr.aria-label]': 'labels().toolbar',
    '[class.editor-empty-toolbar]': '!items().length',
  },
})
export class ToolbarComponent {
  readonly editor = input.required<RichTextEditorComponent>();
  protected readonly labels = computed(() => this.editor().resolvedLabels());
  protected readonly items = computed(() => this.editor().toolbarItems);
  protected readonly state = computed(() => this.editor().state());
  protected readonly disabled = computed(() => this.editor().readonly || !this.state());
  protected readonly buttons = {
    bold: { icon: 'bold', shortcut: 'Control+B Meta+B' },
    italic: { icon: 'italic', shortcut: 'Control+I Meta+I' },
    underline: { icon: 'underline', shortcut: 'Control+U Meta+U' },
    bulletList: { icon: 'unordered-bullets', shortcut: 'Control+Shift+8 Meta+Shift+8' },
    orderedList: { icon: 'ordered-bullets', shortcut: 'Control+Shift+7 Meta+Shift+7' },
  } satisfies Record<RichTextEditorFormattingAction, { icon: string; shortcut: string }>;
  protected readonly blockStyles = computed(() => {
    const labels = this.labels();
    return [
      { text: labels.heading1, level: 1 },
      { text: labels.heading2, level: 2 },
      { text: labels.heading3, level: 3 },
      { text: labels.normal, level: 0 },
    ] satisfies { text: string; level: RichTextEditorBlockLevel }[];
  });
  protected readonly blockIndex = computed(() =>
    this.blockStyles().findIndex((style) => style.level === (this.state()?.block ?? 0))
  );
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly styleDropdown = viewChild(DropdownComponent);
  constructor() {
    this.observeToolbarItems();
  }

  protected setBlock(value: unknown): void {
    const style = this.blockStyles().find((item) => item === value);
    if (!style) throw new Error('Unknown editor block style');
    this.editor().setBlock(style.level);
  }

  private observeToolbarItems(): void {
    effect(() => {
      const items = this.items();
      const focusedItem = document.activeElement?.closest('[data-toolbar-item]');
      if (
        focusedItem &&
        this.elementRef.nativeElement.contains(focusedItem) &&
        !items.some((item) => item === focusedItem.getAttribute('data-toolbar-item'))
      ) {
        this.editor().focus();
      }
      const dropdown = this.styleDropdown();
      if (!items.includes('textStyle') && dropdown?.isOpen) {
        dropdown.close();
        this.editor().focus();
      }
    });
  }
}
