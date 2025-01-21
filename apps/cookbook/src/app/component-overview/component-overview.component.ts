import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { NgFor } from '@angular/common';
import ComponentConfiguration from './component-configuration.json';
import { Display } from './display';
import { ComponentDisplayComponent } from './component-display/component-display.component';

@Component({
  selector: 'cookbook-component-overview',
  templateUrl: './component-overview.component.html',
  styleUrls: ['./component-overview.component.scss'],
  imports: [DividerComponent, NgFor, ComponentDisplayComponent],
})
export class ComponentOverviewComponent implements OnInit {
  constructor(private _router: Router) {}

  listOfComponents: Display[];
  ngOnInit(): void {
    this.listOfComponents = ComponentConfiguration.componentConfiguration;
  }
}
