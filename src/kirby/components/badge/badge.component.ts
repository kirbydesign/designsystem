import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() colortype: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'success' | 'danger';
  @Input() text: string;

  constructor() {}

  ngOnInit() {}
}
