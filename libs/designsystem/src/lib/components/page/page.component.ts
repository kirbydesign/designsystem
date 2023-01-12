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
import { IonBackButtonDelegate, IonContent, IonFooter, IonHeader } from '@ionic/angular';
import { ScrollDetail } from '@ionic/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

import { KirbyAnimation } from '../../animation/kirby-animation';
import { FitHeadingConfig } from '../../directives/fit-heading/fit-heading.directive';
import { ModalWrapperComponent } from '../modal/modal-wrapper/modal-wrapper.component';
import { ModalNavigationService } from '../modal/services/modal-navigation.service';
import {
  ModalElementComponent,
  ModalElementsAdvertiser,
  ModalElementType,
} from '../modal/services/modal.interfaces';
import { selectedTabClickEvent } from '../tabs/tab-button/tab-button.events';
import { TabsComponent } from '../tabs/tabs.component';

/**
 * Specify scroll event debounce time in ms and scrolled offset from top in pixels
 */
const contentScrollDebounceTimeInMS = 10;
const contentScrolledOffsetInPixels = 4;

type stickyConfig = { sticky: boolean };
type fixedConfig = { fixed: boolean };

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

@Directive({
  selector: '[kirbyPageStickyContent]',
})
export class PageStickyContentDirective {}

@Component({
  selector: 'kirby-page-progress',
  template: ` <ng-content></ng-content> `,
  styles: [':host {display: flex}'],
})
export class PageProgressComponent extends ModalElementComponent implements OnInit {
  // TODO: Find alternative implementation, which aligns with future page configuration / consumption
  // This implementation was chosen over expanding `moveChild` method in component wrapper with yet another scenario
  @HostBinding('attr.slot') slot = 'start';

  constructor(
    @Optional() @SkipSelf() private modalWrapper: ModalWrapperComponent,
    @Optional() modalElementsAdvertiser: ModalElementsAdvertiser,
    elementRef: ElementRef<HTMLElement>
  ) {
    super(ModalElementType.PAGE_PROGRESS, elementRef, modalElementsAdvertiser);
  }

  ngOnInit(): void {
    if (this.modalWrapper && this.modalWrapper.config.flavor === 'drawer') {
      this.slot = 'end';
    }
  }
}
@Component({
  selector: 'kirby-page-title',
  template: ` <ng-content></ng-content> `,
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
  template: ` <ng-content></ng-content> `,
})
export class PageContentComponent {}

@Component({
  selector: 'kirby-page-actions',
  template: ` <ng-content select="button[kirby-button]"></ng-content> `,
})
export class PageActionsComponent {}

