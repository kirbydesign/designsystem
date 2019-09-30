import {
  AfterViewInit,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Directive({
  // tslint:disable directive-selector
  selector: '[kirby-page-title]',
})
export class PageTitleDirective {}

@Directive({
  // tslint:disable directive-selector
  selector: '[kirby-page-title-actions]',
})
export class PageTitleActionsDirective {}

@Directive({
  // tslint:disable directive-selector
  selector: '[kirby-page-content]',
})
export class PageContentDirective {}

@Directive({
  // tslint:disable directive-selector
  selector: '[kirby-page-fixed-content]',
})
export class PageFixedContentDirective {}

@Component({
  selector: 'kirby-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  animations: [
    trigger('visibility', [
      state(
        'visible',
        style({
          opacity: 1,
          visibility: 'inherit',
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          visibility: 'hidden',
        })
      ),
      transition('visible => hidden', [animate('100ms')]),
      transition('hidden => visible', [animate('250ms')]),
    ]),
  ],
})
export class PageComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() pageTitleAlign?: 'left' | 'center' | 'right' = 'center';
  @Input() onlyShowPageTitleInHeader: boolean;
  @Input() defaultBackHref: string;

  @ViewChild('pageTitleContainer', { read: ElementRef }) pageTitleContainer;
  @ViewChild('pageHeaderButtons', { read: ElementRef }) pageHeaderButtons;
  @ContentChild(PageTitleDirective, { read: TemplateRef }) title;
  @ContentChild(PageTitleActionsDirective, { read: TemplateRef }) titleActions;
  @ContentChild(PageContentDirective, { read: TemplateRef }) content;
  @ContentChild(PageFixedContentDirective, { read: TemplateRef }) fixedContent;

  pageHeaderTitleIsVisibleState: 'visible' | 'hidden' = 'hidden';
  private pageTitleObserver;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.removeWrapper();
  }

  ngAfterViewInit(): void {
    if (!this.onlyShowPageTitleInHeader) {
      this.pageTitleObserver = this.observePageTitle();
    } else {
      this.pageHeaderTitleIsVisibleState = 'visible';
    }
    this.setHeaderButtonsToSmall();
  }

  setHeaderButtonsToSmall() {
    const buttons = this.pageHeaderButtons.nativeElement.querySelector('[kirby-button]');
    this.renderer.addClass(buttons, 'sm');
    this.renderer.removeClass(buttons, 'lg');
  }

  removeWrapper() {
    const parent = this.elementRef.nativeElement.parentNode;
    const header = this.elementRef.nativeElement.childNodes[0];
    const content = this.elementRef.nativeElement.childNodes[1];
    this.renderer.removeChild(parent, this.elementRef.nativeElement);
    this.renderer.appendChild(parent, header);
    this.renderer.appendChild(parent, content);
  }

  ngOnDestroy(): void {
    if (this.pageTitleObserver) {
      this.pageTitleObserver.disconnect();
    }
  }

  observePageTitle() {
    const options = {
      rootMargin: '0px',
    };
    let initialized = false;
    const callback = (entries) => {
      entries.forEach((entry) => {
        // Ensures that page-title visibility won't flicker on load, because intersection observer triggers twice
        if (initialized) {
          this.pageHeaderTitleIsVisibleState = entry.isIntersecting ? 'hidden' : 'visible';
        } else {
          initialized = true;
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.pageTitleContainer.nativeElement);

    return observer;
  }
}
