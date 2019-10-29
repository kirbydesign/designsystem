import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  template: `
    <kirby-page [title]="title | async">
      <kirby-page-actions *kirbyPageActions>
        <button kirby-button (click)="onCogSelect()">
          <kirby-icon name="cog"></kirby-icon>
        </button>
        <button kirby-button (click)="onMoreSelect()">
          <kirby-icon name="more"></kirby-icon>
        </button>
      </kirby-page-actions>
      <kirby-page-content>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
          officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
          obcaecati odit quia soluta!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
          officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
          obcaecati odit quia soluta!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
          officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
          obcaecati odit quia soluta!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
          officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
          obcaecati odit quia soluta!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
          officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
          obcaecati odit quia soluta!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
          officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
          obcaecati odit quia soluta!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
          officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
          obcaecati odit quia soluta!
        </p>
      </kirby-page-content>
    </kirby-page>
  `,
  styleUrls: [],
})
export class TabExampleComponent implements OnInit {
  title: Observable<string>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.title = of(this.route.snapshot.data.title);
    }, 300);
  }

  onCogSelect() {
    alert('On cog select');
  }

  onMoreSelect() {
    alert('On more select');
  }
}
