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
import { IonContent, IonFooter, IonHeader } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { KirbyAnimation } from '../../animation/kirby-animation';
import { FitHeadingConfig } from '../../directives/fit-heading/fit-heading.directive';
import { WindowRef } from '../../types/window-ref';
import { ModalWrapperComponent } from '../modal/modal-wrapper/modal-wrapper.component';
import { ModalNavigationService } from '../modal/services/modal-navigation.service';
import { selectedTabClickEvent } from '../tabs/tab-button/tab-button.events';
import { TabsComponent } from '../tabs/tabs.component';

type stickyConfig = { sticky: boolean };
type stickyOnlyConfig = { stickyOnly: boolean; stickyTarget?: HTMLElement };
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
  @Input('kirbyPageActions') config: stickyConfig | fixedConfig | stickyOnlyConfig;
  private readonly stickyDefault = true;
  private readonly stickyOnlyDefault = false;
  private readonly fixedDefault = false;

  constructor(public template: TemplateRef<any>) {}

  get isSticky(): boolean {
    return this.config ? (this.config as stickyConfig).sticky : this.stickyDefault;
  }

  get isStickyOnly(): boolean {
    return this.config ? (this.config as stickyOnlyConfig).stickyOnly : this.stickyOnlyDefault;
  }

  get isFixed(): boolean {
    return this.config ? (this.config as fixedConfig).fixed : this.fixedDefault;
  }

  get stickyTarget(): Element {
    return this.config ? (this.config as stickyOnlyConfig).stickyTarget : undefined;
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
  selector: 'kirby-page-progress',
  template: `
    <ng-content></ng-content>
  `,
  styles: [':host {display: flex}'],
})
export class PageProgressComponent implements OnInit {
  // TODO: Find alternative implementation, which aligns with future page configuration / consumption
  // This implementation was chosen over expanding `moveChild` method in component wrapper with yet another scenario
  @HostBinding('attr.slot') slot = 'start';

  constructor(@Optional() @SkipSelf() private modalWrapper: ModalWrapperComponent) {}

  ngOnInit(): void {
    if (this.modalWrapper && this.modalWrapper.config.flavor === 'drawer') {
      this.slot = 'end';
    }
  }
}

@Component({
  selector: 'kirby-page-title',
  template: `
    <ng-content></ng-content>
  `,
})
export class PageTitleComponent {}

