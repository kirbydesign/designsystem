import { Component, OnInit, Input, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kirby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;

  constructor() { }

  ngOnInit() {
  }

}
