import { Component } from '@angular/core';
import { AllCompsComponent } from './all-comps.component';

@Component({
  selector: 'cookbook-theme-playground',
  templateUrl: './theme-playground.component.html',
  styleUrls: ['./theme-playground.component.scss'],
  imports: [AllCompsComponent],
})
export class ThemePlaygroundComponent {}
