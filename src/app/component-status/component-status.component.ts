import { Component, OnInit } from '@angular/core';

import { componentStatusItems, ComponentStatusItem } from './component-status-items';

@Component({
  selector: 'kirby-component-status',
  templateUrl: './component-status.component.html',
  styleUrls: ['./component-status.component.scss'],
})
export class ComponentStatusComponent implements OnInit {
  items: ComponentStatusItem[] = componentStatusItems;

  constructor() {}

  ngOnInit() {}
}
