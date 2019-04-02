import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() colortype: 'primary' | 'secondary' | 'tertiary' | 'alert' | 'success' | 'danger';
  @Input() text: string;

  constructor() {}

  ngOnInit() {}
}
