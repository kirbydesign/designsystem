/// <reference path="../../testing/element-css-custom-matchers.d.ts"/>

import { RouterTestingModule } from '@angular/router/testing';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';

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
import { ButtonComponent } from './button.component';

describe('ButtonComponent in Kirby Page', () => {
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
      expect(actionButtonInHeader).toHaveBackgroundColor('transparent');
    });

    it('should render with no border-color', async () => {
      await TestHelper.whenHydrated(ionToolbar);
      expect(actionButtonInHeader).toHaveBorderColor('transparent');
    });

    it('should render with correct color', async () => {
      await TestHelper.whenHydrated(ionToolbar);
      expect(actionButtonInHeader).toHaveThemeColor('primary', 'contrast');
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
      expect(actionButtonInPage).toHaveThemeBackgroundColor('white');
    });

    it('should render with correct border-color', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(actionButtonInPage).toHaveThemeBorderColor('white');
    });

    it('should render with correct color', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(actionButtonInPage).toHaveThemeColor('white', 'contrast');
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
      expect(normalButtonInPage).toHaveThemeBackgroundColor('primary');
    });

    it('should render with correct border-color', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(normalButtonInPage).toHaveThemeBorderColor('primary');
    });

    it('should render with correct color', async () => {
      await TestHelper.whenHydrated(ionContent);
      expect(normalButtonInPage).toHaveThemeColor('primary', 'contrast');
    });
  });
});
