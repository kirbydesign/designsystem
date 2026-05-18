import { Component } from '@angular/core';
import { SectionHeaderHeadingWithLabelExampleComponent } from './examples/heading-with-label';
import { SectionHeaderLabelAndDetailExampleComponent } from './examples/label-and-detail';
import { SectionHeaderHeadingWithMultilineLabelExampleComponent } from './examples/heading-with-multiline-label';
import { SectionHeaderWithCardComponent } from './examples/header-with-card';
import { SectionHeaderHeadingLevelsExampleComponent } from './examples/heading-levels';

@Component({
  selector: 'cookbook-section-header-example',
  templateUrl: './section-header-example.component.html',
  styleUrls: ['./section-header-example.component.scss'],
  imports: [
    SectionHeaderHeadingWithLabelExampleComponent,
    SectionHeaderLabelAndDetailExampleComponent,
    SectionHeaderHeadingWithMultilineLabelExampleComponent,
    SectionHeaderWithCardComponent,
    SectionHeaderHeadingLevelsExampleComponent,
  ],
})
export class SectionHeaderExampleComponent {}
