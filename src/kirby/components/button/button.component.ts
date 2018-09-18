import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kirby-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Output() action = new EventEmitter<number>();
  private clickCount = 0;
  constructor() { }

  ngOnInit() {
  }

  handleClick() {
    this.clickCount++;
    this.action.emit(this.clickCount);
  }
}
