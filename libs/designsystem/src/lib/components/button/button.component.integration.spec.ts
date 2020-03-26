import { RouterTestingModule } from '@angular/router/testing';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { IonicModule, IonIcon } from '@ionic/angular';
import { MockComponent, MockComponents } from 'ng-mocks';

import { DesignTokenHelper } from '../../helpers/design-token-helper';
import { TestHelper } from '../../testing/test-helper';
import {
  PageComponent,
  PageContentComponent,
  PageActionsComponent,
  PageActionsDirective,
  PageTitleDirective,
  PageToolbarTitleDirective,
} from '../page/page.component';
import { FitHeadingDirective } from '../../directives/fit-heading/fit-heading.directive';
import { SizeDirective } from '../../directives/size/size.directive';
import { ButtonComponent } from './button.component';
import { IconComponent } from '../icon/icon.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CardComponent } from '../card/card.component';
import { ItemComponent } from '../item/item.component';

const getColor = DesignTokenHelper.getColor;
const size = DesignTokenHelper.size;
const fontSize = DesignTokenHelper.fontSize;

describe('ButtonComponent in Kirby Page', () => {
  let spectator: SpectatorHost<PageComponent>;
  const createHost = createHostFactory({
    component: PageComponent,
    imports: [IonicModule.forRoot(), RouterTestingModule],
    declarations: [
      ButtonComponent,
      PageContentComponent,
      PageActionsComponent,
      PageActionsDirective,
      PageTitleDirective,
      PageToolbarTitleDirective,
      FitHeadingDirective,
    ],
  });

  beforeEach(() => {
    spectator = createHost<PageComponent>(
      `<kirby-page>
        <ng-template kirbyPageTitle>
          <h1>Test Title</h1>
          <button kirby-button class="normal-button">Test</button>
        </ng-template>
        <ng-template kirbyPageToolbarTitle>
          Test Title
        </ng-template>
        <kirby-page-actions *kirbyPageActions>
          <button kirby-button>Test Action</button>
        </kirby-page-actions>
        <kirby-page-content>
          <p class="my-content">Custom Content...</kirby-page-content>
        </kirby-page>`
    );
  });

  it('should create page wrapper', () => {
    expect(spectator).toBeTruthy();
  });

  describe('inside Toolbar', () => {
    let ionToolbar: HTMLElement;
    let actionButtonInHeader: HTMLButtonElement;

    beforeEach(() => {
      ionToolbar = spectator.queryHost('ion-toolbar');
      actionButtonInHeader = spectator.queryHost(
        'ion-toolbar kirby-page-actions button[kirby-button]'
      );
    });

    it('should render action button', () => {
      expect(actionButtonInHeader).toBeTruthy();
    });

    it('should render without background-color', async () => {
      await TestHelper.whenHydrated(ionToolbar);
      expect(actionButtonInHeader).toHaveComputedStyle({ 'background-color': 'transparent' });
    });

    it('should render with correct color', async () => {
      await TestHelper.whenHydrated(ionToolbar);
      expect(actionButtonInHeader).toHaveComputedStyle({
        color: getColor('primary', 'contrast'),
      });
    });

    it('should render without border', async () => {
      await TestHelper.whenHydrated(ionToolbar);
      expect(actionButtonInHeader).toHaveComputedStyle({
        'border-width': '0px',
        'border-style': 'none',
      });
    });
  });

  describe('inside Page Actions', () => {
    let ionContent: HTMLElement;
    let actionButtonInPage: HTMLButtonElement;

    beforeEach(() => {
      ionContent = spectator.queryHost('ion-content');
      actionButtonInPage = spectator.queryHost(
        '.page-title kirby-page-actions button[kirby-button]'
      );
    });

    it('should render action button', () => {
      expect(actionButtonInPage).toBeTruthy();
    });

    it('should render with correct background-color', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(actionButtonInPage).toHaveComputedStyle({
        'background-color': getColor('white'),
      });
    });

    it('should render with correct color', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(actionButtonInPage).toHaveComputedStyle({
        color: getColor('white', 'contrast'),
      });
    });

    it('should render without border', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(actionButtonInPage).toHaveComputedStyle({
        'border-width': '0px',
        'border-style': 'none',
      });
    });
  });

  describe('inside Page Title', () => {
    let ionContent: HTMLElement;
    let normalButtonInPage: HTMLButtonElement;

    beforeEach(() => {
      ionContent = spectator.queryHost('ion-content');
      normalButtonInPage = spectator.queryHost('.page-title button[kirby-button].normal-button');
    });

    it('should render normal button', () => {
      expect(normalButtonInPage).toBeTruthy();
    });

    it('should render with correct background-color', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(normalButtonInPage).toHaveComputedStyle({
        'background-color': getColor('primary'),
      });
    });

    it('should render without border', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(normalButtonInPage).toHaveComputedStyle({
        'border-width': '0px',
        'border-style': 'none',
      });
    });

    it('should render with correct color', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(normalButtonInPage).toHaveComputedStyle({
        color: getColor('primary', 'contrast'),
      });
    });
  });
});

