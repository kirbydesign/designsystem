import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { ResizeObserverService } from '@kirbydesign/designsystem/components/shared/resize-observer/resize-observer.service';
import { ResizeObserverEntry } from '@kirbydesign/designsystem/components/shared/resize-observer/types/resize-observer-entry';

interface Size {
  name: string;
  fontSize: string;
  lineHeight: string;
}

@Directive({
  selector: `h1[kirbyFitText],h2[kirbyFitText],h3[kirbyFitText]`,
})
export class FitHeaderDirective implements OnInit, OnDestroy {
  // TODO: Should be configurable
  maxLines: number = 1;
  private lineHeight: number;
  private height: number;
  private width: number;
  private clone: Element;
  private scalingHeader: boolean;

  /*
   * TODO: GET SIZES FROM _variables.scss
   */
  private sizes: Size[] = [
    {
      name: 'h1',
      fontSize: '32px',
      lineHeight: '38px',
    },
    {
      name: 'h2',
      fontSize: '22px',
      lineHeight: '28px',
    },
    {
      name: 'h3',
      fontSize: '18px',
      lineHeight: '24px',
    },
  ];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private resizeObserverService: ResizeObserverService
  ) {}

  ngOnInit(): void {
    this.observeResize();
  }

  ngOnDestroy(): void {
    this.resizeObserverService.unobserve(this.elementRef);
    this.renderer.removeChild(this.elementRef.nativeElement, this.clone);
  }

  private observeResize(): void {
    this.resizeObserverService.observe(this.elementRef, (entry: ResizeObserverEntry) => {
      this.handleResize(entry);
    });
  }

  private handleResize(entry: ResizeObserverEntry) {
    if (!this.shouldScale(entry.target)) return;

    // Set width to detirmine at next resize if header should be scaled up again
    this.width = entry.target.clientWidth;
    this.scaleHeader();
  }

  private shouldScale(el: Element): boolean {
    this.height = el.clientHeight;

    if (this.height === 0 || this.scalingHeader) return false;

    this.lineHeight = parseInt(
      window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('line-height')
    );

    // TODO: DONT TRIGGER IF SMALLEST IF DOING DOWN OR LARGEST IF GOING UP
    const lines = this.height / this.lineHeight;
    if (lines > this.maxLines) {
      return true;
    } else if (this.width < el.clientWidth) {
      return true;
    } else {
      return false;
    }
  }

  private scaleHeader(): void {
    this.scalingHeader = true;

    if (!this.clone) {
      this.clone = this.generateClone();
      this.renderer.appendChild(this.elementRef.nativeElement, this.clone);
    }

    this.renderer.setStyle(this.clone, 'width', `${this.elementRef.nativeElement.clientWidth}px`);

    const fittedSize: Size =
      this.sizes.filter((size: Size) => {
        this.setSize(this.clone, size);
        const lines = this.clone.clientHeight / parseInt(size.lineHeight);
        return lines <= this.maxLines;
      })[0] || this.sizes[this.sizes.length - 1];

    this.setSize(this.elementRef.nativeElement, fittedSize);
    this.scalingHeader = false;
  }

  private generateClone(): Element {
    const clone = this.elementRef.nativeElement.cloneNode(true);
    this.renderer.setStyle(clone, 'position', 'absolute');
    this.renderer.setStyle(clone, 'visibility', 'hidden');
    return clone;
  }

  private setSize(el: Element, size: Size): void {
    this.renderer.setStyle(el, 'font-size', size.fontSize);
    this.renderer.setStyle(el, 'line-height', size.lineHeight);
  }
}
