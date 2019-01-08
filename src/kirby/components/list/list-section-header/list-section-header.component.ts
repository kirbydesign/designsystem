import {Component, Input, OnInit} from '@angular/core';
import {ListSection} from '~/kirby/components/list/list-section';

@Component({
  selector: 'kirby-list-section-header',
  templateUrl: './list-section-header.component.html',
  styleUrls: ['./list-section-header.component.scss']
})
export class ListSectionHeaderComponent implements OnInit {

  @Input() section: ListSection;
  // @Input() section: ListSection;
  // @Input() title = ''
  constructor() { }

  get title(): String {
    return this.section.title;
  }



  ngOnInit() {
  }

}
