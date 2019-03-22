import { Component, OnInit, Input } from '@angular/core';

import { ShowcaseProperty } from './showcase-property';

@Component({
  selector: 'kirby-showcase-properties',
  templateUrl: './showcase-properties.component.html',
  styleUrls: ['./showcase-properties.component.scss'],
})
export class ShowcasePropertiesComponent implements OnInit {
  @Input() properties: ShowcaseProperty[];
  constructor() {}

  ngOnInit() {}
}
