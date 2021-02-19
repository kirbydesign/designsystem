import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  SkipSelf,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { IonContent, IonFooter, IonHeader } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { KirbyAnimation } from '../../animation/kirby-animation';
import { FitHeadingConfig } from '../../directives/fit-heading/fit-heading.directive';
import { WindowRef } from '../../types/window-ref';
import { ModalNavigationService } from '../modal/services/modal-navigation.service';
import { selectedTabClickEvent } from '../tabs/tab-button/tab-button.events';
import { TabsComponent } from '../tabs/tabs.component';

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
  selector: 'kirby-page-header',
  template: `
    <ng-content></ng-content>
  `,
})
export class PageHeaderComponent {}

@Component({
  selector: 'kirby-page-title',
  template: `
    <ng-content></ng-content>
  `,
})
export class PageTitleComponent {}

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
export class PageActionsComponent {}

@Component({
  selector: 'kirby-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked, OnChanges {
  @Input() title: string;
  @Input() toolbarTitle: string;
  @Input() titleAlignment: 'left' | 'center' | 'right' = 'left';
  @Input() defaultBackHref: string;
  @Input() hideBackButton: boolean;
  @Input() titleMaxLines: number;

  private _tabBarBottomHidden: boolean;
  public get tabBarBottomHidden(): boolean {
    return this._tabBarBottomHidden;
  }
  @Input()
  public set tabBarBottomHidden(value: boolean) {
    if (this.tabsComponent) {
      // as we are setting a class on tabs, we need this to happen in a separate cd cycle
      setTimeout(() => (this.tabsComponent.tabBarBottomHidden = value));
    }
    this._tabBarBottomHidden = value;
  }

  @Output() enter = new EventEmitter<void>();
  @Output() leave = new EventEmitter<void>();

  @ViewChild(IonContent, { static: true }) private content: IonContent;
  @ViewChild(IonContent, { static: true, read: ElementRef })
  private ionContentElement: ElementRef<HTMLIonContentElement>;
  @ViewChild(IonHeader, { static: true, read: ElementRef })
  ionHeaderElement: ElementRef<HTMLIonHeaderElement>;
  @ViewChild(IonFooter, { static: true, read: ElementRef })
  private ionFooterElement: ElementRef<HTMLIonFooterElement>;

  @ViewChild('pageTitle', { static: false, read: ElementRef })
  private pageTitle: ElementRef;

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
  @ContentChildren(PageContentDirective)
  private customContent: QueryList<PageContentDirective>;

  hasPageTitle: boolean;
  hasActionsInPage: boolean;
  toolbarTitleVisible: boolean;
  toolbarFixedActionsVisible: boolean;
  toolbarStickyActionsVisible: boolean;

  fitHeadingConfig: FitHeadingConfig;

  toolbarTitleTemplate: TemplateRef<any>;
  customContentTemplate: TemplateRef<any>;
  pageActionsTemplate: TemplateRef<any>;
  fixedContentTemplate: TemplateRef<any>;
  stickyActionsTemplate: TemplateRef<any>;
  fixedActionsTemplate: TemplateRef<any>;
  private pageTitleIntersectionObserverRef: IntersectionObserver = this.pageTitleIntersectionObserver();
  private urls: string[] = [];
  private hasEntered: boolean;

  private ngOnDestroy$ = new Subject();
  private navigationStart$: Observable<RouterEvent> = this.router.events.pipe(
    takeUntil(this.ngOnDestroy$),
    filter((event: RouterEvent) => event instanceof NavigationStart)
  );

  private navigationEnd$: Observable<RouterEvent> = this.router.events.pipe(
    takeUntil(this.ngOnDestroy$),
    filter((event: RouterEvent) => event instanceof NavigationEnd)
  );

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private window: WindowRef,
    private modalNavigationService: ModalNavigationService,
    @Optional() @SkipSelf() private tabsComponent: TabsComponent
  ) {}

  ngOnInit(): void {
    this.removeWrapper();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.titleMaxLines) {
      this.fitHeadingConfig = {
        ...this.fitHeadingConfig,
        maxLines: changes.titleMaxLines.currentValue,
      };
    }
  }

  ngAfterViewInit(): void {
    this.navigationStart$.subscribe((event: NavigationStart) => {
      if (
        !this.urls.includes(event.url) &&
        !this.modalNavigationService.isModalRoute(event.url) &&
        !this.modalNavigationService.isModalRoute(this.router.url)
      ) {
        this.onLeave();
      }
    });

    this.navigationEnd$.subscribe((event: NavigationEnd) => {
      if (this.urls.includes(event.urlAfterRedirects)) {
        this.onEnter();
      }
    });

    this.window.addEventListener(selectedTabClickEvent, () => {
      this.content.scrollToTop(KirbyAnimation.Duration.LONG);
    });
  }

  ngAfterContentChecked(): void {
    if (!this.urls.includes(this.router.url)) {
      this.urls.push(this.router.url);
      this.onEnter();
    }

    this.initializeTitle();
    this.initializeActions();
    this.initializeContent();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();

    this.pageTitleIntersectionObserverRef.disconnect();
    this.window.removeEventListener(selectedTabClickEvent, () => {
      this.content.scrollToTop(KirbyAnimation.Duration.LONG);
    });
  }

  private onEnter() {
    if (this.hasEntered) return;
    this.hasEntered = true;

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
    this.hasEntered = false;

    if (this.tabBarBottomHidden && this.tabsComponent) {
      this.tabsComponent.tabBarBottomHidden = false;
    }
  }

  private initializeTitle() {
    // Ensures initializeTitle() won't run, if already initialized
    if (this.hasPageTitle) return;

    this.hasPageTitle = this.title !== undefined || !!this.customTitleTemplate;
    this.toolbarTitleVisible = !this.hasPageTitle;

    if (this.hasPageTitle) {
      setTimeout(() => {
        this.pageTitleIntersectionObserverRef.observe(this.pageTitle.nativeElement);
      });
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

  private removeWrapper() {
    const parent = this.elementRef.nativeElement.parentNode;
    this.renderer.removeChild(parent, this.elementRef.nativeElement);
    this.renderer.appendChild(parent, this.ionHeaderElement.nativeElement);
    this.renderer.appendChild(parent, this.ionContentElement.nativeElement);
    this.renderer.appendChild(parent, this.ionFooterElement.nativeElement);
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

  @HostListener('window:keyboardWillShow', ['$event'])
  _onKeyboardWillShow(info?: { keyboardHeight: number }) {
    if (info && info.keyboardHeight) {
      this.ionContentElement.nativeElement.style.setProperty(
        '--keyboard-offset',
        `${info.keyboardHeight}px`
      );
    }
  }

  @HostListener('window:keyboardWillHide')
  _onKeyboardWillHide() {
    this.ionContentElement.nativeElement.style.setProperty('--keyboard-offset', '0px');
  }
}
