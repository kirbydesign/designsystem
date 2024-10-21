import { RouterTestingModule } from '@angular/router/testing';
import { IonIcon } from '@ionic/angular/standalone';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent, MockComponents } from 'ng-mocks';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';
import { EmptyStateComponent } from '@kirbydesign/designsystem/empty-state';

import {
  PageActionsDirective,
  PageComponent,
  PageModule,
  PageTitleDirective,
} from '@kirbydesign/designsystem/page';
import { FitHeadingDirective } from '@kirbydesign/designsystem/shared';

import { ButtonComponent } from './button.component';

const getColor = DesignTokenHelper.getColor;
const size = DesignTokenHelper.size;
const fontSize = DesignTokenHelper.fontSize;

describe('ButtonComponent in Kirby Page', () => {
  let spectator: SpectatorHost<PageComponent>;
  const createHost = createHostFactory({
    component: PageComponent,
    imports: [
      TestHelper.ionicModuleForTest,
      RouterTestingModule,
      ButtonComponent,
      FitHeadingDirective,
      PageModule,
    ],
    declarations: [PageActionsDirective, PageTitleDirective],
    providers: [
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
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
          <button kirby-button class="text">Test Static Action</button>
          <button kirby-button class="icon-only">Static Icon</button>
        </kirby-page-actions>
        <kirby-page-actions *kirbyPageActions="{static: false}">
          <button kirby-button class="text">Test Non-Static Action</button>
          <button kirby-button class="icon-only">Non-Static  Icon</button>
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
    let actionButtonInHeaderIconOnly: HTMLButtonElement;

    beforeEach(() => {
      ionToolbar = spectator.queryHost('ion-toolbar');
      actionButtonInHeader = spectator.queryHost(
        'ion-toolbar kirby-page-actions button[kirby-button].text'
      );
      actionButtonInHeaderIconOnly = spectator.queryHost(
        'ion-toolbar kirby-page-actions button[kirby-button].icon-only'
      );
    });

    it('should render action button', () => {
      expect(actionButtonInHeader).toBeTruthy();
    });

    it('should render with the correct background-color', async () => {
      await TestHelper.whenReady(ionToolbar);
      expect(actionButtonInHeader).toHaveComputedStyle({ 'background-color': getColor('primary') });
      expect(actionButtonInHeaderIconOnly).toHaveComputedStyle({
        'background-color': getColor('white'),
      });
    });

    it('should render with correct color', async () => {
      await TestHelper.whenReady(ionToolbar);
      expect(actionButtonInHeader).toHaveComputedStyle({
        color: getColor('black'),
      });
    });

    it('should render with correct size', () => {
      expect(actionButtonInHeader).toHaveComputedStyle({
        width: 'auto',
        height: size('xl'),
      });
      expect(actionButtonInHeaderIconOnly).toHaveComputedStyle({
        width: size('xl'),
        height: size('xl'),
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
      await TestHelper.whenReady(ionContent);
      expect(actionButtonInPage).toHaveComputedStyle({
        'background-color': getColor('white'),
      });
    });

    it('should render with correct color', async () => {
      await TestHelper.whenReady(ionContent);
      expect(actionButtonInPage).toHaveComputedStyle({
        color: getColor('white', 'contrast'),
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
      await TestHelper.whenReady(ionContent);
      expect(normalButtonInPage).toHaveComputedStyle({
        'background-color': getColor('primary'),
      });
    });

    it('should render with correct color', async () => {
      await TestHelper.whenReady(ionContent);
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
    imports: [TestHelper.ionicModuleForTest, RouterTestingModule, ButtonComponent],
    declarations: [IconComponent],
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

  // FIXME: Refactor typography test
  xit('should render with correct font-size', () => {
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
    const button = spectator.queryHost('button[kirby-button]');
    expect(button).toHaveComputedStyle({ 'justify-content': 'space-between' });
  });
});

describe('ButtonComponent configured with icon only', () => {
  let spectator: SpectatorHost<ButtonComponent>;
  let element: HTMLButtonElement;
  const createHost = createHostFactory({
    component: ButtonComponent,
    declarations: [MockComponent(IconComponent)],
  });

  type AttentionLevel = '1' | '2' | '3';
  const attentionLevels: AttentionLevel[] = ['1', '2', '3'];

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
        `<button kirby-button >
          <kirby-icon name="edit">
        </kirby-icon></button>`
      );
      element = spectator.element as HTMLButtonElement;
    });
    attentionLevels.forEach((attentionLevel) => {
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

  describe('and initialized with size = SM', () => {
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
      attentionLevels.forEach((attentionLevel) => {
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

  describe('and initialized with size = MD', () => {
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
      attentionLevels.forEach((attentionLevel) => {
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

  describe('and initialized with size = LG', () => {
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
      attentionLevels.forEach((attentionLevel) => {
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

    describe('and configured with noDecoration', () => {
      it('should render with correct width and height for noDecoration', () => {
        spectator.component.noDecoration = true;
        spectator.detectChanges();
        expect(element).toHaveComputedStyle({
          width: iconButtonSizeLG,
          height: iconButtonSizeLG,
        });
      });
    });
  });
});

describe('ButtonComponent configured with text and icon', () => {
  let spectator: SpectatorHost<ButtonComponent>;
  let element: HTMLButtonElement;
  let kirbyIcon: Element;
  let content: Element;
  const createHost = createHostFactory({
    component: ButtonComponent,
    declarations: [IconComponent, MockComponent(IonIcon)],
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
      content = element.querySelector('span.content-layer');
      kirbyIcon = element.querySelector('kirby-icon');
    });

    it('should render with correct padding', () => {
      expect(element).toHaveComputedStyle({ padding: '0px' });
      expect(content).toHaveComputedStyle({
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
      content = element.querySelector('span.content-layer');
      kirbyIcon = element.querySelector('kirby-icon');
    });

    it('should render with correct padding', () => {
      expect(element).toHaveComputedStyle({ padding: '0px' });
      expect(content).toHaveComputedStyle({
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

  describe('and initialized with size = SM', () => {
    beforeEach(() => {
      spectator = createHost(
        `<button kirby-button size="sm">
          <span>Text</span>
          <kirby-icon name="arrow-down"></kirby-icon>
        </button>`
      );

      element = spectator.element as HTMLButtonElement;
      kirbyIcon = element.getElementsByTagName('kirby-icon')[0];
    });

    it('should render with correct icon font-size', () => {
      expect(kirbyIcon).toHaveComputedStyle({ 'font-size': size('s') });
    });

    it('should render with correct min-width', () => {
      expect(element).toHaveComputedStyle({ 'min-width': '88px' });
    });
  });

  describe('and initialized with size = MD', () => {
    beforeEach(() => {
      spectator = createHost(
        `<button kirby-button size="md">
          <span>Text</span>
          <kirby-icon name="arrow-down"></kirby-icon>
        </button>`
      );

      element = spectator.element as HTMLButtonElement;
      kirbyIcon = element.getElementsByTagName('kirby-icon')[0];
    });

    it('should render with correct icon font-size', () => {
      expect(kirbyIcon).toHaveComputedStyle({ 'font-size': size('m') });
    });

    it('should render with correct min-width', () => {
      expect(element).toHaveComputedStyle({ 'min-width': '88px' });
    });
  });

  describe('and initialized with size = LG', () => {
    beforeEach(() => {
      spectator = createHost(
        `<button kirby-button size="lg">
          <span>Text</span>
          <kirby-icon name="arrow-down"></kirby-icon>
        </button>`
      );

      element = spectator.element as HTMLButtonElement;
      kirbyIcon = element.getElementsByTagName('kirby-icon')[0];
    });

    it('should render with correct icon font-size', () => {
      expect(kirbyIcon).toHaveComputedStyle({ 'font-size': size('m') });
    });

    it('should render with correct min-width', () => {
      expect(element).toHaveComputedStyle({ 'min-width': '220px' });
    });
  });
});

describe('ButtonComponent configured with text and icon using an ngIf directive', () => {
  let spectator: SpectatorHost<ButtonComponent>;
  let element: HTMLButtonElement;

  const createHost = createHostFactory({
    component: ButtonComponent,
    declarations: [MockComponent(IconComponent)],
  });

  it('should not have the icon-only class, if kirby-icon is inserted before text', () => {
    spectator = createHost(
      '<button kirby-button><kirby-icon name="close" *ngIf="true"></kirby-icon>Test</button>'
    );
    element = spectator.element as HTMLButtonElement;

    expect(element).not.toHaveClass('icon-only');
  });

  it('should not have the icon-only class, if kirby-icon is inserted after text', () => {
    spectator = createHost(
      '<button kirby-button>Test<kirby-icon name="close" *ngIf="true"></kirby-icon></button>'
    );
    element = spectator.element as HTMLButtonElement;

    expect(element).not.toHaveClass('icon-only');
  });
});
