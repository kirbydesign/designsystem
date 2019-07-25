import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-toolbar-example',
  templateUrl: './toolbar-example.component.html',
  styleUrls: ['./toolbar-example.component.scss'],
})
export class ToolbarExampleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  backButtonSelected(): void {
    alert('backbutton clicked!');
  }
}
