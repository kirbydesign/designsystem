import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { LineClampHelper } from '@kirbydesign/designsystem/helpers';
import { ResizeObserverService } from '../resize-observer/resize-observer.service';

const fontSize = DesignTokenHelper.fontSize;
// const lineHeight = DesignTokenHelper.lineHeight;

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
  selector: `h1[kirbyFitHeading],h2[kirbyFitHeading],h3[kirbyFitHeading]`,
  providers: [LineClampHelper],
})
export class FitHeadingDirective implements OnInit, OnDestroy {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('kirbyFitHeading') config?: FitHeadingConfig;

  private isObservingHostElement: boolean;
  private hostElementClone: Element;
  private isScalingHeader: boolean; // used to prevent resizeObserver to trigger on font scaling by this.scaleHeader()

  private headingSizes: HeadingSize[] = [
    {
      name: 'h1',
      fontSize: fontSize('xl'),
      // lineHeight: lineHeight('xl'),
      lineHeight: 'calc(38 / 32)', // calculated from old px values
    },
    {
      name: 'h2',
      fontSize: fontSize('l'),
      // lineHeight: lineHeight('l'),
      lineHeight: 'calc(28 / 22)', // calculated from old px values
    },
    {
      name: 'h3',
      fontSize: fontSize('m'),
      // lineHeight: lineHeight('m'),
      lineHeight: 'calc(24 / 18)', // calculated from old px values
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
      this.renderer.appendChild(this.elementRef.nativeElement, this.hostElementClone);
    }

    this.renderer.setStyle(
      this.hostElementClone,
      'width',
      `${this.elementRef.nativeElement.clientWidth}px`
    );

    const fallbackSize = this.headingSizes[this.headingSizes.length - 1];
    const fittedSize = this.headingSizes.find(this.canFitHeading.bind(this)) || fallbackSize;

    this.setSize(this.elementRef.nativeElement, fittedSize);
    this.lineClampHelper.setLineHeight(this.elementRef.nativeElement, fittedSize.lineHeight);
    this.isScalingHeader = false;
  }

  private canFitHeading(size: HeadingSize) {
    this.setSize(this.hostElementClone, size);
    const lines = this.hostElementClone.clientHeight / parseInt(size.lineHeight);
    return lines <= this.config.maxLines;
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
