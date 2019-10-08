import { Component, OnInit } from '@angular/core';

import { ShowcaseProperty } from '../../shared/showcase-properties/showcase-property';

@Component({
  selector: 'kirby-tabs-showcase',
  templateUrl: './tabs-showcase.component.html',
  styleUrls: ['./tabs-showcase.component.scss'],
})
export class TabsShowcaseComponent implements OnInit {
  exampleHtml: string = `<kirby-tab-bar>
    <kirby-tab-button routerLink="">
        <kirby-icon name="person-outline"></kirby-icon>
        Dashboard
    </kirby-tab-button>

    <kirby-tab-button routerLink="">
        <kirby-icon name="accounts-outline"></kirby-icon>
        Account
    </kirby-tab-button>

    <kirby-tab-button routerLink="">
        <kirby-icon name="inbox"></kirby-icon>
        Inbox
        <kirby-badge themeColor="danger">1</kirby-badge>
    </kirby-tab-button>

    <kirby-tab-button (click)="openMenu()">
        <kirby-icon name="menu-outline"></kirby-icon>
        Menu
    </kirby-tab-button>
</kirby-tab-bar>`;

  exampleRouterHtml = `<kirby-tab-bar>
    <kirby-tab-button routerLink="dashboard">
        <kirby-icon name="person-outline"></kirby-icon>
        Dashboard
    </kirby-tab-button>
</kirby-tab-bar>`;

  exampleRouterConfig = `import { Routes } from '@angular/router';
import { TabsPage } from './tabs-page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: '../dashboard/dashboard.module#DashboardModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];`;

  properties: ShowcaseProperty[] = [
    {
      name: 'routerLink',
      description: `Should be a reference to the route path. Path needs to be a child of your "tabs" path otherwise use manually navigation using click event.`,
      defaultValue: '',
      inputValues: ['string'],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