describe('ButtonComponent in kirby empty state', () => {
  let spectator: SpectatorHost<EmptyStateComponent>;
  let actionButtonInEmptyState: HTMLButtonElement;
  const createHost = createHostFactory({
    component: EmptyStateComponent,
    imports: [IonicModule.forRoot(), RouterTestingModule],
    declarations: [ButtonComponent, IconComponent],
  });

  beforeEach(() => {
    spectator = createHost<PageComponent>(
      `
      <kirby-empty-state
        title="No items"
        subtitle="You don't have any items. Call support to add some items to your account."
      >
        <button kirby-button>Call support</button>
      </kirby-empty-state>`
    );
    actionButtonInEmptyState = spectator.queryHost('.content button[kirby-button]');
  });

  it('should render with correct font-size', () => {
    expect(actionButtonInEmptyState).toHaveComputedStyle({
      'font-size': fontSize('n'),
    });
  });

  it('should render with correct height', () => {
    expect(actionButtonInEmptyState).toHaveComputedStyle({ height: size('xxl') });
  });

  it('should render with correct min-width', () => {
    expect(actionButtonInEmptyState).toHaveComputedStyle({ 'min-width': '220px' });
  });
});

describe('ButtonComponent in Kirby dropdown', () => {
  let spectator: SpectatorHost<DropdownComponent>;
  const createHost = createHostFactory({
    component: DropdownComponent,
    declarations: [ButtonComponent, MockComponents(CardComponent, ItemComponent, IconComponent)],
  });

  it('should render with space between text and icon', () => {
    spectator = createHost<DropdownComponent>(
      `<kirby-dropdown>
      </kirby-dropdown>`
    );
    let button = spectator.queryHost('button[kirby-button]');
    expect(button).toHaveComputedStyle({ 'justify-content': 'space-between' });
  });
});

describe('ButtonComponent with size directive', () => {
  let spectator: SpectatorHost<ButtonComponent>;
  let element: HTMLButtonElement;
  const createHost = createHostFactory({
    component: ButtonComponent,
    declarations: [SizeDirective, MockComponent(IconComponent)],
  });

  describe('when configured with size = SM', () => {
    beforeEach(() => {
      spectator = createHost('<button kirby-button size="sm"><span>Text Left</span></button>');
      element = spectator.element as HTMLButtonElement;
    });

    it('should render with correct font-size', () => {
      expect(element).toHaveComputedStyle({ 'font-size': fontSize('xs') });
    });

    it('should render with correct height', () => {
      expect(element).toHaveComputedStyle({ height: size('l') });
    });
  });

  describe('when configured with size = MD', () => {
    beforeEach(() => {
      spectator = createHost('<button kirby-button size="md"><span>Text Left</span></button>');
      element = spectator.element as HTMLButtonElement;
    });

    it('should render with correct font-size', () => {
      expect(element).toHaveComputedStyle({ 'font-size': fontSize('s') });
    });

    it('should render with correct height', () => {
      expect(element).toHaveComputedStyle({ height: size('xl') });
    });
  });

  describe('when configured with size = LG', () => {
    beforeEach(() => {
      spectator = createHost('<button kirby-button size="lg">Test</button>');
      element = spectator.element as HTMLButtonElement;
    });

    it('should render with correct font-size', () => {
      expect(element).toHaveComputedStyle({ 'font-size': fontSize('n') });
    });

    it('should render with correct height', () => {
      expect(element).toHaveComputedStyle({ height: size('xxl') });
    });

    it('should render with correct min-width', () => {
      expect(element).toHaveComputedStyle({ 'min-width': '220px' });
    });
  });
});

