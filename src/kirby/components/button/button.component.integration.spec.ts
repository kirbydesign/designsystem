import { RouterTestingModule } from '@angular/router/testing';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';

import {
  PageComponent,
  PageContentComponent,
  PageActionsComponent,
  PageActionsDirective,
  PageTitleDirective,
  PageToolbarTitleDirective,
} from '../page/page.component';
import { FitHeadingDirective } from '../../directives/fit-heading/fit-heading.directive';
import { ButtonComponent } from './button.component';
import { ColorHelper } from '../../helpers/color-helper';
import { TestHelper } from '../../testing/test-helper';

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

    it('should render with correct background-color', async () => {
      await TestHelper.whenHydrated(ionToolbar);
      const expectedBgColor = ColorHelper.getTransparentColorRgbString();
      const actualBgColor = TestHelper.getCssProperty(actionButtonInHeader, 'background-color');
      expect(actualBgColor).toEqual(expectedBgColor);
    });

    it('should render with correct color', async () => {
      await TestHelper.whenHydrated(ionToolbar);
      const expectedColor = ColorHelper.getThemeColorRgbString('primary-contrast');
      const actualColor = TestHelper.getCssProperty(actionButtonInHeader, 'color');
      expect(actualColor).toEqual(expectedColor);
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
      const expectedBgColor = ColorHelper.getThemeColorRgbString('white');
      const actualBgColor = TestHelper.getCssProperty(actionButtonInPage, 'background-color');
      expect(actualBgColor).toEqual(expectedBgColor);
    });

    it('should render with correct color', async () => {
      await TestHelper.whenHydrated(ionContent);
      const expectedColor = ColorHelper.getThemeColorRgbString('white-contrast');
      const actualColor = TestHelper.getCssProperty(actionButtonInPage, 'color');
      expect(actualColor).toEqual(expectedColor);
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
      const expectedBgColor = ColorHelper.getThemeColorRgbString('primary');
      const actualBgColor = TestHelper.getCssProperty(normalButtonInPage, 'background-color');
      expect(actualBgColor).toEqual(expectedBgColor);
    });

    it('should render with correct color', async () => {
      await TestHelper.whenHydrated(ionContent);
      const expectedColor = ColorHelper.getThemeColorRgbString('primary-contrast');
      const actualColor = TestHelper.getCssProperty(normalButtonInPage, 'color');
      expect(actualColor).toEqual(expectedColor);
    });
  });
});
