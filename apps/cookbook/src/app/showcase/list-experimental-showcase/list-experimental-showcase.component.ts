import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-list-experimental-showcase',
  templateUrl: './list-experimental-showcase.component.html',
  styleUrls: ['./list-experimental-showcase.component.scss'],
})
export class ListExperimentalShowcaseComponent {
  multipleListsExample: string = `<kirby-list-experimental>
  <kirby-section-header outside></kirby-section-header>
  ...
</kirby-list-experimental>

<kirby-list-experimental>
  <kirby-section-header outside></kirby-section-header>
  ...
</kirby-list-experimental>`;
}
