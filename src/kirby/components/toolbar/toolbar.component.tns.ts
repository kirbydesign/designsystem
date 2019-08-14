import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';

import { PlatformService } from '@kirbydesign/designsystem/services/platform/platform.service';

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

  isAndroid: boolean;

  constructor(private platform: PlatformService) {
    this.isAndroid = this.platform.isAndroid;
  }

  ngOnInit() {}

  onBackButtonSelected(): void {
    this.back.emit();
  }
}
