import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kirby-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss'],
})
export class CircularProgressComponent implements OnInit {
  @Input() value: number;

  constructor() {}

  ngOnInit() {}
}
