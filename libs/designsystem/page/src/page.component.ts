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
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  Injector,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  RendererStyleFlags2,
  SimpleChanges,
  SkipSelf,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonRouterOutlet,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { componentOnReady } from '@ionic/core';
import type { ScrollDetail } from '@ionic/core';
import { selectedTabClickEvent, TabsComponent } from '@kirbydesign/designsystem/tabs';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

import { ACTIONGROUP_CONFIG, ActionGroupConfig } from '@kirbydesign/designsystem/action-group';
import {
  HeaderActionsDirective,
  HeaderComponent,
  HeaderTitleActionIconDirective,
} from '@kirbydesign/designsystem/header';
import { IonicElementPartHelper, KirbyAnimation } from '@kirbydesign/designsystem/helpers';
import {
  ModalElementComponent,
  ModalElementsAdvertiser,
  ModalElementType,
  ModalNavigationService,
} from '@kirbydesign/designsystem/modal';
import { FitHeadingConfig, ResizeObserverService } from '@kirbydesign/designsystem/shared';

/**
 * Specify scroll event debounce time in ms and scrolled offset from top in pixels
 */
const contentScrollDebounceTimeInMS = 10;
const contentScrolledOffsetInPixels = 4;

type stickyConfig = { sticky: boolean };
type fixedConfig = { fixed: boolean };
type MaxWidth = 'default' | 'standard' | 'optimized' | 'lg' | 'xl' | 'full'; // TODO: Remove deprecated options 'standard' and 'optimized' in Kirby v10

const PAGE_WIDTH_STANDARD_DEPRECATION_WARNING =
  'Deprecation warning: The support for "standard" as a maxWidth option will be removed in Kirby version 10. After that the "standard" width will be the default width and does not need to be specified.';

const PAGE_WIDTH_OPTIMIZED_DEPRECATION_WARNING =
  'Deprecation warning: The "optimized" maxWidth option is deprecated, please use "lg" instead. The support for "optimized" as a maxWidth option will be removed in Kirby version 10.';

export const PAGE_BACK_BUTTON_OVERRIDE = new InjectionToken<PageBackButtonOverride>(
  'page-back-button-override'
);

export interface PageBackButtonOverride {
  navigateBack: (
    routerOutlet: IonRouterOutlet,
    navCtrl: NavController,
    defaultBackHref: string
  ) => void;
}

/**
 * Event emitted when "pull-to-refresh" begins.
 */
export interface PullToRefreshEvent {
  /**
   * Invoke this callback-method when action to perform upon "pull-to-refresh" completes.
   */
  complete();
}

@Directive({
  selector: '[kirbyPageTitle]',
})
export class PageTitleDirective {}

@Directive({
  selector: '[kirbyPageSubtitle]',
})
export class PageSubtitleDirective {}

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

  constructor(public template: TemplateRef<any>) {
    console.warn(
      'Defining Page Actions via *kirbyPageActions is deprecated and will be removed in Kirby v10. A Kirby Header with Actions should be used instead, as it has an improved API with better support for responsive layouts.'
    );
  }

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

@Directive({
  selector: '[kirbyPageStickyContent]',
})
export class PageStickyContentDirective {}

