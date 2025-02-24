import { Directive, ElementRef, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ResizeObserverService } from '@kirbydesign/designsystem/shared';

/**
 * @Description Temporary directive to ensure correct scroll position behavior on Safari.
 */
@Directive({
  selector: `kirby-x-image-banner[kirbyImageBannerResize]`,
  standalone: true,
})
export class ImageBannerResizeDirective implements OnInit, OnDestroy {
  private host = inject(ElementRef);
  private renderer = inject(Renderer2);
  private resizeObserverService = inject(ResizeObserverService);

  private readonly CONTAINER_BREAKPOINT = 600; // pixels
  private readonly CONTAINER_MORE_THAN_CSS_CLASS_NAME = 'container-more-than-width';
  private readonly CONTAINER_LESS_THAN_CSS_CLASS_NAME = 'container-less-than-width';

  ngOnInit() {
    this.resizeObserverService.observe(this.host.nativeElement, (entry) =>
      this.handleHostResize(entry)
    );
  }

  ngOnDestroy() {
    this.resizeObserverService.unobserve(this.host.nativeElement);
  }

  private handleHostResize(entry: ResizeObserverEntry) {
    if (entry.contentRect.width < this.CONTAINER_BREAKPOINT) {
      this.renderer.removeClass(this.host.nativeElement, this.CONTAINER_MORE_THAN_CSS_CLASS_NAME);
      this.renderer.addClass(this.host.nativeElement, this.CONTAINER_LESS_THAN_CSS_CLASS_NAME);
    } else {
      this.renderer.removeClass(this.host.nativeElement, this.CONTAINER_LESS_THAN_CSS_CLASS_NAME);
      this.renderer.addClass(this.host.nativeElement, this.CONTAINER_MORE_THAN_CSS_CLASS_NAME);
    }
  }
}
