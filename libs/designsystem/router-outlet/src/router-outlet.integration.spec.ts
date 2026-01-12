import { provideRouter, Router, RouterLink, Routes } from '@angular/router';
import {
  IonApp,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { createHostFactory, SpectatorHost, SpyObject } from '@ngneat/spectator';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { IonRouterOutlet } from '@kirbydesign/designsystem/tabs';

import { FitHeadingDirective } from '@kirbydesign/designsystem/shared';

import { RouterOutletComponent } from '@kirbydesign/designsystem/router-outlet';
import { provideKirby, withGlobalSetup } from '@kirbydesign/designsystem/config';
import { Component } from '@angular/core';
import { PageComponent, PageContentComponent } from '@kirbydesign/designsystem/page';

const firstPageTitle = 'First Page';
const secondPageTitle = 'Second Page';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'first-page',
  template: `
    <kirby-page [title]="'${firstPageTitle}'">
      <kirby-page-content>
        <p>Test content inside Kirby Page</p>
        <a [routerLink]="'./second-page'">Second Page Link</a>
      </kirby-page-content>
    </kirby-page>
  `,
  imports: [PageComponent, PageContentComponent, RouterLink],
})
class FirstPageComponent {}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'second-page',
  template: `
    <kirby-page [title]="'${secondPageTitle}'">
      <kirby-page-content>Content</kirby-page-content>
    </kirby-page>
  `,
  imports: [PageComponent, PageContentComponent, RouterLink],
})
class SecondPageComponent {}

describe('RouterOutlet when config provided for focusManager + setHtmlDocTitle', () => {
  let spectator: SpectatorHost<RouterOutletComponent>;
  let router: SpyObject<Router>;

  const firstPageUrl = '';
  const secondPageUrl = 'second-page';
  const routes: Routes = [
    {
      path: firstPageUrl,
      component: FirstPageComponent,
    },
    {
      path: secondPageUrl,
      component: SecondPageComponent,
    },
  ];

  const createHost = createHostFactory({
    component: RouterOutletComponent,
    imports: [
      TestHelper.ionicModuleForTest,
      FitHeadingDirective,
      IonApp,
      IonBackButton,
      IonButtons,
      IonContent,
      IonHeader,
      IonTitle,
      IonToolbar,
      IonRouterOutlet,
      RouterOutletComponent,
    ],
    providers: [
      provideKirby(withGlobalSetup({ focusManager: true, setHtmlDocTitle: true })),
      provideRouter(routes),
    ],
  });

  beforeEach(() => {
    spectator = createHost(`<div style="position: relative; height: 200px;">
        <kirby-router-outlet></kirby-router-outlet>
      </div>`);

    router = spectator.inject(Router);
  });

  it('should focus the h1 element after navigation', async () => {
    // Go to first page
    await router.navigateByUrl(firstPageUrl);
    await spectator.fixture.whenStable();

    await TestHelper.whenTrue(() => document.activeElement !== document.body); // Wait for focus to be set by Ionic

    const firstPageH1 = spectator.query('first-page h1');

    expect(document.activeElement.tagName).toBe(firstPageH1.tagName);
    expect(document.activeElement.textContent).toBe(firstPageH1.textContent);

    // Navigate to second page via link
    spectator.click('a');
    await spectator.fixture.whenStable();
    await TestHelper.whenTrue(() => document.activeElement !== document.body); // Wait for focus to be set by Ionic

    const secondPageH1 = spectator.query('second-page h1');

    expect(document.activeElement.tagName).toBe(firstPageH1.tagName);
    expect(document.activeElement.textContent).toBe(secondPageH1.textContent);
  });

  it('should update the HTML document title to match page title after navigation', async () => {
    // Go to first page
    await router.navigateByUrl('');
    await spectator.fixture.whenStable();

    expect(document.title).toBe(firstPageTitle);

    // Navigate to second page via link
    spectator.click('a');
    await spectator.fixture.whenStable();
    await TestHelper.whenTrue(() => document.title !== firstPageTitle);

    expect(document.title).toBe(secondPageTitle);
  });
});
