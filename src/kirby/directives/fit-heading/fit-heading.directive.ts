import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { ResizeObserverService } from '@kirbydesign/designsystem/components/shared/resize-observer/resize-observer.service';
import { ResizeObserverEntry } from '@kirbydesign/designsystem/components/shared/resize-observer/types/resize-observer-entry';

declare var require: any;

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
  @Input('kirbyFitHeading') config?: FitHeadingConfig = {
    maxLines: 2,
  };

  private width: number;
  private clone: Element;
  private isScalingHeader: boolean; // used to prevent resizeObserver to trigger on font scaling by this.scaleHeader()
  private scssVariables: any = require('sass-extract-loader!../../scss/base/_variables.scss');
  private sizes: HeadingSize[] = [
    {
      name: 'h1',
      fontSize: this.getFontSize('xl'),
      lineHeight: this.getLineHeight('xl'),
    },
    {
      name: 'h2',
      fontSize: this.getFontSize('l'),
      lineHeight: this.getLineHeight('l'),
    },
    {
      name: 'h3',
      fontSize: this.getFontSize('m'),
      lineHeight: this.getLineHeight('m'),
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

  private getFontSize(size): string {
    const fontSize = this.getScssValue(['global', '$font-sizes', 'value', size]);
    if (fontSize) {
      return `${fontSize.value}${fontSize.unit}`;
    }
  }

  private getLineHeight(size): string {
    const lineHeight = this.getScssValue(['global', '$line-height', 'value', size]);
    if (lineHeight) {
      return `${lineHeight.value}${lineHeight.unit}`;
    }
  }

  private getScssValue(path: string[]) {
    let node = this.scssVariables;
    for (let step of path) {
      node = node[step];
      if (!node) {
        break;
      }
    }
    return node;
  }

  private observeResize(): void {
    this.resizeObserverService.observe(this.elementRef, (entry: ResizeObserverEntry) => {
      this.handleResize(entry);
    });
  }

  private handleResize(entry: ResizeObserverEntry) {
    if (!this.shouldScale(entry.target)) return;

    // Set width to determine at next resize if header should be scaled up again
    this.width = entry.target.clientWidth;
    this.scaleHeader();
  }

  private shouldScale(el: Element): boolean {
    const height = el.clientHeight;

    if (height === 0 || this.isScalingHeader) return false;

    const lineHeight = parseInt(
      window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('line-height')
    );

    const lines = height / lineHeight;
    return lines > this.config.maxLines || this.width < el.clientWidth;
  }

  private scaleHeader(): void {
    this.isScalingHeader = true;

    if (!this.clone) {
      this.clone = this.generateClone();
      this.renderer.appendChild(this.elementRef.nativeElement, this.clone);
    }

    this.renderer.setStyle(this.clone, 'width', `${this.elementRef.nativeElement.clientWidth}px`);

    const fallbackSize = this.sizes[this.sizes.length - 1];
    const fittedSize = this.sizes.find(this.canFitHeading.bind(this)) || fallbackSize;

    this.setSize(this.elementRef.nativeElement, fittedSize);
    this.isScalingHeader = false;
  }

  private canFitHeading(size: HeadingSize) {
    this.setSize(this.clone, size);
    const lines = this.clone.clientHeight / parseInt(size.lineHeight);
    return lines <= this.config.maxLines;
  }

  private generateClone(): Element {
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
