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
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ButtonComponent } from '../button/button.component';

@Directive({
  selector: '[kirbyPageFloatingTitle]',
})
export class PageFloatingTitleDirective {}

@Directive({
  selector: '[kirbyPageFloatingActions]',
})
export class PageFloatingActionsDirective {}

@Directive({
  selector: '[kirbyPageContent]',
})
export class PageContentDirective {}

@Directive({
  selector: '[kirbyPageContentFixed]',
})
export class PageContentFixedDirective {}

@Component({
  selector: 'kirby-page-content',
  template: `
    <ng-content></ng-content>
  `,
})
export class PageContentComponent {}

@Component({
  selector: 'kirby-page-actions',
  template: `
    <ng-content></ng-content>
  `,
})
export class PageActionsComponent implements AfterContentInit {
  @ContentChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;
  ngAfterContentInit(): void {
    this.buttons.forEach((button) => {
      button.attentionLevel = '2';
    });
  }
}

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
  @Input() title?: string;
  @Input() titleAlignment?: 'left' | 'center' | 'right' = 'left';
  @Input() headerOnly?: boolean;
  @Input() defaultBackHref?: string;

  @ViewChild('pageTitle', { read: ElementRef }) pageTitle: ElementRef;
  @ViewChild('headerButtons', { read: ElementRef }) headerButtons: ElementRef;
  @ContentChild(PageFloatingTitleDirective, { read: TemplateRef }) titleTemplate: TemplateRef<any>;
  @ContentChild(PageFloatingActionsDirective, { read: TemplateRef }) actionsTemplate: TemplateRef<any>;
  @ContentChild(PageContentDirective, { read: TemplateRef }) contentTemplate: TemplateRef<any>;
  @ContentChild(PageContentFixedDirective, { read: TemplateRef }) fixedContent: TemplateRef<any>;

  toolbarContentVisibility: 'visible' | 'hidden' = 'hidden';
  private pageTitleObserver;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.removeWrapper();
  }

  ngAfterViewInit(): void {
    if (!this.headerOnly) {
      this.pageTitleObserver = this.observePageTitle();
    } else {
      this.toolbarContentVisibility = 'visible';
    }
    if (this.actionsTemplate) {
      this.setHeaderButtonsToSmall();
    }
  }

  setHeaderButtonsToSmall() {
    if (this.headerButtons && this.headerButtons.nativeElement) {
      const buttons = this.headerButtons.nativeElement.querySelectorAll('[kirby-button]');
      buttons.forEach((button) => {
        this.renderer.addClass(button, 'sm');
        this.renderer.removeClass(button, 'lg');
      });
    }
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
          this.toolbarContentVisibility = entry.isIntersecting ? 'hidden' : 'visible';
        } else {
          initialized = true;
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.pageTitle.nativeElement);

    return observer;
  }
}
