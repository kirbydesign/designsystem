import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() size: string;
  @Input() color: string;
  @Input() shape: string;

  classes: string[] = [];

  constructor() { }

  ngOnInit() {
    this.classes.push("checkbox");
    this.classes.push(this.size || "");
    this.classes.push(this.color || "");
    this.classes.push(this.shape || "");
  }

}
