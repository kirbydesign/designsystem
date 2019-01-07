import {Component, Input, OnInit} from '@angular/core';
import {Section} from '~/kirby/components/list/section';

@Component({
  selector: 'kirby-list-section-header',
  templateUrl: './list-section-header.component.html',
  styleUrls: ['./list-section-header.component.scss']
})
export class ListSectionHeaderComponent implements OnInit {

  @Input() section: Section;
  // @Input() section: Section;
  // @Input() title = ''
  constructor() { }

  get title(): String {
    return this.section.title;
  }



  ngOnInit() {
  }

}
