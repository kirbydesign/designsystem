import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

import { ResizeObserverService } from '~/kirby/components/shared/resize-observer/resize-observer.service';
import { ResizeObserverEntry } from '~/kirby/components/shared/resize-observer/types/resize-observer-entry';

@Component({
  selector: 'kirby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  private sizes = {
    ['card-small']: 360,
    ['card-medium']: 720,
    ['card-large']: 1024
  };

  constructor(
    private elementRef: ElementRef,
    private resizeObserverService: ResizeObserverService,
    private renderer: Renderer2) {
  }

  ngOnInit() {
    this.resizeObserverService.observe(this.elementRef, (entry) => this.handleResize(entry));
  }

  private handleResize(entry: ResizeObserverEntry) {
    Object.entries(this.sizes).forEach(([size, width]) => {
      if (entry.contentRect.width >= width) {
        // this.renderer.setAttribute(entry.target, size, '');
        this.renderer.addClass(entry.target, size);
      } else {
        // this.renderer.removeAttribute(entry.target, size);
        this.renderer.removeClass(entry.target, size);
      }
    });
  }

}
