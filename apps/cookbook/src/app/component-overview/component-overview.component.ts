import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ComponentConfiguration from './component-configuration.json';
import { ComponentDisplayComponent } from './component-display/component-display.component';
import { Display } from './display';

@Component({
  selector: 'cookbook-component-overview',
  templateUrl: './component-overview.component.html',
  styleUrls: ['./component-overview.component.scss'],
})
export class ComponentOverviewComponent implements OnInit {
  constructor(private _router: Router) {}

  listOfComponents: Display[];
  ngOnInit(): void {
    this.listOfComponents = ComponentConfiguration.componentConfiguration;
  }
}
