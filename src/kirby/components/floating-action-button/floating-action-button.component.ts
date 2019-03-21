import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
})

export class FloatingActionButtonComponent implements OnInit {

  @Input() href?: string;
  @Input() isTranslucent?: boolean = false;
  @Input() isDisabled?: boolean = false;
  @Input() type?: 'button' | 'reset' | 'submit' = 'button';
  @Input() iconSrc?: string = "/assets/icons/add/add@3x.png";

  constructor() { }

  ngOnInit() { }

}
