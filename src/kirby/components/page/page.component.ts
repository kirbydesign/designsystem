import {
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
  Output,
  EventEmitter,
  AfterContentChecked,
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavigationStart, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';

import { ButtonComponent } from '../button/button.component';

type stickyConfig = { sticky: boolean };
type fixedConfig = { fixed: boolean };

@Directive({
  selector: '[kirbyPageTitle]',
})
export class PageTitleDirective {}

@Directive({
  selector: '[kirbyPageToolbarTitle]',
})
export class PageToolbarTitleDirective {}

@Directive({
  selector: '[kirbyPageActions]',
})
export class PageActionsDirective {
  @Input('kirbyPageActions') config: stickyConfig | fixedConfig;
  private readonly stickyDefault = true;
  private readonly fixedDefault = false;

  constructor(public template: TemplateRef<any>) {}

  get isSticky(): boolean {
    return this.config ? (this.config as stickyConfig).sticky : this.stickyDefault;
  }

  get isFixed(): boolean {
    return this.config ? (this.config as fixedConfig).fixed : this.fixedDefault;
  }
}

@Directive({
  selector: '[kirbyPageContent]',
})
export class PageContentDirective {
  @Input('kirbyPageContent') config: fixedConfig;

  constructor(public template: TemplateRef<any>) {}

  get isFixed(): boolean {
    return this.config && this.config.fixed;
  }
}

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
    <ng-content select="button[kirby-button]"></ng-content>
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
export class PageComponent implements OnInit, OnDestroy, AfterContentChecked {
  @Input() title?: string;
  @Input() toolbarTitle?: string;
  @Input() titleAlignment?: 'left' | 'center' | 'right' = 'left';
  @Input() defaultBackHref?: string;

  @Output() enter = new EventEmitter<void>();
  @Output() leave = new EventEmitter<void>();

  @ViewChild('pageTitle', { static: false, read: ElementRef })
  private pageTitle: ElementRef;
  @ViewChild('stickyToolbarButtons', { static: false, read: ElementRef })
  private stickyToolbarButtons: ElementRef;
  @ViewChild('fixedToolbarButtons', { static: false, read: ElementRef })
  private fixedToolbarButtons: ElementRef;
  @ViewChild('simpleTitleTemplate', { static: true, read: TemplateRef })
  private simpleTitleTemplate: TemplateRef<any>;
  @ViewChild('simpleToolbarTitleTemplate', { static: true, read: TemplateRef })
  private simpleToolbarTitleTemplate: TemplateRef<any>;
  @ContentChild(PageToolbarTitleDirective, { static: false, read: TemplateRef })
  private customToolbarTitleTemplate: TemplateRef<any>;
  @ContentChild(PageTitleDirective, { static: false, read: TemplateRef })
  customTitleTemplate: TemplateRef<any>;
  @ContentChildren(PageActionsDirective)
  customActions: QueryList<PageActionsDirective>;
  @ContentChild(PageActionsComponent, { static: false })
  private actionsComponent: PageActionsComponent;
  @ContentChildren(PageContentDirective)
  private customContent: QueryList<PageContentDirective>;

  hasPageTitle: boolean;
  hasActionsInPage: boolean;
  toolbarTitleTemplate: TemplateRef<any>;
  toolbarTitleVisibility: 'visible' | 'hidden' = 'hidden';
  toolbarFixedActionsVisibility: 'visible' | 'hidden' = 'hidden';
  toolbarStickyActionsVisibility: 'visible' | 'hidden' = 'hidden';
  customContentTemplate: TemplateRef<any>;
  pageActionsTemplate: TemplateRef<any>;
  fixedContentTemplate: TemplateRef<any>;
  stickyActionsTemplate: TemplateRef<any>;
  fixedActionsTemplate: TemplateRef<any>;
  private pageTitleObserver: IntersectionObserver;
  private routerEventsSubscription: Subscription;
  private url: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;
    this.enter.emit();
    this.removeWrapper();
    this.routerEventsSubscription = this.router.events.subscribe((event: RouterEvent) => {
      if (
        event instanceof NavigationStart &&
        event.url !== this.url &&
        this.pageTitleObserver &&
        this.pageTitle
      ) {
        this.leave.emit();
        this.pageTitleObserver.unobserve(this.pageTitle.nativeElement);
      }
      if (
        event instanceof NavigationEnd &&
        event.urlAfterRedirects === this.url &&
        this.pageTitleObserver &&
        this.pageTitle
      ) {
        this.enter.emit();
        this.pageTitleObserver.observe(this.pageTitle.nativeElement);
      }
    });
  }

  ngAfterContentChecked(): void {
    this.initializeTitle();
    this.initializeActions();
    this.initializeContent();
    this.styleToolbarButtons();
  }

  ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
    if (this.pageTitleObserver) {
      this.pageTitleObserver.disconnect();
    }
  }

  private initializeTitle() {
    this.hasPageTitle = this.title !== undefined || !!this.customTitleTemplate;

    if (this.hasPageTitle && !this.pageTitleObserver) {
      setTimeout(() => {
        this.pageTitleObserver = this.observePageTitle();
      });
    } else if (!this.hasPageTitle) {
      this.toolbarTitleVisibility = 'visible';
    }

    const defaultTitleTemplate = this.customTitleTemplate || this.simpleTitleTemplate;
    // tslint:disable:prettier
    // prettier-ignore
    this.toolbarTitleTemplate = this.customToolbarTitleTemplate
      ? this.customToolbarTitleTemplate
      : typeof this.toolbarTitle === 'string'
        ? this.simpleToolbarTitleTemplate
        : defaultTitleTemplate;
  }

  private initializeActions() {
    this.customActions.forEach((pageAction) => {
      if (pageAction.isFixed) {
        this.fixedActionsTemplate = pageAction.template;
        this.toolbarFixedActionsVisibility = 'visible';
      } else {
        this.pageActionsTemplate = pageAction.template;
        if (pageAction.isSticky) {
          this.stickyActionsTemplate = pageAction.template;
        }
      }
    });
    this.hasActionsInPage = !!this.pageActionsTemplate || !!this.actionsComponent;
  }

  private initializeContent() {
    this.customContent.forEach((content) => {
      if (content.isFixed) {
        this.fixedContentTemplate = content.template;
      } else {
        this.customContentTemplate = content.template;
      }
    });
  }

  private styleToolbarButtons() {
    if (this.stickyToolbarButtons && this.stickyToolbarButtons.nativeElement) {
      const buttons = this.stickyToolbarButtons.nativeElement.querySelectorAll('[kirby-button]');
      buttons.forEach((button) => {
        this.renderer.addClass(button, 'sm');
        this.renderer.removeClass(button, 'lg');
        this.renderer.addClass(button, 'attention-level4');
        this.renderer.removeClass(button, 'attention-level2');
      });
    }
    if (this.fixedToolbarButtons && this.fixedToolbarButtons.nativeElement) {
      const buttons = this.fixedToolbarButtons.nativeElement.querySelectorAll('[kirby-button]');
      buttons.forEach((button) => {
        this.renderer.addClass(button, 'sm');
        this.renderer.removeClass(button, 'lg');
        this.renderer.addClass(button, 'attention-level4');
        this.renderer.removeClass(button, 'attention-level2');
      });
    }
  }

  private removeWrapper() {
    const parent = this.elementRef.nativeElement.parentNode;
    const header = this.elementRef.nativeElement.childNodes[0];
    const content = this.elementRef.nativeElement.childNodes[1];
    this.renderer.removeChild(parent, this.elementRef.nativeElement);
    this.renderer.appendChild(parent, header);
    this.renderer.appendChild(parent, content);
  }

  private observePageTitle() {
    if (!this.pageTitle) return;

    const options = {
      rootMargin: '0px',
    };

    let initialized = false;
    const callback = (entries) => {
      if (initialized) {
        entries.forEach((entry) => {
          this.toolbarTitleVisibility = entry.isIntersecting ? 'hidden' : 'visible';
          this.toolbarStickyActionsVisibility = entry.isIntersecting ? 'hidden' : 'visible';
        });
      } else {
        initialized = true;
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.pageTitle.nativeElement);

    return observer;
  }
}
