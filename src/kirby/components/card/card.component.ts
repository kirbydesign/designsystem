import { Component, OnInit, Input, ElementRef, Renderer2, OnDestroy } from '@angular/core';

import { ResizeObserverService } from '../shared/resize-observer/resize-observer.service';
import { ResizeObserverEntry } from '../shared/resize-observer/types/resize-observer-entry';

@Component({
  selector: 'kirby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() subtitle: string;
  private sizes = {
    ['small']: 360,
    ['medium']: 720,
    ['large']: 1024
  };

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

  private handleResize(entry: ResizeObserverEntry) {
    const sizeAttributeName = 'size';
    const smallest = this.sizes['small'];
    if (entry.contentRect.width < smallest) {
      this.renderer.removeAttribute(entry.target, sizeAttributeName);
    } else {
      Object.entries(this.sizes).forEach(([size, width]) => {
        if (entry.contentRect.width >= width) {
          this.renderer.setAttribute(entry.target, sizeAttributeName, size);
        }
      });
    }
  }

}
