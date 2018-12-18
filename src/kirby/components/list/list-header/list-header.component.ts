import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {

  @Input() left = '';

  @Input() middle = '';

  @Input() right = '';

  constructor() { }

  ngOnInit() {
  }

}
