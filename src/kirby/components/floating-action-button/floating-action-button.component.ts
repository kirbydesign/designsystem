import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
})

export class FloatingActionButtonComponent implements OnInit {

  @Input() hasShadow?: boolean = true;
  @Input() disabled?: boolean = false;
  @Input() iconSrc?: string = "/assets/icons/add/add@3x.png";

  constructor() { }

  ngOnInit() { }

}
