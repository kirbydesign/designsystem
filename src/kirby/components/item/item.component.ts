import { Component, ContentChild, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { TitleComponent } from '@kirbydesign/designsystem/components/item/title/title.component';

@Component({
  selector: 'kirby-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @ContentChild(TitleComponent, { static: true }) title: ElementRef<TitleComponent>;
  @ViewChild('defaultTemplate', { static: true }) defaultTemplate: TemplateRef<any>;
  @ViewChild('withTitleTemplate', { static: true }) withTitleTemplate: TemplateRef<any>;
  template: TemplateRef<any>;

  ngOnInit(): void {
    this.template = this.title ? this.withTitleTemplate : this.defaultTemplate;
  }
}
