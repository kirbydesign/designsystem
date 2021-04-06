import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
export class CookbookExampleCardContentComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() activeSlideIndex: number;
  @Input() slideIndex: number;

  title: string;
  subtitle: string;
  cardContent: string;

  hasPadding = true;
  showSize = true;
  hasHeader = true;
  hasFooter = true;

  ngOnInit() {
    this.title = this.data.title;
    this.subtitle = this.data.subtitle;
    this.cardContent = this.data.cardContent;
  }

  ngOnChanges(changes: SimpleChanges) {
    // not in use in this example - but gives you access to the index of any slide from the component loaded inside the slide
    let activeSlide = changes.activeSlideIndex.currentValue || 0;
    // doSomethingWithTheActiveSlideIndex(activeSlide);
  }
}
