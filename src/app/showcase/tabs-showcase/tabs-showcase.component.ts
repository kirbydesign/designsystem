import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-tabs-showcase',
  templateUrl: './tabs-showcase.component.html',
  styleUrls: ['./tabs-showcase.component.scss'],
})
export class TabsShowcaseComponent implements OnInit {
  exampleHtml: string = `EXAMPLE HTML`;
  constructor() {}

  ngOnInit() {}
}
