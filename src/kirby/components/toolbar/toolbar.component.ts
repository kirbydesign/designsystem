import { Component, OnInit, Input, ContentChild, TemplateRef, HostBinding } from '@angular/core';

import { ToolbarStartElementDirective, ToolbarEndElementDirective } from './toolbar.directive';

@Component({
  selector: 'kirby-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() showBackButton: boolean;
  @Input() themeColor: string;

  @ContentChild(ToolbarStartElementDirective, { read: TemplateRef }) startElement;
  @ContentChild(ToolbarEndElementDirective, { read: TemplateRef }) endElement;
  constructor() {}

  ngOnInit() {}
}
