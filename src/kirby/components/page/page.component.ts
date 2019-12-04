import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() title?: string;
  @Input() toolbarTitle?: string;
  @Input() titleAlignment?: 'left' | 'center' | 'right' = 'left';
  @Input() defaultBackHref?: string;
  @Input() hideBackButton?: boolean;

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
  toolbarTitleVisible: boolean;
  toolbarFixedActionsVisible: boolean;
  toolbarStickyActionsVisible: boolean;

  toolbarTitleTemplate: TemplateRef<any>;
  customContentTemplate: TemplateRef<any>;
  pageActionsTemplate: TemplateRef<any>;
  fixedContentTemplate: TemplateRef<any>;
  stickyActionsTemplate: TemplateRef<any>;
  fixedActionsTemplate: TemplateRef<any>;
  private pageTitleIntersectionObserverRef: IntersectionObserver = this.pageTitleIntersectionObserver();
  private routerEventsSubscription: Subscription;
  private url: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;
    this.removeWrapper();
  }

  ngAfterViewInit(): void {
    this.initializeTitle();
    this.initializeActions();
    this.styleToolbarButtons();
    this.initializeContent();
    this.changeDetectorRef.detectChanges();

    this.onEnter();

    this.routerEventsSubscription = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart && event.url !== this.url) {
        this.onLeave();
      }
      if (event instanceof NavigationEnd && event.urlAfterRedirects === this.url) {
        this.onEnter();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
    this.pageTitleIntersectionObserverRef.disconnect();
  }

  private onEnter() {
    this.enter.emit();
    if (this.pageTitle) {
      this.pageTitleIntersectionObserverRef.observe(this.pageTitle.nativeElement);
    }
  }

  private onLeave() {
    this.leave.emit();
    if (this.pageTitle) {
      this.pageTitleIntersectionObserverRef.unobserve(this.pageTitle.nativeElement);
    }
  }

  private initializeTitle() {
    this.hasPageTitle = this.title !== undefined || !!this.customTitleTemplate;
    if (!this.hasPageTitle) {
      this.toolbarTitleVisible = true;
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
        this.toolbarFixedActionsVisible = true;
      } else {
        this.pageActionsTemplate = pageAction.template;
        if (pageAction.isSticky) {
          this.stickyActionsTemplate = pageAction.template;
        }
      }
    });
    this.hasActionsInPage = !!this.pageActionsTemplate;
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

  private pageTitleIntersectionObserver() {
    const options = {
      rootMargin: '0px',
    };

    let initialized = false;
    const callback = (entries) => {
      if (initialized) {
        this.toolbarTitleVisible = !entries[0].isIntersecting;
        this.toolbarStickyActionsVisible = !entries[0].isIntersecting;
        this.changeDetectorRef.detectChanges();
      } else {
        initialized = true;
      }
    };
    return new IntersectionObserver(callback, options);
  }
}