@Component({
  selector: 'kirby-page-progress',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        display: flex;
        margin-inline-end: 4px; /* Add spacing to potential supplementary action button */
      }
    `,
  ],
})
export class PageProgressComponent extends ModalElementComponent {
  // TODO: Find alternative implementation, which aligns with future page configuration / consumption
  // This implementation was chosen over expanding `moveChild` method in component wrapper with yet another scenario
  @HostBinding('attr.slot') slot = 'start';

  constructor(
    @Optional() modalElementsAdvertiser: ModalElementsAdvertiser,
    elementRef: ElementRef<HTMLElement>
  ) {
    super(ModalElementType.PAGE_PROGRESS, elementRef, modalElementsAdvertiser);
  }
}
@Component({
  selector: 'kirby-page-title',
  template: `
    <ng-content></ng-content>
  `,
})
export class PageTitleComponent extends ModalElementComponent {
  constructor(
    elementRef: ElementRef<HTMLElement>,
    @Optional() modalElementsAdvertiser: ModalElementsAdvertiser
  ) {
    super(ModalElementType.TITLE, elementRef, modalElementsAdvertiser);
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
  styles: [
    `
      :host {
        display: inline-flex;
        column-gap: 8px;
      }
    `,
  ],
})
export class PageActionsComponent {}

@Component({
  selector: 'kirby-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IonicElementPartHelper],
})
export class PageComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked, OnChanges
{
  @Input() title: string;
  @Input() subtitle: string;
  @Input() toolbarTitle: string;
  @Input() titleAlignment: 'left' | 'center' | 'right' = 'left';
  @Input() defaultBackHref: string;
  @Input() hideBackButton: boolean;
  @Input() titleMaxLines: number;
  @Input() hasInteractiveTitle: boolean;

  @Input() set maxWidth(width: MaxWidth) {
    // TODO: Remove deprecation warning in Kirby v10
    if (width === 'standard') {
      console.warn(PAGE_WIDTH_STANDARD_DEPRECATION_WARNING);
    }
    // TODO: Remove deprecation warning in Kirby v10
    if (width === 'optimized') {
      console.warn(PAGE_WIDTH_OPTIMIZED_DEPRECATION_WARNING);
    }

    this._maxWidth = width;
  }

  get maxWidth(): MaxWidth {
    return this._maxWidth;
  }

  private _maxWidth: MaxWidth = 'default';

  private _tabBarBottomHidden: boolean;
  public get tabBarBottomHidden(): boolean {
    return this._tabBarBottomHidden;
  }
  @Input()
  public set tabBarBottomHidden(value: boolean) {
    if (this.tabsComponent) {
      // as we are setting a class on tabs, we need this to happen in a separate cd cycle
      setTimeout(() => {
        this.tabsComponent.tabBarBottomHidden = value;
        this.changeDetectorRef.markForCheck();
      });
    }
    this._tabBarBottomHidden = value;
  }

  @Output() enter = new EventEmitter<void>();
  @Output() leave = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<PullToRefreshEvent>();
  @Output() backButtonClick = new EventEmitter<Event>();
  @Output() toolbarTitleClick = new EventEmitter<PointerEvent>();

  @ViewChild(IonContent, { static: true }) private content?: IonContent;
  @ViewChild(IonContent, { static: true, read: ElementRef })
  private ionContentElement: ElementRef<HTMLIonContentElement>;
  @ViewChild(IonHeader, { static: true, read: ElementRef })
  ionHeaderElement: ElementRef<HTMLIonHeaderElement>;
  @ViewChild(IonFooter, { static: true, read: ElementRef })
  private ionFooterElement: ElementRef<HTMLIonFooterElement>;
  @ViewChild(IonToolbar, { static: true, read: ElementRef })
  private ionToolbarElement: ElementRef<HTMLIonToolbarElement>;
  @ViewChildren(IonButtons, { read: ElementRef })
  private ionToolbarButtonsElement: QueryList<ElementRef<HTMLIonButtonsElement>>;
  @ViewChild(IonBackButton, { static: false })
  private backButton: IonBackButton;
  @ViewChild('pageTitle', { static: false, read: ElementRef })
  private pageTitle: ElementRef;
  @ViewChild('stickyContentContainer', { static: false, read: ElementRef })
  private stickyContentContainer: ElementRef;

  @ViewChild('simpleTitleTemplate', { static: true, read: TemplateRef })
  private simpleTitleTemplate: TemplateRef<any>;
  @ViewChild('simpleToolbarTitleTemplate', { static: true, read: TemplateRef })
  private simpleToolbarTitleTemplate: TemplateRef<any>;
  @ContentChild(PageToolbarTitleDirective, { static: false, read: TemplateRef })
  private customToolbarTitleTemplate: TemplateRef<any>;
  @ContentChild(PageTitleDirective, { static: false, read: TemplateRef })
  customTitleTemplate: TemplateRef<any>;
  @ContentChild(PageSubtitleDirective, { static: false, read: TemplateRef })
  customSubtitleTemplate: TemplateRef<any>;
  @ContentChildren(PageActionsDirective)
  customActions: QueryList<PageActionsDirective>;
  @ContentChildren(PageContentDirective)
  private customContent: QueryList<PageContentDirective>;
  @ContentChild(PageStickyContentDirective, { static: false, read: TemplateRef })
  private stickyContentRef: TemplateRef<any>;
  @ContentChild(HeaderComponent)
  header?: HeaderComponent;

  hasHeader: boolean;
  hasPageTitle: boolean;
  hasPageSubtitle: boolean;
  toolbarTitleVisible: boolean;
  toolbarActionsVisible: boolean;
  isContentScrolled: boolean;
  isStickyContentPinned = false;

  fitHeadingConfig: FitHeadingConfig;

  toolbarTitleTemplate: TemplateRef<any>;
  customContentTemplate: TemplateRef<any>;
  pageActionsTemplate: TemplateRef<any>;
  fixedContentTemplate: TemplateRef<any>;
  stickyActionsTemplate: TemplateRef<any>;
  fixedActionsTemplate: TemplateRef<any>;
  stickyContentTemplate: TemplateRef<PageStickyContentDirective>;
  headerActionsTemplate: TemplateRef<HeaderActionsDirective>;
  titleActionIconTemplate: TemplateRef<HeaderTitleActionIconDirective>;

  private titleIntersectionObserver?: IntersectionObserver;
  private stickyActionsIntersectionObserver?: IntersectionObserver;
  private stickyContentIntersectionObserver?: IntersectionObserver;
  private isObservingTitle = false;
  private isObservingActions = false;

  private url: string;
  private isActive: boolean;

  private ngOnDestroy$: Subject<void> = new Subject<void>();
  private contentScrolled$: Observable<ScrollDetail>;

  private navigationStart$: Observable<NavigationStart> = this.router.events.pipe(
    filter((event): event is NavigationStart => event instanceof NavigationStart),
    takeUntil(this.ngOnDestroy$)
  );

  private navigationEnd$: Observable<NavigationEnd> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    takeUntil(this.ngOnDestroy$)
  );

  toolbarActionGroupInjector: Injector;

  constructor(
    private elementRef: ElementRef,
    private injector: Injector,
    private renderer: Renderer2,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    private modalNavigationService: ModalNavigationService,
    private resizeObserverService: ResizeObserverService,
    @Optional() @SkipSelf() private tabsComponent: TabsComponent,
    @Optional()
    @Inject(PAGE_BACK_BUTTON_OVERRIDE)
    private backButtonOverride: PageBackButtonOverride,
    @Optional()
    private routerOutlet: IonRouterOutlet,
    @Optional()
    private navCtrl: NavController,
    private ionicElementPartHelper: IonicElementPartHelper
  ) {}

  private contentReadyPromise: Promise<void>;
  private whenContentReady() {
    if (!this.contentReadyPromise) {
      this.contentReadyPromise = new Promise((resolve) => {
        this.resizeObserverService.observe(this.ionContentElement, (entry) => {
          if (entry.contentRect.height > 0) {
            this.resizeObserverService.unobserve(this.ionContentElement);
            resolve();
          }
        });
      });
    }
    return this.contentReadyPromise;
  }

  ngOnInit(): void {
    this.removeWrapper();
    this.ionicElementPartHelper.setPart(
      'background',
      this.ionToolbarElement,
      '.toolbar-background'
    );

    const actionGroupConfig: ActionGroupConfig = {
      isCondensed: true,
      maxVisibleActions: 1,
    };
    this.toolbarActionGroupInjector = Injector.create({
      providers: [
        {
          provide: ACTIONGROUP_CONFIG,
          useValue: actionGroupConfig,
        },
      ],
      parent: this.injector,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.titleMaxLines) {
      this.fitHeadingConfig = {
        maxLines: changes.titleMaxLines.currentValue,
      };
    }
    if (changes.subtitle && !changes.subtitle.isFirstChange) {
      this.subtitle = changes.title.currentValue;
      this.hasPageSubtitle = this.subtitle !== undefined;
    }
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.contentScrolled$ = this.content.ionScroll.pipe(
        debounceTime(contentScrollDebounceTimeInMS),
        map((event) => event.detail),
        takeUntil(this.ngOnDestroy$)
      );

      this.contentScrolled$.subscribe((scrollInfo: ScrollDetail) => {
        if (scrollInfo.scrollTop > contentScrolledOffsetInPixels !== this.isContentScrolled) {
          this.isContentScrolled = !this.isContentScrolled;
          this.changeDetectorRef.detectChanges();
        }
      });
    });

    // This instance has observed a page enter so register the correct url for this instance
    this.url = this.router.url;
    this.onEnter();

    // Watch navigation events for page enter and leave
    this.navigationStart$.subscribe((event: NavigationStart) => {
      if (
        this.getPathname(event.url) !== this.getPathname(this.url) &&
        !this.modalNavigationService.isModalRoute(this.url) &&
        !this.modalNavigationService.isModalRoute(event.url)
      ) {
        this.onLeave();
      }
    });

    this.navigationEnd$.subscribe((event: NavigationEnd) => {
      if (this.getPathname(event.urlAfterRedirects) === this.getPathname(this.url)) {
        this.onEnter();
      }
    });

    this.interceptBackButtonClicksSetup();
    this.initializeStickyIntersectionObserver();
    this.setActionButtonsWidth();
  }

  ngAfterContentChecked(): void {
    this.initializeHeader();
    this.initializeTitle();
    this.initializeActions();
    this.initializeContent();
    this.initializeStickyContent();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();

    this.titleIntersectionObserver?.disconnect();
    this.stickyActionsIntersectionObserver?.disconnect();
    this.stickyContentIntersectionObserver?.disconnect();
  }

  delegateRefreshEvent(event: any): void {
    this.refresh.emit({
      complete: event.target.complete.bind(event.target),
    });
  }

  getMaxWidthClasses() {
    if (!this.maxWidth) {
      return '';
    }
    if (this.maxWidth === 'default') {
      return '';
    }
    return `max-width-${this.maxWidth}`;
  }

  onTitleClick(event: PointerEvent) {
    if (this.toolbarTitleClick.observed) {
      this.toolbarTitleClick.emit(event);
    } else {
      this.header?.titleClick.emit(event);
    }
  }

  private removeWrapper() {
    const parent = this.elementRef.nativeElement.parentNode;
    this.renderer.removeChild(parent, this.elementRef.nativeElement);
    this.renderer.appendChild(parent, this.ionHeaderElement.nativeElement);
    this.renderer.appendChild(parent, this.ionContentElement.nativeElement);
    this.renderer.appendChild(parent, this.ionFooterElement.nativeElement);
  }

  private onEnter() {
    if (this.isActive) return;
    this.isActive = true;

    this.enter.emit();

    this.observeTitle();
    this.observeActions();
  }

  private onLeave() {
    if (!this.isActive) return;
    this.isActive = false;

    this.leave.emit();

    this.unobserveTitle();
    this.unobserveActions();

    if (this.tabBarBottomHidden && this.tabsComponent) {
      this.tabsComponent.tabBarBottomHidden = false;
    }
  }

  private interceptBackButtonClicksSetup() {
    if (this.backButtonOverride) {
      this.backButton.onClick = (event: Event) => {
        event.preventDefault();
        this.backButtonOverride.navigateBack(this.routerOutlet, this.navCtrl, this.defaultBackHref);
      };
    }

    // Intercept back-button click events, defaulting to the built-in click-handler.
    if (this.backButtonClick.observers.length === 0) {
      this.backButtonClick
        .pipe(takeUntil(this.ngOnDestroy$))
        .subscribe(this.backButton.onClick.bind(this.backButton));
    }
    this.backButton.onClick = (event: Event) => {
      this.backButtonClick.emit(event);
    };
  }

  private initializeStickyIntersectionObserver() {
    if (this.stickyContentTemplate) {
      // Sticky content present - start observing for stickiness
      if (!this.stickyContentIntersectionObserver) {
        this.stickyContentIntersectionObserver = this.createStickyContentIntersectionObserver();
      }
      setTimeout(() => {
        this.stickyContentIntersectionObserver.observe(this.stickyContentContainer.nativeElement);
      });
    }
  }

  private initializeHeader() {
    if (this.hasHeader === undefined && !!this.header) {
      this.hasHeader = true;
      // Header could later be removed from DOM (e.g. in virtual scrolling scenarios),
      // so store a reference to `header.titleActionIconTemplate` and `header.titleClick`:
      this.titleActionIconTemplate = this.header.titleActionIconTemplate;
      if (this.header.titleClick.observed && this.hasInteractiveTitle === undefined) {
        this.hasInteractiveTitle = true;
      }
    }
  }

  private initializeTitle() {
    if (this.hasHeader && this.isObservingTitle && !this.header?.titleElement) {
      // If we're already observing the header's title element, but it's no longer present,
      // it means it has been removed from DOM (e.g. in virtual scrolling scenarios).
      // Flip observing flag:
      this.isObservingTitle = false;
    }
    if (this.hasPageTitle) {
      if (!this.isObservingTitle && !!this.header?.titleElement) {
        // Header and title element re-attached to DOM - observe title:
        this.observeTitle();
      }

      // Ensures rest of initializeTitle() won't run, if already initialized
      return;
    }

    this.hasPageTitle =
      this.title !== undefined || !!this.customTitleTemplate || !!this.header?.title;
    this.toolbarTitleVisible = !this.hasPageTitle;
    this.hasPageSubtitle = this.subtitle !== undefined || !!this.customSubtitleTemplate;
    if (this.header?.title && !this.toolbarTitle) {
      this.toolbarTitle = this.header.title;
      this.header.title$.pipe(takeUntil(this.ngOnDestroy$)).subscribe((title) => {
        this.toolbarTitle = title;
      });
    }

    this.observeTitle();

    const defaultTitleTemplate = this.customTitleTemplate || this.simpleTitleTemplate;
    /* eslint-disable */
    // prettier-ignore
    this.toolbarTitleTemplate = this.customToolbarTitleTemplate
      ? this.customToolbarTitleTemplate
      : typeof this.toolbarTitle === 'string'
        ? this.simpleToolbarTitleTemplate
        : defaultTitleTemplate;

    if (this.toolbarTitleClick.observed && this.hasInteractiveTitle === undefined) {
      this.hasInteractiveTitle = true;
    }
  }

  private observeTitle() {
    if (!this.hasPageTitle) {
      // Nothing to observe
      return;
    }
    if (this.isObservingTitle) {
      // Already observing
      return;
    }

    // We are not actually observing the title until after the `whenContentReady` promise has resolved,
    // but since we've already checked that the page has a title in the guard above,
    // we'll - eagerly - set this flag now to prevent unnecessary re-runs of the rest of this method:
    this.isObservingTitle = true;

    if (!this.titleIntersectionObserver) {
      this.titleIntersectionObserver = new IntersectionObserver(
        (entries) => {
          // In rare scenarios we get more than 1 entry - use the last one:
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            const showToolbarTitle = !lastEntry.isIntersecting;
            // Only flip the flag and run Change Detection when changed:
            if (showToolbarTitle !== this.toolbarTitleVisible) {
              this.toolbarTitleVisible = showToolbarTitle;
              this.changeDetectorRef.detectChanges();
            }
          }
        },
        { root: this.ionContentElement.nativeElement }
      );
    }

    // Run outside Angular to prevent unnecessary triggering change detection
    // and - under certain conditions - an infinite loop when called within ngAfterContentChecked:
    this.zone.runOutsideAngular(() => {
      this.whenContentReady().then(() => {
        const titleElementRef = this.pageTitle || this.header?.titleElement;
        if (titleElementRef?.nativeElement) {
          this.titleIntersectionObserver.observe(titleElementRef.nativeElement);
        }
      });
    });
  }

  private unobserveTitle() {
    const titleElementRef = this.pageTitle || this.header?.titleElement;
    if (titleElementRef) {
      this.titleIntersectionObserver?.unobserve(titleElementRef.nativeElement);
    }
    this.isObservingTitle = false;
  }

  private initializeActions() {
    if (this.headerActionsTemplate === undefined && !!this.header) {
      this.headerActionsTemplate = this.header.actionsTemplate;
    }
    if (this.hasHeader && this.isObservingActions && !this.header?.actionsElement) {
      // If we're already observing the header's actions element, but it's no longer present,
      // it means it has been removed from DOM (e.g. in virtual scrolling scenarios).
      // Flip observing flag:
      this.isObservingActions = false;
    }

    this.observeActions();

    this.customActions.forEach((pageAction) => {
      if (pageAction.isFixed) {
        this.fixedActionsTemplate = pageAction.template;
      } else if (pageAction.isSticky) {
        this.stickyActionsTemplate = pageAction.template;
      } else {
        this.pageActionsTemplate = pageAction.template;
      }
    });
  }

  private observeActions() {
    if (!this.header?.actionsElement) {
      // Nothing to observe
      return;
    }

    if (this.isObservingActions) {
      // Already observing
      return;
    }

    // We are not actually observing actions until after the `whenContentReady` promise has resolved,
    // but since we've already checked that there's an actions element present in the guard above,
    // we'll - eagerly - set this flag now to prevent unnecessary re-runs of the rest of this method:
    this.isObservingActions = true;

    if (!this.stickyActionsIntersectionObserver) {
      this.stickyActionsIntersectionObserver = new IntersectionObserver(
        (entries) => {
          // In rare scenarios we get more than 1 entry - use the last one:
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            const showToolbarActions = !lastEntry.isIntersecting;
            // Only flip the flag and run Change Detection when changed:
            if (showToolbarActions !== this.toolbarActionsVisible) {
              this.toolbarActionsVisible = showToolbarActions;
              this.changeDetectorRef.detectChanges();
            }
          }
        },
        { root: this.ionContentElement.nativeElement }
      );
    }

    // Run outside Angular to prevent unnecessary triggering change detection
    // and - under certain conditions - an infinite loop when called within ngAfterContentChecked:
    this.zone.runOutsideAngular(() => {
      this.whenContentReady().then(() => {
        if (this.header?.actionsElement?.nativeElement) {
          this.stickyActionsIntersectionObserver.observe(this.header.actionsElement.nativeElement);
        }
      });
    });
  }

  private unobserveActions() {
    if (this.header?.actionsElement) {
      this.stickyActionsIntersectionObserver?.unobserve(this.header.actionsElement.nativeElement);
    }
    this.isObservingActions = false;
  }

  private setActionButtonsWidth() {
    if (!this.ionToolbarButtonsElement) return;

    // Ensure ion-toolbar custom element has been defined (primarily when testing, but doesn't hurt):
    customElements.whenDefined(this.ionToolbarElement.nativeElement.localName).then(() => {
      // Ensure toolbar and buttons have been rendered and has dimensions:
      componentOnReady(this.ionToolbarElement.nativeElement, (toolbar) => {
        let startButtonsWidth = 0;
        let endButtonsWidth = 0;

        this.ionToolbarButtonsElement
          .map((ionButtonsElementRef) => ionButtonsElementRef.nativeElement)
          .forEach((ionButtonsElement) => {
            const style = getComputedStyle(ionButtonsElement);
            const margin = parseInt(style.marginLeft) + parseInt(style.marginRight);
            if (ionButtonsElement.getAttribute('slot') === 'start') {
              startButtonsWidth += ionButtonsElement.offsetWidth + margin;
            } else {
              endButtonsWidth += ionButtonsElement.offsetWidth + margin;
            }
          });

        const actionButtonsMaxWidth = Math.max(startButtonsWidth, endButtonsWidth);
        this.renderer.setStyle(
          toolbar,
          '--action-buttons-width',
          `${actionButtonsMaxWidth}px`,
          RendererStyleFlags2.DashCase
        );
      });
    });
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

  private initializeStickyContent() {
    this.stickyContentTemplate = this.stickyContentRef;
  }

  private createStickyContentIntersectionObserver() {
    const options: IntersectionObserverInit = {
      root: this.ionContentElement.nativeElement,
      threshold: 1,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      if (this.isStickyContentPinned !== !entries[0].isIntersecting) {
        this.isStickyContentPinned = !this.isStickyContentPinned;
        this.changeDetectorRef.detectChanges();
      }
    };
    return new IntersectionObserver(callback, options);
  }

  private getPathname(url: string) {
    return url.split('?')[0];
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

  @HostListener(`window:${selectedTabClickEvent}`)
  _onSelectedTabClick() {
    if (this.content) {
      this.content.scrollToTop(KirbyAnimation.Duration.LONG);
    }
  }
}
