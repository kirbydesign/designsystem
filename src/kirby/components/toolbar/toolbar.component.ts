import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PlatformService } from '@kirbydesign/designsystem/services/platform/platform.service';

@Component({
  selector: 'kirby-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() hideBackButton: boolean;

  @Output() back = new EventEmitter();
  @Output() primarySelect = new EventEmitter();
  @Output() secondarySelect = new EventEmitter();

  isAndroid: boolean;

  constructor(private platform: PlatformService) {
    this.isAndroid = this.platform.isAndroid;
  }

  ngOnInit() {}

  onBackButtonSelect(): void {
    this.back.emit();
  }

  onPrimarySelect(): void {
    this.primarySelect.emit();
  }

  onSecondarySelect(): void {
    this.secondarySelect.emit();
  }
}