@Component({
  selector: 'kirby-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() maxWidth: 'default' | 'standard' | 'optimized' | 'full' = 'default';

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
  @Output() refresh = new EventEmitter<PullToRefreshEvent>();
  @Output() backButtonClick = new EventEmitter<Event>();

  @ViewChild(IonContent, { static: true }) private content?: IonContent;
  @ViewChild(IonContent, { static: true, read: ElementRef })
  private ionContentElement: ElementRef<HTMLIonContentElement>;
  @ViewChild(IonHeader, { static: true, read: ElementRef })
  ionHeaderElement: ElementRef<HTMLIonHeaderElement>;
  @ViewChild(IonFooter, { static: true, read: ElementRef })
  private ionFooterElement: ElementRef<HTMLIonFooterElement>;

  @ViewChild(IonBackButtonDelegate, { static: false })
  private backButtonDelegate: IonBackButtonDelegate;
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

  hasPageTitle: boolean;
  hasPageSubtitle: boolean;
  toolbarTitleVisible: boolean;
  isContentScrolled: boolean;
  isStickyContentPinned: boolean;

  fitHeadingConfig: FitHeadingConfig;

  toolbarTitleTemplate: TemplateRef<any>;
  customContentTemplate: TemplateRef<any>;
  pageActionsTemplate: TemplateRef<any>;
  fixedContentTemplate: TemplateRef<any>;
  stickyActionsTemplate: TemplateRef<any>;
  fixedActionsTemplate: TemplateRef<any>;
  stickyContentTemplate: TemplateRef<PageStickyContentDirective>;

  private pageTitleIntersectionObserverRef: IntersectionObserver =
    this.pageTitleIntersectionObserver();
  private stickyContentIntersectionObserverRef = this.stickyContentIntersectionObserver();

  private url: string;
  private isActive: boolean;

  private ngOnDestroy$: Subject<void> = new Subject<void>();
  private contentScrolled$: Observable<ScrollDetail>;

  private navigationStart$: Observable<RouterEvent> = this.router.events.pipe(
    filter((event: RouterEvent) => event instanceof NavigationStart),
    takeUntil(this.ngOnDestroy$)
  );

  private navigationEnd$: Observable<RouterEvent> = this.router.events.pipe(
    filter((event: RouterEvent) => event instanceof NavigationEnd),
    takeUntil(this.ngOnDestroy$)
  );

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
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
    if (changes.subtitle && !changes.subtitle.isFirstChange) {
      this.subtitle = changes.title.currentValue;
      this.hasPageSubtitle = this.subtitle !== undefined;
    }
  }

  ngAfterViewInit(): void {
    this.contentScrolled$ = this.content.ionScroll.pipe(
      debounceTime(contentScrollDebounceTimeInMS),
      map((event) => event.detail),
      takeUntil(this.ngOnDestroy$)
    );

    this.contentScrolled$.subscribe((scrollInfo: ScrollDetail) => {
      this.isContentScrolled = scrollInfo.scrollTop > contentScrolledOffsetInPixels;
      this.changeDetectorRef.detectChanges();
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
  }

  ngAfterContentChecked(): void {
    this.initializeTitle();
    this.initializeActions();
    this.initializeContent();
    this.initializeStickyContent();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();

    this.pageTitleIntersectionObserverRef.disconnect();
    this.stickyContentIntersectionObserverRef.disconnect();
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
    if (this.pageTitle) {
      this.pageTitleIntersectionObserverRef.observe(this.pageTitle.nativeElement);
    }
  }

  private onLeave() {
    if (!this.isActive) return;
    this.isActive = false;

    this.leave.emit();
    if (this.pageTitle) {
      this.pageTitleIntersectionObserverRef.unobserve(this.pageTitle.nativeElement);
    }

    if (this.tabBarBottomHidden && this.tabsComponent) {
      this.tabsComponent.tabBarBottomHidden = false;
    }
  }

  private interceptBackButtonClicksSetup() {
    // Intercept back-button click events, defaulting to the built-in click-handler.
    if (this.backButtonClick.observers.length === 0) {
      this.backButtonClick
        .pipe(takeUntil(this.ngOnDestroy$))
        .subscribe(this.backButtonDelegate.onClick.bind(this.backButtonDelegate));
    }
    this.backButtonDelegate.onClick = (event: Event) => {
      this.backButtonClick.emit(event);
    };
  }

  private initializeStickyIntersectionObserver() {
    if (this.stickyContentTemplate) {
      // Sticky content present - start observing for stickiness
      setTimeout(() => {
        this.stickyContentIntersectionObserverRef.observe(
          this.stickyContentContainer.nativeElement
        );
      });
    }
  }

  private initializeTitle() {
    // Ensures initializeTitle() won't run, if already initialized
    if (this.hasPageTitle) return;
    this.hasPageTitle = this.title !== undefined || !!this.customTitleTemplate;
    this.toolbarTitleVisible = !this.hasPageTitle;
    this.hasPageSubtitle = this.subtitle !== undefined || !!this.customSubtitleTemplate;

    if (this.hasPageTitle) {
      setTimeout(() => {
        this.pageTitleIntersectionObserverRef.observe(this.pageTitle.nativeElement);
      });
    }

    const defaultTitleTemplate = this.customTitleTemplate || this.simpleTitleTemplate;
    /* eslint-disable */
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
      } else if (pageAction.isSticky) {
        this.stickyActionsTemplate = pageAction.template;
      } else {
        this.pageActionsTemplate = pageAction.template;
      }
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

  private pageTitleIntersectionObserver() {
    const options = {
      rootMargin: '0px',
    };

    let initialized = false;
    const callback = (entries) => {
      if (initialized) {
        this.toolbarTitleVisible = !entries[0].isIntersecting;
        this.changeDetectorRef.detectChanges();
      } else {
        initialized = true;
      }
    };
    return new IntersectionObserver(callback, options);
  }

  private stickyContentIntersectionObserver() {
    const options: IntersectionObserverInit = {
      threshold: 1,
    };

    const callback = (entries) => {
      // The sticky content is pinned when it doesn't fully intersect the viewport
      this.isStickyContentPinned = !entries[0].isIntersecting;
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
