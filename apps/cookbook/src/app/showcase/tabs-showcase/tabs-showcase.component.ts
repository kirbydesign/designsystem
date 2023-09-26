import { Component } from '@angular/core';
import exampleHtml from '../../examples/tabs-example/tabs-example.component.html?raw';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-tabs-showcase',
  templateUrl: './tabs-showcase.component.html',
  styleUrls: ['./tabs-showcase.component.scss'],
})
export class TabsShowcaseComponent {
  exampleHtml = exampleHtml;

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

  exampleTabsService = `
  import { TabsService } from '@kirbydesign/designsystem';
  ...
  constructor(private tabsSerivce: TabsService) {}
  
  ngOnInit() {
    this.tabsService.subscribe((outlet) => {
      console.log(outlet.canGoBack());
    });
  }
  ...
`;

  properties: ApiDescriptionProperty[] = [
    {
      name: 'routerLink',
      description: `Deprecated: use 'tab' instead. Should be a reference to the route path hosting the contents of the tab. Path needs to be a child of your "tabs" path, otherwise navigate manually by handling the \`click\` event.`,
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'tab',
      description: `Should be a reference to the route path hosting the contents of the tab. Path needs to be a child of your "tabs" path, otherwise navigate manually by handling the \`click\` event.`,
      defaultValue: '',
      type: ['string'],
    },
  ];
}
