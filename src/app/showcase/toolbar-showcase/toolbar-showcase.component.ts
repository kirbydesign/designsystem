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
      <!-- primary and secondary elements -->
      <kirby-toolbar (primarySelected)="foo()" (secondarySelected)="bar()">
        <kirby-icon primary size="md" name="search"></kirby-icon>
        <kirby-icon secondary size="md" name="more"></kirby-icon>
      </kirby-toolbar>
    `;
  constructor() {}

  ngOnInit() {}
}
