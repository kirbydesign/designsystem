import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-menu-portal-in-list-wrapper-example',
  template: `
    <kirby-list [items]="[{}, {}]">
      <kirby-list-header *kirbyListHeader>
        <ng-content select="[header]"></ng-content>
      </kirby-list-header>
      <kirby-list-item>
        <kirby-item *kirbyListItemTemplate="let item">
          <ng-content select="[body]"></ng-content>
        </kirby-item>
      </kirby-list-item>
    </kirby-list>
  `,
})
export class PortalInListWrapperComponent {}
