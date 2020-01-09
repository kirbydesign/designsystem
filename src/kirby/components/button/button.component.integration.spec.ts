/// <reference path="../../testing/element-css-custom-matchers.d.ts"/>

import { RouterTestingModule } from '@angular/router/testing';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';
import { MockComponent } from 'ng-mocks';

import { DesignTokenHelper } from '../../helpers/design-token-helper';
import { TestHelper } from '../../testing/test-helper';
import { ElementCssCustomMatchers } from '../../testing/element-css-custom-matchers';
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

const getColor = DesignTokenHelper.getColor;
const size = DesignTokenHelper.size;

fdescribe('ButtonComponent in Kirby Page', () => {
  let spectator: SpectatorHost<PageComponent>;
  const createHost = createHostFactory({
    component: PageComponent,
    imports: [IonicModule.forRoot(), RouterTestingModule],
    declarations: [
      ButtonComponent,
      PageComponent,
      PageContentComponent,
      PageActionsComponent,
      PageActionsDirective,
      PageTitleDirective,
      PageToolbarTitleDirective,
      FitHeadingDirective,
    ],
  });

  beforeEach(() => {
    jasmine.addMatchers(ElementCssCustomMatchers);
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

    it('should render with no background-color', async () => {
      await TestHelper.whenHydrated(ionToolbar);
      expect(actionButtonInHeader).toHaveStyle({ 'background-color': 'transparent' });
    });

    it('should render with no border-color', async () => {
      await TestHelper.whenHydrated(ionToolbar);
      expect(actionButtonInHeader).toHaveStyle({ 'border-color': 'transparent' });
    });

    it('should render with correct color', async () => {
      await TestHelper.whenHydrated(ionToolbar);
      expect(actionButtonInHeader).toHaveThemeColorStyle({
        color: getColor('primary', 'contrast'),
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
      expect(actionButtonInPage).toHaveThemeColorStyle({
        'background-color': getColor('white'),
      });
    });

    it('should render with correct border-color', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(actionButtonInPage).toHaveThemeColorStyle({
        'border-color': getColor('white'),
      });
    });

    it('should render with correct color', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(actionButtonInPage).toHaveThemeColorStyle({
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
      await TestHelper.whenHydrated(ionContent);
      expect(normalButtonInPage).toHaveThemeColorStyle({
        'background-color': getColor('primary'),
      });
    });

    it('should render with correct border-color', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(normalButtonInPage).toHaveThemeColorStyle({
        'border-color': getColor('primary'),
      });
    });

    it('should render with correct color', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(normalButtonInPage).toHaveThemeColorStyle({
        color: getColor('primary', 'contrast'),
      });
    });
  });
});

describe('ButtonComponent with size directive', () => {
  let spectator: SpectatorHost<ButtonComponent>;
  let element: HTMLButtonElement;
  const createHost = createHostFactory({
    component: ButtonComponent,
    declarations: [ButtonComponent, SizeDirective, MockComponent(IconComponent)],
  });

  beforeEach(() => {
    jasmine.addMatchers(ElementCssCustomMatchers);
  });

  describe('when configured with size = SM', () => {
    beforeEach(() => {
      spectator = createHost('<button kirby-button size="sm">Test</button>');
      element = spectator.element as HTMLButtonElement;
    });

    it('should render with correct font-size', () => {
      const expected = DesignTokenHelper.fontSize('xs', true);
      expect(element).toHaveStyle({ 'font-size': expected });
    });

    it('should render with correct height', () => {
      const expected = DesignTokenHelper.size('l', true);
      expect(element).toHaveStyle({ height: expected });
    });
  });

  describe('when configured with size = LG', () => {
    beforeEach(() => {
      spectator = createHost('<button kirby-button size="lg">Test</button>');
      element = spectator.element as HTMLButtonElement;
    });

    it('should render with correct font-size', () => {
      const expected = DesignTokenHelper.fontSize('n', true);
      expect(element).toHaveStyle({ 'font-size': expected });
    });

    it('should render with correct height', () => {
      expect(element).toHaveStyle({ height: size('xxl') });
    });

    it('should render with correct min-width', () => {
      expect(element).toHaveStyle({ 'min-width': '220px' });
    });
  });
});

describe('ButtonComponent configured with icon only', () => {
  let spectator: SpectatorHost<ButtonComponent>;
  let element: HTMLButtonElement;
  const createHost = createHostFactory({
    component: ButtonComponent,
    declarations: [ButtonComponent, SizeDirective, MockComponent(IconComponent)],
  });

  beforeEach(() => {
    jasmine.addMatchers(ElementCssCustomMatchers);
  });

  it('should render with correct width', () => {
    spectator = createHost(
      `<button kirby-button>
        <kirby-icon name="edit">
      </kirby-icon></button>`
    );
    element = spectator.element as HTMLButtonElement;
    expect(element).toHaveStyle({ width: size('xl') });
  });

  describe('and size directive with size = SM', () => {
    it('should render with correct width', () => {
      spectator = createHost(
        `<button kirby-button size="sm">
          <kirby-icon name="edit">
        </kirby-icon></button>`
      );
      element = spectator.element as HTMLButtonElement;
      expect(element).toHaveStyle({ width: size('l') });
    });
  });

  describe('and size directive with size = LG', () => {
    it('should render with correct width', () => {
      spectator = createHost(
        `<button kirby-button size="lg">
          <kirby-icon name="edit">
        </kirby-icon></button>`
      );
      element = spectator.element as HTMLButtonElement;
      expect(element).toHaveStyle({ width: size('xxl') });
    });
  });
});
