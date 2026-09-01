import { DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import {
  SegmentedControlComponent,
  SegmentItem,
} from '@kirbydesign/designsystem/segmented-control';

/**
 * A small, globally-mounted control that lets you preview any cookbook page on the
 * different Kirby surfaces. Selecting a surface toggles the corresponding
 * `kirby-surface-*` theming-context class on the document root (`<html>`), which
 * re-scopes Kirby's semantic color tokens for everything rendered below it.
 */
@Component({
  selector: 'cookbook-theme-surface-control',
  templateUrl: './theme-surface-control.component.html',
  styleUrls: ['./theme-surface-control.component.scss'],
  imports: [IconComponent, SegmentedControlComponent],
})
export class ThemeSurfaceControlComponent {
  private readonly document = inject(DOCUMENT);

  protected readonly items: SegmentItem[] = [
    { text: 'Base', id: 'kirby-surface-base' },
    { text: 'Raised', id: 'kirby-surface-raised' },
    { text: 'Brand', id: 'kirby-surface-brand' },
  ];

  protected readonly selectedIndex = signal(0);

  private readonly selectedSurface = computed(() => this.items[this.selectedIndex()].id);

  constructor() {
    effect(() => {
      const surfaceClasses = this.items.map((item) => item.id);
      const htmlElement = this.document.documentElement;

      htmlElement.classList.remove(...surfaceClasses);
      htmlElement.classList.add(this.selectedSurface());
    });
  }

  protected onSegmentSelect(segment: SegmentItem): void {
    this.selectedIndex.set(this.items.findIndex((item) => item.id === segment.id));
  }
}
