import { Component, OnInit } from '@angular/core';
import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

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

    <kirby-tab-button routerLink="">
        <kirby-icon name="menu-outline"></kirby-icon>
        Menu
    </kirby-tab-button>

</kirby-tab-bar>`;

  properties: ShowcaseProperty[] = [
    {
      name: 'routerLink',
      description: 'Lets you link to specific routes in your app.',
      defaultValue: '',
      inputValues: ['string'],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
