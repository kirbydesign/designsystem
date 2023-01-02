import { fakeAsync, tick } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonRefresher } from '@ionic/angular';
import { createHostFactory, mockProvider, SpectatorHost, SpyObject } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { WindowRef } from '@kirbydesign/designsystem/types';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { FitHeadingDirective } from '../../directives/fit-heading/fit-heading.directive';
import { ButtonComponent } from '../button/button.component';
import { ModalNavigationService } from '../modal/services/modal-navigation.service';
import { selectedTabClickEvent, TabsComponent } from '../tabs';

const { size, fontWeight } = DesignTokenHelper;

import {
  PageActionsComponent,
  PageActionsDirective,
  PageComponent,
  PageContentComponent,
  PageSubtitleDirective,
  PageTitleDirective,
  PageToolbarTitleDirective,
} from './page.component';

describe('PageComponent', () => {
  const titleText = 'Test Page';
  const subtitleText = 'Page subtitle';
  const pageUrl = '';
  const firstOtherUrl = 'firstOther';
  const secondOtherUrl = 'secondOther';
  const firstOtherUrlWithQueryParams = 'firstOther?query=params';
  let spectator: SpectatorHost<PageComponent>;
  let ionToolbar: HTMLElement;
  let ionContent: HTMLIonContentElement;
  let tabBar: SpyObject<TabsComponent>;
  let router: SpyObject<Router>;
  let modalNavigationService: SpyObject<ModalNavigationService>;

  const dummyContent = `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi aperiam deserunt dolore error esse
            laborum magni natus nihil optio perferendis placeat, quae sed, sequi sunt totam voluptatem! Dicta,
            quaerat!</p>
        <p>Aut, dignissimos dolorum ducimus et rem reprehenderit rerum sunt ut! Ad aliquid beatae cum esse et eveniet
            facere natus numquam obcaecati qui quia quisquam quo repellat repudiandae sit, soluta voluptatibus!</p>
        <p>Aspernatur dolore enim incidunt libero molestiae nostrum quasi? Accusamus aut culpa dolores doloribus laborum
            nesciunt voluptates! Consectetur cumque doloremque eius esse et excepturi hic, inventore mollitia nisi,
            reiciendis, tempora unde!</p>
        <p>Blanditiis, cupiditate distinctio earum illo impedit laborum velit veritatis. Accusamus adipisci alias
            aperiam, assumenda corporis culpa cum debitis exercitationem impedit laborum possimus quam qui repellat,
            saepe similique sint soluta. Unde.</p>`;

  const routes: Routes = [
    {
      path: pageUrl,
      component: PageComponent,
    },
    {
      path: firstOtherUrl,
      component: PageComponent,
    },
    {
      path: secondOtherUrl,
      component: PageComponent,
    },
  ];

  const createHost = createHostFactory({
    component: PageComponent,
    imports: [TestHelper.ionicModuleForTest, RouterTestingModule.withRoutes(routes)],
    declarations: [
      ButtonComponent,
      FitHeadingDirective,
      PageContentComponent,
      PageActionsComponent,
      PageActionsDirective,
      PageSubtitleDirective,
      PageTitleDirective,
      PageToolbarTitleDirective,
    ],
    providers: [
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
      mockProvider(TabsComponent, { tabBarBottomHidden: false }),
      mockProvider(ModalNavigationService),
    ],
  });

  beforeEach(async () => {
    spectator = createHost(
      `<kirby-page title="${titleText}" subtitle="${subtitleText}">
         <kirby-page-actions *kirbyPageActions>
           <button kirby-button>Static</button>
         </kirby-page-actions>
         <kirby-page-content>
          ${dummyContent}
         </kirby-page-content>
       </kirby-page>`
    );
    modalNavigationService = spectator.inject(ModalNavigationService);
    modalNavigationService.isModalRoute.and.returnValue(false);
    router = spectator.inject(Router);
    tabBar = spectator.inject(TabsComponent);
    ionToolbar = spectator.queryHost('ion-toolbar');
    ionContent = spectator.queryHost('ion-content');
    await TestHelper.whenReady(ionToolbar);
    await TestHelper.whenReady(ionContent);
  });

  describe('toolbar with dynamic height', () => {
    it('should be correct height on ios-phone without top-safe-area', async () => {
      ionToolbar.style.setProperty('--kirby-safe-area-top', '0px');
      await TestHelper.resizeTestWindow(TestHelper.screensize.phone);

      expect(ionToolbar).toHaveComputedStyle({ height: size('xxxl') });
    });
    it('should be correct height on ios-phone with top-safe-area', async () => {
      ionToolbar.style.setProperty('--kirby-safe-area-top', '33px');
      await TestHelper.resizeTestWindow(TestHelper.screensize.phone);

      expect(ionToolbar).toHaveComputedStyle({ height: size('xxl') });
    });
    it('should be correct height on non-ios-phone', async () => {
      await TestHelper.resizeTestWindow(TestHelper.screensize.phone);

      expect(ionToolbar).toHaveComputedStyle({ height: size('xxxl') });
    });
    it('should be correct height on tablet', async () => {
      await TestHelper.resizeTestWindow(TestHelper.screensize.tablet);

      expect(ionToolbar).toHaveComputedStyle({ height: size('xxxxl') });
    });
    it('should be correct height on desktop', async () => {
      await TestHelper.resizeTestWindow(TestHelper.screensize.desktop);

      expect(ionToolbar).toHaveComputedStyle({ height: size('xxxxl') });
    });
  });

  describe('having static page action', () => {
    it('should show the action in the toolbar when content not scrolled', () => {
      const staticPageActionButton = ionToolbar.querySelector(
        'ion-buttons[slot="primary"] button[kirby-button]'
      );

      expect(staticPageActionButton).toBeTruthy();
    });

    it('should show the action in the toolbar when content scrolled', async () => {
      ionContent.style.height = '200px';
      await ionContent.scrollToPoint(0, 16, 0);
      spectator.detectChanges();
      await TestHelper.whenTrue(() => spectator.component['isContentScrolled']);
      spectator.detectChanges();

      expect(ionToolbar).toHaveClass('content-scrolled');

      const staticPageActionButton = ionToolbar.querySelector(
        'ion-buttons[slot="primary"] button[kirby-button]'
      );

      expect(staticPageActionButton).toBeTruthy();
    });
  });

  describe('having a title and subtitle', () => {
    it('should have the configured title in the toolbar-title', () => {
      const toolbarTitle = ionToolbar.querySelector('ion-title .toolbar-title');

      expect(toolbarTitle).toHaveText(titleText);
    });

    it('should render the toolbar-title with the correct font-weight', () => {
      const toolbarTitle = ionToolbar.querySelector('ion-title .toolbar-title');

      expect(toolbarTitle).toHaveComputedStyle({
        'font-weight': fontWeight('bold'),
      });
    });

    it('should have the configured title', () => {
      const pageTitleHeading = ionContent.querySelector('.page-title > h1');

      expect(spectator.component.title).toEqual(titleText);
      expect(pageTitleHeading).toHaveText(titleText, true);
    });

    it('should render title with correct margin and padding', () => {
      const pageTitle = ionContent.querySelector('.page-title');
      const pageTitleHeading = pageTitle.querySelector(':scope > h1');

      expect(pageTitle).toHaveComputedStyle({
        'margin-left': '0px',
        'margin-right': '0px',
        'margin-top': '0px',
        'margin-bottom': '0px',
        'padding-left': '0px',
        'padding-right': '0px',
        'padding-top': '0px',
        'padding-bottom': '0px',
      });
      expect(pageTitleHeading).toHaveComputedStyle({
        'margin-left': '0px',
        'margin-right': '0px',
        'margin-top': '0px',
        'margin-bottom': '0px',
        'padding-left': '0px',
        'padding-right': '0px',
        'padding-top': '0px',
        'padding-bottom': '0px',
      });
    });

    it('should have the configured subtitle', () => {
      const pageSubtitle = ionContent.querySelector('.page-subtitle');

      expect(spectator.component.subtitle).toEqual(subtitleText);
      expect(pageSubtitle).toHaveText(subtitleText, true);
    });

    it('should render subitle with correct margin and padding', () => {
      const pageSubtitle = ionContent.querySelector('.page-subtitle');

      expect(pageSubtitle).toHaveComputedStyle({
        'margin-left': '0px',
        'margin-right': '0px',
        'margin-top': size('xxs'),
        'margin-bottom': '0px',
        'padding-left': '0px',
        'padding-right': '0px',
        'padding-top': '0px',
        'padding-bottom': '0px',
      });
    });
  });

  describe('having a title and subtitle', () => {
    it('should have the configured title', async () => {
      await TestHelper.whenReady(ionContent);
      const pageTitleHeading = ionContent.querySelector('.page-title > h1');

      expect(spectator.component.title).toEqual(titleText);
      expect(pageTitleHeading).toHaveText(titleText, true);
    });

    it('should render title with correct margin and padding', async () => {
      await TestHelper.whenReady(ionContent);
      const pageTitle = ionContent.querySelector('.page-title');
      const pageTitleHeading = pageTitle.querySelector(':scope > h1');

      expect(pageTitle).toHaveComputedStyle({
        'margin-left': '0px',
        'margin-right': '0px',
        'margin-top': '0px',
        'margin-bottom': '0px',
        'padding-left': '0px',
        'padding-right': '0px',
        'padding-top': '0px',
        'padding-bottom': '0px',
      });
      expect(pageTitleHeading).toHaveComputedStyle({
        'margin-left': '0px',
        'margin-right': '0px',
        'margin-top': '0px',
        'margin-bottom': '0px',
        'padding-left': '0px',
        'padding-right': '0px',
        'padding-top': '0px',
        'padding-bottom': '0px',
      });
    });

    it('should have the configured subtitle', async () => {
      await TestHelper.whenReady(ionContent);
      const pageSubtitle = ionContent.querySelector('.page-subtitle');

      expect(spectator.component.subtitle).toEqual(subtitleText);
      expect(pageSubtitle).toHaveText(subtitleText, true);
    });

    it('should render subitle with correct margin and padding', async () => {
      await TestHelper.whenReady(ionContent);
      const pageSubtitle = ionContent.querySelector('.page-subtitle');

      expect(pageSubtitle).toHaveComputedStyle({
        'margin-left': '0px',
        'margin-right': '0px',
        'margin-top': size('xxs'),
        'margin-bottom': '0px',
        'padding-left': '0px',
        'padding-right': '0px',
        'padding-top': '0px',
        'padding-bottom': '0px',
      });
    });
  });

  it('should render toolbar with correct padding', async () => {
    await TestHelper.whenReady(ionToolbar);
    const toolbarContainer = ionToolbar.shadowRoot.querySelector('.toolbar-container');
    expect(toolbarContainer).toBeTruthy();
    expect(toolbarContainer).toHaveComputedStyle({
      'padding-left': size('xxxs'),
      'padding-right': size('xxxs'),
      'padding-top': '0px',
      'padding-bottom': '0px',
    });
  });

  it('should render back button with correct size', async () => {
    await TestHelper.whenReady(ionToolbar);
    const ionBackButton = spectator.queryHost('ion-toolbar ion-buttons ion-back-button');
    expect(ionBackButton).toHaveComputedStyle({
      width: size('xl'),
      height: size('xl'),
    });
  });

  it('should hide tab bar when tabBarBottomHidden is true', fakeAsync(() => {
    expect(tabBar.tabBarBottomHidden).toBe(false);

    spectator.setInput('tabBarBottomHidden', true);
    spectator.detectChanges();
    tick();

    expect(tabBar.tabBarBottomHidden).toBe(true);
  }));

  it('should show tab bar when tabBarBottomHidden is false', fakeAsync(() => {
    // hide tab bar
    spectator.setInput('tabBarBottomHidden', true);
    spectator.detectChanges();
    tick();
    expect(tabBar.tabBarBottomHidden).toBe(true);

    // show tab bar
    spectator.setInput('tabBarBottomHidden', false);
    spectator.detectChanges();
    tick();

    expect(tabBar.tabBarBottomHidden).toBe(false);
  }));

  it('should show tab bar when tabBarBottomHidden is true on leave', () => {
    spectator.setInput('tabBarBottomHidden', true);

    navigateToUrl(firstOtherUrl);

    expect(tabBar.tabBarBottomHidden).toBe(false);
  });

  describe('with enter and leave event binding', () => {
    let enterEventHandler: jasmine.Spy<jasmine.Func>;
    let leaveEventHandler: jasmine.Spy<jasmine.Func>;

    beforeEach(() => {
      enterEventHandler = jasmine.createSpy();
      leaveEventHandler = jasmine.createSpy();
      spectator.output('enter').subscribe(enterEventHandler);
      spectator.output('leave').subscribe(leaveEventHandler);
    });

    it('should emit the correct event(s) when navigating navigating to the page', () => {
      navigateToUrl(firstOtherUrl);
      enterEventHandler.calls.reset();
      leaveEventHandler.calls.reset();

      navigateUrls([secondOtherUrl, pageUrl]);

      expect(enterEventHandler).toHaveBeenCalledTimes(1);
      expect(leaveEventHandler).toHaveBeenCalledTimes(0);
    });

    it('should emit the correct event(s) when navigating away from the page', () => {
      navigateToUrl(pageUrl);
      enterEventHandler.calls.reset();
      leaveEventHandler.calls.reset();

      navigateUrls([firstOtherUrl, secondOtherUrl]);

      expect(enterEventHandler).toHaveBeenCalledTimes(0);
      expect(leaveEventHandler).toHaveBeenCalledTimes(1);
    });

    it('should emit the correct event(s) when navigating away from the page and back again', () => {
      navigateToUrl(pageUrl);
      enterEventHandler.calls.reset();
      leaveEventHandler.calls.reset();

      navigateUrls([firstOtherUrl, secondOtherUrl, pageUrl]);

      expect(enterEventHandler).toHaveBeenCalledTimes(1);
      expect(leaveEventHandler).toHaveBeenCalledTimes(1);
    });

    it('should emit the correct event(s) when navigating to the page and away again', () => {
      navigateToUrl(secondOtherUrl);
      enterEventHandler.calls.reset();
      leaveEventHandler.calls.reset();

      navigateUrls([firstOtherUrl, secondOtherUrl, pageUrl, firstOtherUrl, secondOtherUrl]);

      expect(enterEventHandler).toHaveBeenCalledTimes(1);
      expect(leaveEventHandler).toHaveBeenCalledTimes(1);
    });

    it('should not emit event(s) when changing query params', () => {
      navigateToUrl(firstOtherUrl);
      enterEventHandler.calls.reset();
      leaveEventHandler.calls.reset();

      navigateToUrl(firstOtherUrlWithQueryParams);

      expect(enterEventHandler).toHaveBeenCalledTimes(0);
      expect(leaveEventHandler).toHaveBeenCalledTimes(0);
    });
  });

  describe('with a back-button', () => {
    let ionBackButton;

    beforeEach(() => {
      ionBackButton = spectator.queryHost('ion-toolbar ion-buttons ion-back-button');
    });

    it('should call the default click handler if no back-button-click observer is provided', () => {
      const defaultHandler = jasmine.createSpy();
      ionBackButton.onclick = defaultHandler;

      spectator.click(ionBackButton);

      expect(defaultHandler).toHaveBeenCalledTimes(1);
    });

    it('should emit an event on click if a back-button-click observer is provided', () => {
      const subscriber = jasmine.createSpy();
      spectator.output('backButtonClick').subscribe(subscriber);

      spectator.click(ionBackButton);

      expect(subscriber).toHaveBeenCalledTimes(1);
    });
  });

  describe('pull-to-refresh', () => {
    it('should be available when "refresh" is subscribed to', () => {
      spectator.output('refresh').subscribe(() => {});
      spectator.detectComponentChanges();
      expect(spectator.query(IonRefresher)).not.toBeNull();
    });

    it('should not be available when "refresh" is not subscribed to', () => {
      expect(spectator.query(IonRefresher)).toBeNull();
    });
  });

  describe('tab navigation', () => {
    it('should scroll to top when tab is clicked', () => {
      const scrollToTopSpy = jasmine.createSpy();
      (spectator.component as any).content.scrollToTop = scrollToTopSpy;

      window.dispatchEvent(new Event(selectedTabClickEvent));

      expect(scrollToTopSpy).toHaveBeenCalledTimes(1);
    });
  });

  const navigateUrls = (urls: string[]) => {
    urls.forEach((url: string) => navigateToUrl(url));
  };

  const navigateToUrl = fakeAsync((url: string) => {
    router.navigateByUrl(url);
    tick();
  });
});
