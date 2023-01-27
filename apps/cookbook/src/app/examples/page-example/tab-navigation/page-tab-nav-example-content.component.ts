import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';

@Component({
  template: `
    <h1>{{ title }}</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia
      officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati
      odit quia soluta!
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia
      officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati
      odit quia soluta!
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia
      officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati
      odit quia soluta!
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia
      officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati
      odit quia soluta!
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia
      officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati
      odit quia soluta!
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia
      officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati
      odit quia soluta!
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia
      officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati
      odit quia soluta!
    </p>
  `,
  styleUrls: [],
})
export class PageTabNavExampleContentComponent implements OnInit, OnDestroy {
  title: string;
  subscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = of(this.route.snapshot.data.title).subscribe((val) => {
      this.title = val;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
