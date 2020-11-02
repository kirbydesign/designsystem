import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockDirective } from 'ng-mocks';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';

import { DesignTokenHelper } from '../../helpers/design-token-helper';
import { TestHelper } from '../../testing/test-helper';
import { PageComponent, PageContentComponent } from './page.component';
import { FitHeadingDirective } from '../../directives/fit-heading/fit-heading.directive';
import { WindowRef } from '../../types/window-ref';

const size = DesignTokenHelper.size;
const fatFingerSize = DesignTokenHelper.fatFingerSize();

describe('PageComponent', () => {
  let spectator: SpectatorHost<PageComponent>;
  let element: HTMLElement;
  let ionToolbar: HTMLElement;

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
    ],
  });

  beforeEach(() => {
    spectator = createHost(
      `<kirby-page title="Test Page">
        <kirby-page-content>
          ${dummyContent}
        </kirby-page-content>
      </kirby-page>`
    );
    element = spectator.element as HTMLElement;
    ionToolbar = spectator.queryHost('ion-toolbar');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render toolbar with correct padding', async () => {
    await TestHelper.whenReady(ionToolbar);
    const toolbarContainer = ionToolbar.shadowRoot.querySelector('.toolbar-container');
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
      width: fatFingerSize,
      height: fatFingerSize,
    });
  });
});
