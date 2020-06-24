import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-list-section-header',
  templateUrl: './list-section-header.component.html',
  styleUrls: ['./list-section-header.component.scss'],
})
export class ListSectionHeaderComponent implements OnInit {
  @Input() title: string;
  constructor() {}

  ngOnInit() {}
}
