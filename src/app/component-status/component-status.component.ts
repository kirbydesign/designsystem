import { Component, OnInit } from '@angular/core';

import { componentStatusItems, ComponentStatusItem } from './component-status-items';

@Component({
  selector: 'kirby-component-status',
  templateUrl: './component-status.component.html',
  styleUrls: ['./component-status.component.scss'],
})
export class ComponentStatusComponent implements OnInit {
  headers: String[];
  items: ComponentStatusItem[] = componentStatusItems;

  constructor() {}

  ngOnInit() {
    this.headers = this.setHeaders(componentStatusItems);
  }

  /*
   * Generate headers based on Component object props
   */
  setHeaders(components: ComponentStatusItem[]): String[] {
    if (components.length === 0) return [];
    let headers = [];
    for (const header in components[0]) {
      headers.push(header);
    }
    return headers;
  }
}
