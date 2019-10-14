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
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
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
export class PageComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
  @Input() title?: string;
  @Input() toolbarTitle?: string;
  @Input() titleAlignment?: 'left' | 'center' | 'right' = 'left';
  @Input() defaultBackHref?: string;

  @ViewChild('pageTitle', { read: ElementRef })
  private pageTitle: ElementRef;
  @ViewChild('toolbarButtons', { read: ElementRef })
  private toolbarButtons: ElementRef;
  @ViewChild('simpleTitleTemplate', { read: TemplateRef })
  private simpleTitleTemplate: TemplateRef<any>;
  @ViewChild('simpleToolbarTitleTemplate', { read: TemplateRef })
  private simpleToolbarTitleTemplate: TemplateRef<any>;
  @ContentChild(PageToolbarTitleDirective, { read: TemplateRef })
  private customToolbarTitleTemplate: TemplateRef<any>;
  @ContentChild(PageTitleDirective, { read: TemplateRef })
  private customTitleTemplate: TemplateRef<any>;
  @ContentChild(PageActionsDirective)
  customActions: PageActionsDirective;
  @ContentChild(PageActionsComponent)
  private actionsComponent: PageActionsComponent;
  @ContentChildren(PageContentDirective)
  private customContent: QueryList<PageContentDirective>;

  hasPageTitle: boolean;
  hasFixedTitle: boolean;
  hasFixedActions: boolean;
  hasActionsInPage: boolean;
  hasActionsInToolbar: boolean;
  titleTemplate: TemplateRef<any>;
  toolbarTitleTemplate: TemplateRef<any>;
  toolbarTitleVisibility: 'visible' | 'hidden' = 'hidden';
  toolbarActionsVisibility: 'visible' | 'hidden' = 'hidden';
  customContentTemplate: TemplateRef<any>;
  fixedContentTemplate: TemplateRef<any>;
  private pageTitleObserver: IntersectionObserver;
  private routerEventsSubscription: Subscription;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.removeWrapper();

    this.routerEventsSubscription = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd && this.pageTitleObserver) {
        this.pageTitleObserver.disconnect();
        this.pageTitleObserver = this.observePageTitle();
      }
    });
  }

  ngAfterContentInit(): void {
    this.hasPageTitle = !!this.title || !!this.customTitleTemplate;
    if (!this.hasPageTitle) {
      this.toolbarTitleVisibility = 'visible';
      this.toolbarActionsVisibility = 'visible';
      this.hasFixedTitle = !!this.toolbarTitle || !!this.customToolbarTitleTemplate;
    }

    this.hasActionsInPage = !!this.actionsComponent;
    if (this.customActions) {
      this.hasFixedActions = this.customActions.isFixed;
      this.hasActionsInPage = !this.hasFixedActions;
      this.hasActionsInToolbar = this.customActions.isFixed || this.customActions.isSticky;
      if (this.hasFixedActions) {
        this.toolbarActionsVisibility = 'visible';
      }
    }
    this.setTitleTemplates();
    this.setContentTemplates();
  }

  ngAfterViewInit(): void {
    if (this.hasPageTitle) {
      this.pageTitleObserver = this.observePageTitle();
    }
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

  private setTitleTemplates() {
    this.titleTemplate = this.customTitleTemplate || this.simpleTitleTemplate;
    this.setToolbarTitleTemplate(this.titleTemplate);
  }

  private setToolbarTitleTemplate(defaultTitleTemplate: TemplateRef<any>) {
    // tslint:disable:prettier
    this.toolbarTitleTemplate = this.customToolbarTitleTemplate
      ? this.customToolbarTitleTemplate
      : this.toolbarTitle
      ? this.simpleToolbarTitleTemplate
      : defaultTitleTemplate;
    // tslint:enable:prettier
  }

  private setContentTemplates() {
    this.customContent.forEach((content) => {
      if (content.isFixed) {
        this.fixedContentTemplate = content.template;
      } else {
        this.customContentTemplate = content.template;
      }
    });
  }

  private styleToolbarButtons() {
    if (this.toolbarButtons && this.toolbarButtons.nativeElement) {
      const buttons = this.toolbarButtons.nativeElement.querySelectorAll('[kirby-button]');
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
    const options = {
      rootMargin: '0px',
    };
    let initialized = false;
    const callback = (entries) => {
      entries.forEach((entry) => {
        // Ensures that page-title visibility won't flicker on load, because intersection observer triggers twice
        if (initialized) {
          this.toolbarTitleVisibility = entry.isIntersecting ? 'hidden' : 'visible';
          if (!this.hasFixedActions) {
            this.toolbarActionsVisibility = entry.isIntersecting ? 'hidden' : 'visible';
          }
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
