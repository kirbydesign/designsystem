import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-list-section-header',
  templateUrl: './list-section-header.component.html',
})
export class ListSectionHeaderComponent implements OnInit {
  @Input() title: string;
  constructor() {}

  ngOnInit() {}
}
