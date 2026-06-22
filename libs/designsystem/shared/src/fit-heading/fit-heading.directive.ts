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

  private originalSize: HeadingSize;

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
      // Capture original CSS size before any scaling
      const computed = getComputedStyle(this.elementRef.nativeElement);
      this.originalSize = {
        name: 'original',
        fontSize: computed.fontSize,
        lineHeight: computed.lineHeight,
      };

      // Skip line-clamp for elements with line-height: normal (e.g. key-value) — conflicts with flex layout
      if (computed.lineHeight !== 'normal') {
        this.lineClampHelper.setMaxLines(this.elementRef.nativeElement, this.config.maxLines);
      }

      this.hostElementClone = this.generateHostElementClone();
      this.renderer.appendChild(this.elementRef.nativeElement.parentElement, this.hostElementClone);
    }

    // Use parent width to avoid feedback loop from shrink-wrapped element width
    const availableWidth = this.elementRef.nativeElement.parentElement.clientWidth;
    this.renderer.setStyle(this.hostElementClone, 'width', `${availableWidth}px`);

    // Try original CSS size first, then scale down through heading sizes
    const candidates = [this.originalSize, ...this.headingSizes];
    const fallbackSize = this.headingSizes[this.headingSizes.length - 1];
    const fittedSize = candidates.find(this.canFitHeading.bind(this)) || fallbackSize;

    this.setSize(this.elementRef.nativeElement, fittedSize);
    this.lineClampHelper.setLineHeight(this.elementRef.nativeElement, fittedSize.lineHeight);
    this.isScalingHeader = false;
  }

  private canFitHeading(size: HeadingSize) {
    this.setSize(this.hostElementClone, size);
    // Resolve line-height to pixels via getComputedStyle (handles unitless ratios)
    const computedLineHeight = parseFloat(
      getComputedStyle(this.hostElementClone as HTMLElement).lineHeight
    );
    // Skip vertical check for line-height: normal (single-line content like values)
    const fitsVertically = isNaN(computedLineHeight)
      ? true
      : Math.round(this.hostElementClone.clientHeight / computedLineHeight) <= this.config.maxLines;
    // Check horizontal overflow for non-wrapping content (e.g. numbers)
    const fitsHorizontally = this.hostElementClone.scrollWidth <= this.hostElementClone.clientWidth;
    return fitsVertically && fitsHorizontally;
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
