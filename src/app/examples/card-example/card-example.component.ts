import { Component, OnInit } from '@angular/core';
import { DynamicComponent } from '../../../kirby/components/shared/dynamic-component';

@Component({
  selector: 'kirby-card-example',
  templateUrl: './card-example.component.html',
  styleUrls: ['./card-example.component.scss']
})
export class CardExampleComponent implements DynamicComponent, OnInit {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
