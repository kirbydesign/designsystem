import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockDirective } from 'ng-mocks';
import {
  createHostFactory,
  createSpyObject,
  mockProvider,
  SpectatorHost,
  SpyObject,
} from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';
import { ReplaySubject } from 'rxjs';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';

import { DesignTokenHelper } from '../../helpers/design-token-helper';
import { TestHelper } from '../../testing/test-helper';
import { PageComponent, PageContentComponent } from './page.component';
import { FitHeadingDirective } from '../../directives/fit-heading/fit-heading.directive';
import { WindowRef } from '../../types/window-ref';
import { TabsComponent } from '../tabs';
import { ModalNavigationService } from '../modal/services/modal-navigation.service';

const size = DesignTokenHelper.size;
const fatFingerSize = DesignTokenHelper.fatFingerSize();

describe('PageComponent', () => {
  let spectator: SpectatorHost<PageComponent>;
  let element: HTMLElement;
  let ionToolbar: HTMLElement;
  let tabbar: SpyObject<TabsComponent>;
  let eventSubject = new ReplaySubject<RouterEvent>(1);
  let router: SpyObject<Router> = {
    ...createSpyObject(Router),
    url: '123',
    events: eventSubject.asObservable(),
  } as SpyObject<Router>;
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

  const createHost = createHostFactory({
    component: PageComponent,
    declarations: [PageContentComponent, MockDirective(FitHeadingDirective)],
    imports: [IonicModule.forRoot({ mode: 'ios' }), NoopAnimationsModule, RouterTestingModule],
    providers: [
      {
        provide: WindowRef,
        useValue: window,
      },
      mockProvider(TabsComponent),
      mockProvider(ModalNavigationService),
      {
        provide: Router,
        useValue: router,
      },
    ],
  });

  beforeEach(() => {
    spectator = createHost(
      `<kirby-page title="Test Page">
        <kirby-page-content>
          ${dummyContent}
        </kirby-page-content>
      </kirby-page>`,
      { detectChanges: false }
    );
    element = spectator.element as HTMLElement;
    ionToolbar = spectator.queryHost('ion-toolbar');
    tabbar = spectator.inject(TabsComponent);
    modalNavigationService = spectator.inject(ModalNavigationService);
    modalNavigationService.isModalRoute.and.returnValue(false);
  });

  it('should render toolbar with correct padding', async () => {
    spectator.detectChanges();
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
    spectator.detectChanges();
    await TestHelper.whenReady(ionToolbar);
    const ionBackButton = spectator.queryHost('ion-toolbar ion-buttons ion-back-button');
    expect(ionBackButton).toHaveComputedStyle({
      width: fatFingerSize,
      height: fatFingerSize,
    });
  });

  it('should hide tab bar when hideTabs is true on enter', () => {
    spectator.component.hideTabs = true;
    spectator.detectChanges();
    eventSubject.next(new NavigationEnd(1, '123', '123'));

    expect(tabbar.hide).toHaveBeenCalled();
  });
  it('should show tab bar when hideTabs is true on leave', () => {
    spectator.component.hideTabs = true;
    spectator.detectChanges();
    eventSubject.next(new NavigationStart(1, '123'));
    spectator.component.ngAfterContentChecked();
    eventSubject.next(new NavigationEnd(1, '123', '123'));
    spectator.component.ngAfterContentChecked();
    eventSubject.next(new NavigationStart(1, '234'));
    spectator.component.ngAfterContentChecked();

    expect(tabbar.show).toHaveBeenCalled();
  });
});
