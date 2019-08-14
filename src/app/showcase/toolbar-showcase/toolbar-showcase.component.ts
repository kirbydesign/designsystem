import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-toolbar-showcase',
  templateUrl: './toolbar-showcase.component.html',
  styleUrls: ['./toolbar-showcase.component.scss'],
})
export class ToolbarShowcaseComponent implements OnInit {
  exampleHtml: string = `
      <!-- title -->
      <kirby-toolbar title="TITLE"></kirby-toolbar>
      <!-- themeColor -->
      <kirby-toolbar themeColor="primary"></kirby-toolbar>
      <!-- back button -->
      <kirby-toolbar hideBackButton="false" (back)="backButtonSelected()"></kirby-toolbar>
      <!-- Middle and end elements -->
      <kirby-toolbar (middleSelected)="foo()" (endSelected)="bar()">
        <kirby-icon middle size="md"></kirby-icon>
        <kirby-icon end size="md" name="more"></kirby-icon>
      </kirby-toolbar>
    `;
  constructor() {}

  ngOnInit() {}
}
