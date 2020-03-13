import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { ResizeObserverService } from '../../components/shared/resize-observer/resize-observer.service';
import { ResizeObserverEntry } from '../../components/shared/resize-observer/types/resize-observer-entry';

import { DesignTokenHelper } from '../../helpers/design-token-helper';

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
  selector: `h1[kirbyFitHeading],h2[kirbyFitHeading],h3[kirbyFitHeading]`,
})
export class FitHeadingDirective implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('kirbyFitHeading') config?: FitHeadingConfig;

  private isObservingHostElement: boolean;
  private hostElementClone: Element;
  private previousWidth: number;
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
    private resizeObserverService: ResizeObserverService
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
    this.resizeObserverService.observe(this.elementRef, (entry: ResizeObserverEntry) => {
      this.handleResize(entry);
    });
  }

  private handleResize(entry: ResizeObserverEntry) {
    if (!this.shouldScale(entry.target)) return;

    // Set width to determine at next resize if header should be scaled up again
    this.previousWidth = entry.target.clientWidth;
    this.scaleHeader();
  }

  private shouldScale(el: Element): boolean {
    const height = el.clientHeight;

    if (height === 0 || this.isScalingHeader) return false;

    const lineHeight = parseInt(
      window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('line-height')
    );

    const lines = height / lineHeight;
    return lines > this.config.maxLines || this.previousWidth < el.clientWidth;
  }

  private scaleHeader(): void {
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
    return clone;
  }

  private setSize(el: Element, size: HeadingSize): void {
    this.renderer.setStyle(el, 'font-size', size.fontSize);
    this.renderer.setStyle(el, 'line-height', size.lineHeight);
  }
}