describe('ButtonComponent configured with icon only', () => {
  let spectator: SpectatorHost<ButtonComponent>;
  let element: HTMLButtonElement;
  const createHost = createHostFactory({
    component: ButtonComponent,
    declarations: [SizeDirective, MockComponent(IconComponent)],
  });

  const attentionLevels = ['1', '2', '3', '4'];
  type AttentionLevel = '1' | '2' | '3' | '4';

  const iconButtonSizeDefault = size('xl');

  it('should render with correct width and height', () => {
    spectator = createHost(
      `<button kirby-button>
        <kirby-icon name="edit">
      </kirby-icon></button>`
    );
    element = spectator.element as HTMLButtonElement;
    expect(element).toHaveComputedStyle({
      width: iconButtonSizeDefault,
      height: iconButtonSizeDefault,
    });
  });

  describe('and configured with attentionlevel', () => {
    beforeEach(() => {
      spectator = createHost(
        `<button kirby-button>
          <kirby-icon name="edit">
        </kirby-icon></button>`
      );
      element = spectator.element as HTMLButtonElement;
    });
    attentionLevels.forEach((attentionLevel: AttentionLevel) => {
      it(
        'should render with correct width and height for attentionlevel = ' + attentionLevel,
        () => {
          spectator.component.attentionLevel = attentionLevel;
          spectator.detectChanges();
          expect(element).toHaveComputedStyle({
            width: iconButtonSizeDefault,
            height: iconButtonSizeDefault,
          });
        }
      );
    });
  });

  describe('and size directive with size = SM', () => {
    const iconButtonSizeSM = size('l');
    beforeEach(() => {
      spectator = createHost(
        `<button kirby-button size="sm">
          <kirby-icon name="edit">
        </kirby-icon></button>`
      );
      element = spectator.element as HTMLButtonElement;
    });
    it('should render with correct width and height', () => {
      expect(element).toHaveComputedStyle({ width: iconButtonSizeSM, height: iconButtonSizeSM });
    });

    describe('and configured with attentionlevel', () => {
      attentionLevels.forEach((attentionLevel: AttentionLevel) => {
        it(
          'should render with correct width and height for attentionlevel = ' + attentionLevel,
          () => {
            spectator.component.attentionLevel = attentionLevel;
            spectator.detectChanges();
            expect(element).toHaveComputedStyle({
              width: iconButtonSizeSM,
              height: iconButtonSizeSM,
            });
          }
        );
      });
    });
  });

  describe('and size directive with size = MD', () => {
    const iconButtonSizeMD = size('xl');
    beforeEach(() => {
      spectator = createHost(
        `<button kirby-button size="md">
          <kirby-icon name="edit">
        </kirby-icon></button>`
      );
      element = spectator.element as HTMLButtonElement;
    });
    it('should render with correct width and height', () => {
      expect(element).toHaveComputedStyle({ width: iconButtonSizeMD, height: iconButtonSizeMD });
    });

    describe('and configured with attentionlevel', () => {
      attentionLevels.forEach((attentionLevel: AttentionLevel) => {
        it(
          'should render with correct width and height for attentionlevel = ' + attentionLevel,
          () => {
            spectator.component.attentionLevel = attentionLevel;
            spectator.detectChanges();
            expect(element).toHaveComputedStyle({
              width: iconButtonSizeMD,
              height: iconButtonSizeMD,
            });
          }
        );
      });
    });
  });

  describe('and size directive with size = LG', () => {
    const iconButtonSizeLG = size('xxl');
    beforeEach(() => {
      spectator = createHost(
        `<button kirby-button size="lg">
          <kirby-icon name="edit">
        </kirby-icon></button>`
      );
      element = spectator.element as HTMLButtonElement;
    });
    it('should render with correct width and height', () => {
      expect(element).toHaveComputedStyle({ width: iconButtonSizeLG, height: iconButtonSizeLG });
    });

    describe('and configured with attentionlevel', () => {
      attentionLevels.forEach((attentionLevel: AttentionLevel) => {
        it(
          'should render with correct width and height for attentionlevel = ' + attentionLevel,
          () => {
            spectator.component.attentionLevel = attentionLevel;
            spectator.detectChanges();
            expect(element).toHaveComputedStyle({
              width: iconButtonSizeLG,
              height: iconButtonSizeLG,
            });
          }
        );
      });
    });
  });
});

