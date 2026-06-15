import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { LineClampHelper } from '@kirbydesign/designsystem/helpers';
import { ResizeObserverService } from '../resize-observer/resize-observer.service';

const fontSize = DesignTokenHelper.fontSize;
const lineHeight = DesignTokenHelper.lineHeight;

interface HeadingSize {
  name: string;
  fontSize: string;
  lineHeight: string;
}

export interface FitHeadingConfig {
  maxLines: number;
}

@Directive({
  standalone: true,
  selector: `h1[kirbyFitHeading],h2[kirbyFitHeading],h3[kirbyFitHeading],[kirbyFitHeading]`,
  providers: [LineClampHelper],
})
export class FitHeadingDirective implements OnInit, OnDestroy {
  @Input('kirbyFitHeading') config?: FitHeadingConfig;

  private isObservingHostElement: boolean;
  private hostElementClone: Element;
  private isScalingHeader: boolean; // used to prevent resizeObserver to trigger on font scaling by this.scaleHeader()

  private headingSizes: HeadingSize[] = [
    {
      name: 'h1',
      fontSize: fontSize('xl'),
      lineHeight: lineHeight('xl'),
    },
    {
      name: 'h2',
      fontSize: fontSize('l'),
      lineHeight: lineHeight('l'),
    },
    {
      name: 'h3',
      fontSize: fontSize('m'),
      lineHeight: lineHeight('m'),
    },
  ];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private resizeObserverService: ResizeObserverService,
    private lineClampHelper: LineClampHelper
  ) {}

  ngOnInit(): void {
    if (this.config && this.config.maxLines) {
      this.lineClampHelper.setMaxLines(this.elementRef.nativeElement, this.config.maxLines);
      this.observeResize();
      this.isObservingHostElement = true;
    }
  }

  ngOnDestroy(): void {
    if (this.isObservingHostElement) {
      this.resizeObserverService.unobserve(this.elementRef);
      if (this.hostElementClone) {
        this.renderer.removeChild(this.elementRef.nativeElement, this.hostElementClone);
      }
    }
  }

  private observeResize(): void {
    this.resizeObserverService.observe(this.elementRef, () => {
      /**
       * setTimeout is used here to avoid repeated size changes
       * while the first size change is still ongoing.
       * This would result in the ResizeObserver being called again,
       * giving 'ResizeObserver loop limit exceeded' types of errors.
       */
      setTimeout(() => {
        this.scaleHeader();
      }, 0);
    });
  }

  private scaleHeader(): void {
    if (this.isScalingHeader) return;

    this.isScalingHeader = true;

    if (!this.hostElementClone) {
      this.hostElementClone = this.generateHostElementClone();
      this.renderer.appendChild(this.elementRef.nativeElement.parentElement, this.hostElementClone);
    }

    // Use the parent element's width to determine available space.
    // Using the host element's own clientWidth causes a feedback loop:
    // the element shrink-wraps to its text content, so when font scales down
    // the element gets narrower, making the clone narrower, which causes
    // unnecessary further downscaling.
    const availableWidth = this.elementRef.nativeElement.parentElement.clientWidth;
    this.renderer.setStyle(this.hostElementClone, 'width', `${availableWidth}px`);

    const fallbackSize = this.headingSizes[this.headingSizes.length - 1];
    const fittedSize = this.headingSizes.find(this.canFitHeading.bind(this)) || fallbackSize;

    this.setSize(this.elementRef.nativeElement, fittedSize);
    this.lineClampHelper.setLineHeight(this.elementRef.nativeElement, fittedSize.lineHeight);
    this.isScalingHeader = false;
  }

  private canFitHeading(size: HeadingSize) {
    this.setSize(this.hostElementClone, size);
    // Use getComputedStyle to get the resolved line-height in pixels.
    // The token line-height may be a unitless ratio (e.g. 1.1875) rather than
    // a pixel value, so parseInt would return 1 and break the calculation.
    const computedLineHeight = parseFloat(
      getComputedStyle(this.hostElementClone as HTMLElement).lineHeight
    );
    const lines = this.hostElementClone.clientHeight / computedLineHeight;
    return Math.round(lines) <= this.config.maxLines;
  }

  private generateHostElementClone(): Element {
    const clone = this.elementRef.nativeElement.cloneNode(true);
    this.renderer.setStyle(clone, 'position', 'absolute');
    this.renderer.setStyle(clone, 'visibility', 'hidden');
    this.lineClampHelper.removeLineClamp(clone);
    return clone;
  }

  private setSize(el: Element, size: HeadingSize): void {
    this.renderer.setStyle(el, 'font-size', size.fontSize);
    this.renderer.setStyle(el, 'line-height', size.lineHeight);
  }
}
