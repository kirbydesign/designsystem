import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
})
export class CardHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() isTitleBold: boolean;
  @Input() flagged: 'success' | 'warning' | 'danger' | 'informational' = null;

  constructor() {}

  ngOnInit() {}

  @HostBinding('class')
  get _cssClass() {
    // TODO: Should we use the 'flagged-' prefix or not?
    return [this.flagged && `flagged-${this.flagged}`];
  }
}