@Component({
  selector: 'kirby-page-header',
  styles: [
    `
      :host {
        display: block;
      }

      .wrapper {
        max-width: 720px;
        margin: 0 auto;
        padding: 16px 32px;
        padding-top: 0;
      }
    `,
  ],
  template: `
    <div class="wrapper"><ng-content></ng-content></div>
  `,
})
export class PageHeaderComponent {}

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

  @ContentChild(PageHeaderComponent, { static: false, read: ElementRef })
  pageHeader: ElementRef<HTMLElement>;

  @ViewChild('simpleTitleTemplate', { static: true, read: TemplateRef })
  private simpleTitleTemplate: TemplateRef<any>;
  @ViewChild('simpleToolbarTitleTemplate', { static: true, read: TemplateRef })
  private simpleToolbarTitleTemplate: TemplateRef<any>;
  @ContentChild(PageToolbarTitleDirective, { static: false, read: TemplateRef })
  private customToolbarTitleTemplate: TemplateRef<any>;
  @ContentChild(PageTitleDirective, { static: false, read: TemplateRef })
  customTitleTemplate: TemplateRef<any>;
  @ContentChild(PageTitleDirective, { static: false, read: ElementRef })
  customTitleElement: ElementRef<HTMLElement>;
  @ContentChildren(PageActionsDirective)
  customActions: QueryList<PageActionsDirective>;
  @ViewChild('canvasPageActions', { static: false, read: ElementRef })
  canvasPageActions: ElementRef<HTMLElement>;
  @ContentChildren(PageContentDirective)
  private customContent: QueryList<PageContentDirective>;

  hasPageTitle: boolean;
  hasActionsInPage: boolean;
  toolbarTitleVisible: boolean;
  toolbarFixedActionsVisible: boolean;
  toolbarStickyActionsVisible: boolean;
  stickyActionsTarget: Element;

  fitHeadingConfig: FitHeadingConfig;

  toolbarTitleTemplate: TemplateRef<any>;
  customContentTemplate: TemplateRef<any>;
  pageActionsTemplate: TemplateRef<any>;
  fixedContentTemplate: TemplateRef<any>;
  stickyActionsTemplate: TemplateRef<any>;
  fixedActionsTemplate: TemplateRef<any>;
  private pageTitleIntersectionObserverRef: IntersectionObserver = this.pageTitleIntersectionObserver();
  private stickyActionIntersectionObserverRef: IntersectionObserver = this.stickyActionsIntersectionObserver();
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
    // console.log('ngAfterViewInit');

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
    this.stickyActionIntersectionObserverRef.disconnect();
    this.window.removeEventListener(selectedTabClickEvent, () => {
      this.content.scrollToTop(KirbyAnimation.Duration.LONG);
    });
  }

  private observePageTitle() {
    const pageTitleElement = (this.pageTitle || this.customTitleElement)?.nativeElement;
    // console.log('observePageTitle - pageTitleElement:', pageTitleElement);
    if (pageTitleElement && pageTitleElement instanceof Element) {
      this.pageTitleIntersectionObserverRef.observe(pageTitleElement);
    }
  }

  private unobservePageTitle() {
    const pageTitleElement = (this.pageTitle || this.customTitleElement)?.nativeElement;
    if (pageTitleElement && pageTitleElement instanceof Element) {
      this.pageTitleIntersectionObserverRef.unobserve(pageTitleElement);
    }
  }

  private observeStickyActions() {
    // console.count('observeStickyActions');
    if (this.stickyActionsTarget) {
      this.stickyActionIntersectionObserverRef.observe(this.stickyActionsTarget);
    }
  }

  private unobserveStickyActions() {
    if (this.stickyActionsTarget) {
      this.stickyActionIntersectionObserverRef.unobserve(this.stickyActionsTarget);
    }
  }

  private onEnter() {
    // console.log('onEnter');
    if (this.hasEntered) return;
    this.hasEntered = true;

    this.enter.emit();
    this.observePageTitle();
    this.observeStickyActions();
  }

  private onLeave() {
    this.leave.emit();
    this.unobservePageTitle();
    this.unobserveStickyActions();
    this.hasEntered = false;

    if (this.tabBarBottomHidden && this.tabsComponent) {
      this.tabsComponent.tabBarBottomHidden = false;
    }
  }

  private initializeTitle() {
    // console.count('initializeTitle');
    // Ensures initializeTitle() won't run, if already initialized
    if (this.hasPageTitle !== undefined) return;
    if (this.hasPageTitle !== undefined && this.pageHeader) return;

    this.hasPageTitle = this.title !== undefined || !!this.customTitleTemplate;
    this.toolbarTitleVisible = !this.hasPageTitle && !this.pageHeader;

    setTimeout(() => {
      this.observePageTitle();
    });

    const defaultTitleTemplate = this.customTitleTemplate || this.simpleTitleTemplate;
    // tslint:disable:prettier
    // prettier-ignore
    this.toolbarTitleTemplate = this.customToolbarTitleTemplate
      ? this.customToolbarTitleTemplate
      : typeof this.toolbarTitle === 'string'
        ? this.simpleToolbarTitleTemplate
        : defaultTitleTemplate;
  }

  private hasInitializedActions = false;
  private initializeActions() {
    if (this.hasInitializedActions) return;
    this.customActions.forEach((pageAction) => {
      if (pageAction.isFixed) {
        this.fixedActionsTemplate = pageAction.template;
        this.toolbarFixedActionsVisible = true;
      } else {
        if (!pageAction.isStickyOnly) {
          this.pageActionsTemplate = pageAction.template;
        }
        if (pageAction.isSticky || pageAction.isStickyOnly) {
          this.stickyActionsTemplate = pageAction.template;
          this.stickyActionsTarget =
            pageAction.stickyTarget || this.canvasPageActions?.nativeElement;
          // console.log('sticky action found - stickyTarget?', this.stickyActionsTarget);
          this.observeStickyActions();
        }
      }
    });
    this.hasActionsInPage = !!this.pageActionsTemplate;
    this.hasInitializedActions = this.customActions.length > 0;
    if (this.stickyActionsTemplate && !this.stickyActionsTarget) this.hasInitializedActions = false;
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
        this.changeDetectorRef.detectChanges();
      } else {
        initialized = true;
      }
    };
    return new IntersectionObserver(callback, options);
  }

  private stickyActionsIntersectionObserver() {
    const options = {
      rootMargin: '0px',
    };

    let initialized = false;
    const callback = (entries) => {
      if (initialized) {
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
