import { fakeAsync, tick } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonRefresher } from '@ionic/angular';
import { createHostFactory, mockProvider, SpectatorHost, SpyObject } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { WindowRef } from '@kirbydesign/designsystem/types';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { selectedTabClickEvent, TabsComponent } from '@kirbydesign/designsystem/tabs';

const { size, fontWeight, getColor } = DesignTokenHelper;

import { ModalNavigationService } from '@kirbydesign/designsystem/modal';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { FitHeadingDirective } from '@kirbydesign/designsystem/shared';
import {
  PageActionsComponent,
  PageActionsDirective,
  PageComponent,
  PageContentComponent,
  PageStickyContentDirective,
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
  const shadedBackgroundColor = '#f3f3f3';
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
    imports: [
      TestHelper.ionicModuleForTest,
      RouterTestingModule.withRoutes(routes),
      ButtonComponent,
      FitHeadingDirective,
    ],
    declarations: [
      PageContentComponent,
      PageActionsComponent,
      PageActionsDirective,
      PageSubtitleDirective,
      PageTitleDirective,
      PageToolbarTitleDirective,
      PageStickyContentDirective,
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

  beforeAll(() => {
    //Ensure css transitions run immediately:
    const testStyles = window.document.createElement('style');
    testStyles.innerHTML =
      '*, *::before, *::after, ::part(background) { transition-duration: 0ms !important; }';
    window.document.body.appendChild(testStyles);
  });

  describe('by default', () => {
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

    describe('on phone', () => {
      beforeAll(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
      });

      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      describe('toolbar', () => {
        describe('height', () => {
          it('should be correct on ios-phone without top-safe-area', () => {
            ionToolbar.style.setProperty('--kirby-safe-area-top', '0px');

            expect(ionToolbar).toHaveComputedStyle({ height: size('xxxl') });
          });
          it('should be correct on ios-phone with top-safe-area', () => {
            ionToolbar.style.setProperty('--kirby-safe-area-top', '33px');

            expect(ionToolbar).toHaveComputedStyle({ height: size('xxxl') });
          });
          it('should be correct on non-ios-phone', () => {
            expect(ionToolbar).toHaveComputedStyle({ height: size('xxxl') });
          });
        });

        describe('divider and shaded background', () => {
          describe('before scroll', () => {
            it('should not render toolbar divider', () => {
              expect(ionToolbar).toHaveComputedStyle(
                {
                  'background-color': 'rgba(0, 0, 0, 0)',
                },
                ':before'
              );
            });

            it('should not render shaded toolbar background', () => {
              const toolbarBackground = ionToolbar.shadowRoot.querySelector('.toolbar-background');
              expect(toolbarBackground).toHaveComputedStyle({
                'background-color': getColor('background-color'),
              });
            });
          });

          describe('after scrolling page title above content top', () => {
            beforeEach(async () => {
              // Scroll page title above content top:
              const pageTitle: HTMLElement = ionContent.querySelector('.page-title');
              const andThenSome = 10;
              const verticalScrollAmount =
                pageTitle.offsetTop + pageTitle.offsetHeight + andThenSome;

              await ionContent.scrollToPoint(0, verticalScrollAmount, 0);
              await TestHelper.whenTrue(() => spectator.component.isContentScrolled);
            });

            it('should render toolbar divider', () => {
              expect(ionToolbar).toHaveComputedStyle(
                {
                  'background-color': getColor('medium'),
                },
                ':before'
              );
            });

            it('should render shaded toolbar background', () => {
              const toolbarBackground = ionToolbar.shadowRoot.querySelector('.toolbar-background');
              expect(toolbarBackground).toHaveComputedStyle({
                'background-color': shadedBackgroundColor,
              });
            });
          });
        });
      });
    });

    describe('on tablet', () => {
      beforeAll(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.tablet);
      });

      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      describe('toolbar', () => {
        describe('height', () => {
          it('should be correct on tablet', () => {
            expect(ionToolbar).toHaveComputedStyle({ height: size('xxxxxl') });
          });
        });
      });
    });

    describe('on desktop', () => {
      beforeAll(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.desktop);
      });

      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      describe('toolbar', () => {
        describe('height', () => {
          it('should be correct on desktop', () => {
            expect(ionToolbar).toHaveComputedStyle({ height: size('xxxxxl') });
          });
        });

        it('should render toolbar divider by default', () => {
          expect(ionToolbar).toHaveComputedStyle(
            {
              'background-color': getColor('medium'),
            },
            ':before'
          );
        });

        it('should render shaded toolbar background by default', () => {
          const toolbarBackground = ionToolbar.shadowRoot.querySelector('.toolbar-background');
          expect(toolbarBackground).toHaveComputedStyle({
            'background-color': shadedBackgroundColor,
          });
        });
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
        const verticalScrollAmount = 10;
        await ionContent.scrollToPoint(0, verticalScrollAmount, 0);
        await TestHelper.whenTrue(() => spectator.component.isContentScrolled);

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

      it('should render subtitle with correct margin and padding', () => {
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

    describe('with maxWidth is defined', () => {
      it('should apply the correct content width', async () => {
        await TestHelper.whenReady(ionContent);
        const contentInner = ionContent.querySelector('.content-inner');
        expect(contentInner).toHaveComputedStyle({
          'max-width': '720px',
        });
      });

      describe('and is set to standard', () => {
        beforeEach(() => {
          spectator.component.maxWidth = 'standard';
          spectator.detectChanges();
        });

        it('should apply correct content width', async () => {
          await TestHelper.whenReady(ionContent);
          const contentInner = ionContent.querySelector('.content-inner');
          expect(contentInner).toHaveComputedStyle({
            'max-width': '792px',
          });
        });
      });

      describe('and is set to optimized', () => {
        beforeEach(() => {
          spectator.component.maxWidth = 'optimized';
          spectator.detectChanges();
        });

        it('should apply correct content width', async () => {
          await TestHelper.whenReady(ionContent);
          const contentInner = ionContent.querySelector('.content-inner');
          expect(contentInner).toHaveComputedStyle({
            'max-width': '1092px',
          });
        });
      });

      describe('and is set to full', () => {
        beforeEach(() => {
          spectator.component.maxWidth = 'full';
          spectator.detectChanges();
        });

        it('should apply correct content width', async () => {
          await TestHelper.whenReady(ionContent);
          const contentInner = ionContent.querySelector('.content-inner');
          expect(contentInner).toHaveComputedStyle({
            'max-width': '100%',
          });
        });
      });
    });

    it('should scroll to top when tab is clicked', () => {
      const scrollToTopSpy = jasmine.createSpy();
      spectator.component['content'].scrollToTop = scrollToTopSpy;

      window.dispatchEvent(new Event(selectedTabClickEvent));

      expect(scrollToTopSpy).toHaveBeenCalledTimes(1);
    });

    const navigateUrls = (urls: string[]) => {
      urls.forEach((url: string) => navigateToUrl(url));
    };

    const navigateToUrl = fakeAsync((url: string) => {
      router.navigateByUrl(url);
      tick();
    });
  });

  describe('with sticky content', () => {
    let ionScrollElement: HTMLElement;
    let stickyContentContainer: HTMLElement;

    beforeEach(async () => {
      spectator = createHost(
        `<kirby-page title="${titleText}" subtitle="${subtitleText}">
           <div *kirbyPageStickyContent>
             Sticky content
           </div>
           <kirby-page-content>
            ${dummyContent}
           </kirby-page-content>
         </kirby-page>`
      );
      modalNavigationService = spectator.inject(ModalNavigationService);
      modalNavigationService.isModalRoute.and.returnValue(false);
      ionToolbar = spectator.queryHost('ion-toolbar');
      ionContent = spectator.queryHost('ion-content');
      await TestHelper.whenReady(ionToolbar);
      await TestHelper.whenReady(ionContent);
      ionScrollElement = await ionContent.getScrollElement();
      stickyContentContainer = ionContent.querySelector('.sticky-content-container');

      // Ensure content has height:
      ionContent.style.height = '200px';

      // Wait for sticky content intersection observer:
      await TestHelper.whenTrue(() => !spectator.component.isStickyContentPinned);
      expect(ionToolbar).not.toHaveClass('content-pinned');
    });

    describe('by default', () => {
      it('should render sticky content', () => {
        expect(stickyContentContainer).toBeDefined();
      });

      it('should render sticky content with correct background color', () => {
        expect(stickyContentContainer).toHaveComputedStyle(
          {
            'background-color': getColor('background-color'),
          },
          ':before'
        );
      });

      it('should not render sticky content divider', () => {
        expect(stickyContentContainer).toHaveComputedStyle(
          {
            'background-color': 'rgba(0, 0, 0, 0)',
          },
          ':after'
        );
      });
    });

    describe('on phone', () => {
      beforeAll(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
      });

      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      describe('before scroll', () => {
        it('should not render toolbar divider', () => {
          expect(ionToolbar).toHaveComputedStyle(
            {
              'background-color': 'rgba(0, 0, 0, 0)',
            },
            ':before'
          );
        });

        it('should not render shaded toolbar background', () => {
          const toolbarBackground = ionToolbar.shadowRoot.querySelector('.toolbar-background');
          expect(toolbarBackground).toHaveComputedStyle({
            'background-color': getColor('background-color'),
          });
        });
      });

      describe('after scrolling page title above content top', () => {
        beforeEach(async () => {
          // Scroll page title above content top:
          const pageTitle: HTMLElement = ionContent.querySelector('.page-title');
          const andThenSome = 10;
          const verticalScrollAmount = pageTitle.offsetTop + pageTitle.offsetHeight + andThenSome;

          await ionContent.scrollToPoint(0, verticalScrollAmount, 0);
          await TestHelper.whenTrue(() => spectator.component.isContentScrolled);
        });

        it('should render toolbar divider', () => {
          expect(ionToolbar).toHaveComputedStyle(
            {
              'background-color': getColor('medium'),
            },
            ':before'
          );
        });

        it('should render shaded toolbar background', () => {
          const toolbarBackground = ionToolbar.shadowRoot.querySelector('.toolbar-background');
          expect(toolbarBackground).toHaveComputedStyle({
            'background-color': shadedBackgroundColor,
          });
        });
      });

      describe('after scrolling sticky content above content top', () => {
        beforeEach(async () => {
          // Scroll sticky content above content top:
          const andThenSome = 10;
          const verticalScrollAmount = stickyContentContainer.offsetTop + andThenSome;
          await ionContent.scrollToPoint(0, verticalScrollAmount, 0);
          await TestHelper.whenTrue(() => spectator.component.isContentScrolled);
          await TestHelper.whenTrue(() => spectator.component.isStickyContentPinned);
        });

        it('should render sticky content with correct background color', () => {
          expect(stickyContentContainer).toHaveComputedStyle(
            {
              'background-color': shadedBackgroundColor,
              height: `${stickyContentContainer.offsetHeight}px`,
              width: `${ionScrollElement.clientWidth}px`,
            },
            ':before'
          );
        });

        it('should render sticky content divider', () => {
          expect(stickyContentContainer).toHaveComputedStyle(
            {
              'background-color': getColor('medium'),
              content: '""',
              height: '1px',
              width: `${ionScrollElement.clientWidth}px`,
            },
            ':after'
          );
        });

        it('should not render toolbar divider', () => {
          expect(ionToolbar).toHaveComputedStyle(
            {
              'background-color': 'rgba(0, 0, 0, 0)',
            },
            ':before'
          );
        });

        it('should render shaded toolbar background', () => {
          const toolbarBackground = ionToolbar.shadowRoot.querySelector('.toolbar-background');
          expect(toolbarBackground).toHaveComputedStyle({
            'background-color': shadedBackgroundColor,
          });
        });
      });
    });

    describe('on desktop', () => {
      beforeAll(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.desktop);
      });

      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      describe('before scroll', () => {
        it('should render toolbar divider by default', () => {
          expect(ionToolbar).toHaveComputedStyle(
            {
              'background-color': getColor('medium'),
              content: '""',
              height: '1px',
              width: `${ionToolbar.offsetWidth}px`,
            },
            ':before'
          );
        });

        it('should render shaded toolbar background by default', () => {
          const toolbarBackground = ionToolbar.shadowRoot.querySelector('.toolbar-background');
          expect(toolbarBackground).toHaveComputedStyle({
            'background-color': shadedBackgroundColor,
          });
        });
      });

      describe('after scrolling sticky content above content top', () => {
        beforeEach(async () => {
          // Scroll sticky content above content top:
          const andThenSome = 10;
          const verticalScrollAmount = stickyContentContainer.offsetTop + andThenSome;
          await ionContent.scrollToPoint(0, verticalScrollAmount, 0);
          await TestHelper.whenTrue(() => spectator.component.isContentScrolled);
          await TestHelper.whenTrue(() => spectator.component.isStickyContentPinned);
        });

        it('should render sticky content with correct background color', () => {
          expect(stickyContentContainer).toHaveComputedStyle(
            {
              'background-color': shadedBackgroundColor,
              height: `${stickyContentContainer.offsetHeight}px`,
              width: `${ionScrollElement.clientWidth}px`,
            },
            ':before'
          );
        });

        it('should render sticky content divider', () => {
          expect(stickyContentContainer).toHaveComputedStyle(
            {
              'background-color': getColor('medium'),
              content: '""',
              height: '1px',
              width: `${ionScrollElement.clientWidth}px`,
            },
            ':after'
          );
        });

        it('should not render toolbar divider', () => {
          expect(ionToolbar).toHaveComputedStyle(
            {
              'background-color': 'rgba(0, 0, 0, 0)',
            },
            ':before'
          );
        });

        it('should render shaded toolbar background', () => {
          const toolbarBackground = ionToolbar.shadowRoot.querySelector('.toolbar-background');
          expect(toolbarBackground).toHaveComputedStyle({
            'background-color': shadedBackgroundColor,
          });
        });
      });
    });
  });
});
