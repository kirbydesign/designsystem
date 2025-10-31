import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageFooterComponent } from '@kirbydesign/designsystem';

import { PageComponent, PageContentComponent } from '@kirbydesign/designsystem/page';
import { NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { BasePageExampleComponent } from '../../base-page-example.component';

const pageTemplate = `<kirby-page [title]="title" [tabBarBottomHidden]="!showTabs">
  <kirby-page-content>
    <ng-container *ngTemplateOutlet="controls"></ng-container>
    <div [innerHTML]="content"></div>
    <ng-container *ngTemplateOutlet="controls"></ng-container>
  </kirby-page-content>
  @if (showFooter) {
    <kirby-page-footer>
    <h3>0 selected</h3>
    This is a fixed footer
    <button kirby-button attentionLevel="2" class="close-footer-btn" (click)="onCloseClick()" aria-label="Close">
      <kirby-icon name="close"></kirby-icon>
    </button>
    </kirby-page-footer>
  }
</kirby-page>`;
const controlsTemplate = `<ng-template #controls>
  <kirby-card>
    <kirby-item>
      <h3>Show tabs</h3>
      <kirby-toggle slot="end" (click)="toggleTabs()" [checked]="showTabs"></kirby-toggle>
    </kirby-item>
    <kirby-item>
      <h3>Show footer</h3>
      <kirby-toggle slot="end" (click)="toggleFooter()" [checked]="showFooter"></kirby-toggle>
    </kirby-item>
  </kirby-card>
</ng-template>`;

const config = {
  template: pageTemplate + controlsTemplate,
  styles: [
    `.close-footer-btn {
        position: absolute;
        top: 8px;
        right: 16px;
        margin: 0;
      }

      kirby-card:first-of-type {
        margin-bottom: 24px;
      }`,
  ],
};

@Component({
  template: config.template,
  styles: config.styles,
  imports: [
    PageComponent,
    NgTemplateOutlet,
    ButtonComponent,
    IconComponent,
    CardComponent,
    ItemComponent,
    ToggleComponent,
    PageContentComponent,
  ],
})
export class PageFixedFooterTabExampleComponent extends BasePageExampleComponent implements OnInit {
  static readonly template = pageTemplate.replace(
    /<kirby-page-content[^>]*>(.|\s)*?<\/kirby-page-content>/,
    '<kirby-page-content>...</kirby-page-content>'
  );

  @ViewChild(PageFooterComponent) pageFooter: PageFooterComponent;
  showTabs = true;
  showFooter = true;
  title: string;
  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.title = this.route.snapshot.data.title;
  }

  toggleTabs() {
    this.showTabs = !this.showTabs;
  }

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }

  onCloseClick() {
    this.pageFooter.close();
    this.showFooter = false;
    this.showTabs = true;
  }
}
