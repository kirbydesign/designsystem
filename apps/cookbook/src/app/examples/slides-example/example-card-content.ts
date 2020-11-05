import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cookbook-example-card-content',
  template: `
    <kirby-card [hasPadding]="hasPadding" [class.show-size]="showSize">
      <kirby-card-header
        *ngIf="hasHeader"
        [title]="title"
        [subtitle]="subtitle"
      ></kirby-card-header>

      <!-- Card content example: -->
      <div class="card-content">
        {{ cardContent }}
      </div>

      <kirby-card-footer *ngIf="hasFooter">Footer</kirby-card-footer>
    </kirby-card>
  `,
})
export class CookbookExampleCardContentComponent implements OnInit {
  @Input() data: any;

  title: string;
  subtitle: string;
  cardContent: string;

  hasPadding = true;
  showSize = true;
  hasHeader = true;
  hasFooter = true;

  ngOnInit() {
    console.log('DATA: ', this.data);
    this.title = this.data.title;
    this.subtitle = this.data.subtitle;
    this.cardContent = this.data.cardContent;
  }
}
