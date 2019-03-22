import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-floating-action-button-example',
  templateUrl: './floating-action-button-example.component.html',
  styleUrls: ['./floating-action-button-example.component.scss'],
})
export class FloatingActionButtonExampleComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  public onTap(args: any) {
    console.log('tapped on a floating action button');
  }

  public onClick(args: any) {
    console.log('clicked on a floating action button');
  }
}
