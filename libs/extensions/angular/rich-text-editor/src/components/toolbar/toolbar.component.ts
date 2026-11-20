import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import type { RichTextEditorComponent } from '../../public-components/rich-text-editor/rich-text-editor.component';
import type { RichTextEditorFormattingAction } from '../../rich-text-editor.types';
import { createToolbarControl } from './toolbar.config';

@Component({
  selector: 'kirby-x-rich-text-editor-toolbar',
  imports: [ButtonComponent, DropdownComponent, IconComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'group',
    '[attr.aria-label]': 'labels().toolbar',
    '[class.editor-empty-toolbar]': '!controls().length',
  },
})
export class ToolbarComponent {
  readonly editor = input.required<RichTextEditorComponent>();
  protected readonly labels = computed(() => this.editor().resolvedLabels());
  protected readonly state = computed(() => this.editor().state());
  protected readonly disabled = computed(() => this.editor().readonly || !this.state());
  protected readonly controls = computed(() =>
    (this.editor().config.toolbarItems ?? []).map(createToolbarControl)
  );
  protected readonly blockIndex = computed(() => {
    const dropdown = this.controls().find((control) => control.kind === 'dropdown');
    return dropdown?.options.findIndex((style) => style.level === (this.state()?.block ?? 0)) ?? -1;
  });

  protected isActive(action: RichTextEditorFormattingAction): boolean {
    return this.state()?.active.includes(action) ?? false;
  }

  protected preserveEditorSelection(event: PointerEvent): void {
    event.preventDefault();
  }

  protected execute(action: RichTextEditorFormattingAction): void {
    this.editor().execute(action);
  }

  protected setBlock(value: unknown): void {
    const dropdown = this.controls().find((control) => control.kind === 'dropdown');
    const style = dropdown?.options.find((item) => item === value);
    if (!style) throw new Error('Unknown editor block style');
    this.editor().setBlock(style.level);
  }
}
