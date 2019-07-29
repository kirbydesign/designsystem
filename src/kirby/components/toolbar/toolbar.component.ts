import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';

import { ToolbarEndElementDirective, ToolbarSecondaryElementDirective } from './toolbar.directive';

@Component({
  selector: 'kirby-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() showBackButton: boolean;
  @Input() themeColor: string;

  @Output() backButtonSelected: EventEmitter<null> = new EventEmitter<null>();

  @ContentChild(ToolbarEndElementDirective, { read: TemplateRef }) endElement;
  @ContentChild(ToolbarSecondaryElementDirective, { read: TemplateRef }) secondaryElement;
  constructor() {}

  ngOnInit() {}

  onBackButtonSelected(): void {
    console.log('Hello!');
    this.backButtonSelected.emit();
  }
}