describe('ButtonComponent configured with text and icon', () => {
  let kirbyIcon: Element;
  let spectator: SpectatorHost<ButtonComponent>;
  let element: HTMLButtonElement;
  const createHost = createHostFactory({
    component: ButtonComponent,
    declarations: [SizeDirective, IconComponent, MockComponent(IonIcon)],
  });

  it('should render with correct icon font-size', () => {
    spectator = createHost(
      `<button kirby-button>
        <span>Text</span>
        <kirby-icon name="arrow-down"></kirby-icon>
      </button>`
    );

    element = spectator.element as HTMLButtonElement;
    kirbyIcon = element.getElementsByTagName('kirby-icon')[0];

    expect(kirbyIcon).toHaveComputedStyle({ 'font-size': size('m') });
  });

  describe('when icon left', () => {
    beforeEach(() => {
      spectator = createHost(
        `<button kirby-button>
          <kirby-icon name="arrow-down"></kirby-icon>
          <span>Icon Left, Text Right</span>
        </button>`
      );

      element = spectator.element as HTMLButtonElement;
      kirbyIcon = element.getElementsByTagName('kirby-icon')[0];
    });

    it('should render with correct padding', () => {
      expect(element).toHaveComputedStyle({
        'padding-left': size('xs'),
        'padding-right': size('s'),
      });
    });

    it('should render with correct icon margin', () => {
      expect(kirbyIcon).toHaveComputedStyle({
        'margin-left': '0px',
        'margin-right': size('xxs'),
      });
    });
  });

  describe('when icon right', () => {
    beforeEach(() => {
      spectator = createHost(
        `<button kirby-button>
          <span>Text Left, Icon Right</span>
          <kirby-icon name="arrow-down"></kirby-icon>
        </button>`
      );

      element = spectator.element as HTMLButtonElement;
      kirbyIcon = element.getElementsByTagName('kirby-icon')[0];
    });

    it('should render with correct padding', () => {
      expect(element).toHaveComputedStyle({
        'padding-left': size('s'),
        'padding-right': size('xs'),
      });
    });
    it('should render with correct icon margin', () => {
      expect(kirbyIcon).toHaveComputedStyle({
        'margin-left': size('xxs'),
        'margin-right': '0px',
      });
    });
  });

  describe('and size directive with size = SM', () => {
    it('should render with correct icon font-size', () => {
      spectator = createHost(
        `<button kirby-button size="sm">
          <span>Text</span>
          <kirby-icon name="arrow-down"></kirby-icon>
        </button>`
      );

      element = spectator.element as HTMLButtonElement;
      kirbyIcon = element.getElementsByTagName('kirby-icon')[0];

      expect(kirbyIcon).toHaveComputedStyle({ 'font-size': size('s') });
    });
  });

  describe('and size directive with size = MD', () => {
    it('should render with correct icon font-size', () => {
      spectator = createHost(
        `<button kirby-button size="md">
          <span>Text</span>
          <kirby-icon name="arrow-down"></kirby-icon>
        </button>`
      );

      element = spectator.element as HTMLButtonElement;
      kirbyIcon = element.getElementsByTagName('kirby-icon')[0];

      expect(kirbyIcon).toHaveComputedStyle({ 'font-size': size('m') });
    });
  });

  describe('and size directive with size = LG', () => {
    it('should render with correct icon font-size', () => {
      spectator = createHost(
        `<button kirby-button size="lg">
          <span>Text</span>
          <kirby-icon name="arrow-down"></kirby-icon>
        </button>`
      );

      element = spectator.element as HTMLButtonElement;
      kirbyIcon = element.getElementsByTagName('kirby-icon')[0];

      expect(kirbyIcon).toHaveComputedStyle({ 'font-size': size('m') });
    });
  });
});
