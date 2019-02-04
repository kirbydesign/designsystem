import { Component, OnInit, Input, ElementRef, Renderer2, OnDestroy } from '@angular/core';

import { ResizeObserverService } from '~/kirby/components/shared/resize-observer/resize-observer.service';
import { ResizeObserverEntry } from '~/kirby/components/shared/resize-observer/types/resize-observer-entry';

@Component({
  selector: 'kirby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() subtitle: string;
  private _sizes = this.sortSizesByBreakpoint({
    'small': 360,
    'medium': 720,
    'large': 1024
  });

  @Input()
  set sizes(value: {[size: string]: number }) {
    if (typeof value === 'string') {
      console.error('Sizes property cannot be a string. Please ensure the size property is bound as an expression:\n[sizes]="{...}"');
    }
    this._sizes = this.sortSizesByBreakpoint(value);
  }

  constructor(
    private elementRef: ElementRef,
    private resizeObserverService: ResizeObserverService,
    private renderer: Renderer2) {
  }

  ngOnInit() {
    this.resizeObserverService.observe(this.elementRef, (entry) => this.handleResize(entry));
  }

  ngOnDestroy() {
    this.resizeObserverService.unobserve(this.elementRef);
  }

  private sortSizesByBreakpoint(sizes: {[size: string]: number }) {
    return Object.entries(sizes).sort(this.compareSizesByBreakpoint);
  }

  private compareSizesByBreakpoint(a: [string, number], b: [string, number]): number {
    return a[1] > b[1] ? 1 : (b[1] > a[1] ? -1 : 0);
  }

  private handleResize(entry: ResizeObserverEntry) {
    const sizeAttributeName = 'size';
    const smallestSize = this._sizes[0][0];
    const smallestWidth = this._sizes[0][1];
    if (entry.contentRect.width < smallestWidth) {
      this.renderer.setAttribute(entry.target, sizeAttributeName, `<${smallestSize}`);
    } else {
      this._sizes.forEach(([size, width]) => {
        if (entry.contentRect.width >= width) {
          this.renderer.setAttribute(entry.target, sizeAttributeName, size);
        }
      });
    }
  }

}
