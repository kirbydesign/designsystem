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

import { RouterOutletComponent, RouterOutletModule } from '@kirbydesign/designsystem/router-outlet';
import { provideKirby } from '@kirbydesign/designsystem/kirby-ionic-module';
import { Component } from '@angular/core';
import { PageModule } from '@kirbydesign/designsystem/page';
import { PageComponent } from '../../page/src/page.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'first-page',
  template: `
    <kirby-page [title]="'First Page'">
      <kirby-page-content>
        <p>Test content inside Kirby Page</p>
        <a [routerLink]="'./second-page'">Second Page Link</a>
      </kirby-page-content>
    </kirby-page>
  `,
  imports: [PageModule, RouterLink],
})
class FirstPageComponent {}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'second-page',
  template: `
    <kirby-page [title]="'Second Page'">
      <kirby-page-content>Content</kirby-page-content>
    </kirby-page>
  `,
  imports: [PageModule, RouterLink],
})
class SecondPageComponent {}

describe('RouterOutlet with focusManager + setHtmlDocTitle', () => {
  let spectator: SpectatorHost<RouterOutletComponent>;
  let router: SpyObject<Router>;

  const pageUrl = '';
  const secondPageUrl = 'second-page';
  const routes: Routes = [
    {
      path: pageUrl,
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
      RouterOutletModule,
    ],
    providers: [provideKirby({ focusManager: true, setHtmlDocTitle: true }), provideRouter(routes)],
  });

  beforeEach(async () => {
    spectator = createHost(`<div style="position: relative; height: 200px;">
        <kirby-router-outlet></kirby-router-outlet>
      </div>`);

    router = spectator.inject(Router);
  });

  it('should focus the h1 element after navigation', async () => {
    router.navigate(['']);
    await spectator.fixture.whenStable();

    const h1 = spectator.query('h1');

    expect(h1).toBeTruthy();
    expect(h1).toBe(document.activeElement);
  });
});
