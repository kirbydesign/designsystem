import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { ResizeObserverService } from '@kirbydesign/designsystem/shared';

/**
 * @Description Temporary directive to ensure correct scroll position behavior on Safari.
 *
 * When navigating between stacked pages, scroll position is not correctly restored on Safari,
 * when the nested kirby-card element uses containment and the host element does not have an explicit height.
 */
@Directive({
  selector: `[kirbyImageBannerResize]`,
})
export class ImageBannerHeightDirective implements OnInit, OnDestroy {
  private currentHeight: number = 0;
  private host = inject(ElementRef);
  private resizeObserverService = inject(ResizeObserverService);

  ngOnInit() {
    this.resizeObserverService.observe(this.host, (entry) => this.setCardHeightOnHost(entry));
  }

  ngOnDestroy() {
    this.resizeObserverService.unobserve(this.host);
  }

  private setCardHeightOnHost(entry: ResizeObserverEntry) {
    const hostElement = entry.target as HTMLElement;
    const card = hostElement.querySelector('kirby-card');
    const cardHeight = card?.getBoundingClientRect().height;

    if (!hostElement || !cardHeight) return;
    if (cardHeight === this.currentHeight) return;

    this.currentHeight = cardHeight;
    hostElement.style.minHeight = `${this.currentHeight}px`;
  }
}
