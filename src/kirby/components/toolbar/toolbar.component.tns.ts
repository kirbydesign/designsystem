import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform';

import { ToolbarEndElementDirective, ToolbarSecondaryElementDirective } from './toolbar.directive';

@Component({
  selector: 'kirby-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() hideBackButton: boolean;
  @Input() themeColor: string;

  @Output() backButtonSelected: EventEmitter<null> = new EventEmitter<null>();

  @ContentChild(ToolbarEndElementDirective, { read: TemplateRef }) endElement;
  @ContentChild(ToolbarSecondaryElementDirective, { read: TemplateRef }) secondaryElement;

  isAndroid(): boolean {
    return isAndroid;
  }

  constructor() {}

  ngOnInit() {}

  onBackButtonSelected(): void {
    console.log('Hello!');
    this.backButtonSelected.emit();
  }
}
