import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';

import { ToolbarEndElementDirective, ToolbarSecondaryElementDirective } from './toolbar.directive';
import { PlatformService } from '~/app/services/platform/platform.service.tns-only';

@Component({
  selector: 'kirby-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() hideBackButton: boolean;
  @Input() themeColor: string;

  @Output() back: EventEmitter<null> = new EventEmitter<null>();

  @ContentChild(ToolbarEndElementDirective, { read: TemplateRef }) endElement;
  @ContentChild(ToolbarSecondaryElementDirective, { read: TemplateRef }) secondaryElement;

  isAndroid: boolean;

  constructor(private platform: PlatformService) {
    this.isAndroid = this.platform.isAndroid;
  }

  ngOnInit() {}

  onBackButtonSelected(): void {
    this.back.emit();
  }
}
