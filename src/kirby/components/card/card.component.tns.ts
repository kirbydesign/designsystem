import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { screen } from 'platform';
import { View } from 'tns-core-modules/ui/core/view/view';
import { FlexboxLayout } from 'tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout';
import { ScssHelper } from '../../scss/scss-helper';


const screenScale = screen.mainScreen.scale;
declare const CGSizeMake: any;
declare const android: any;

@Component({
  selector: 'kirby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() subtitle: string;

  @ViewChild('outerView') outerView: ElementRef<FlexboxLayout>;
  @ViewChild('innerView') innerView: ElementRef<FlexboxLayout>;

  cardSizeClass = '';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.innerView && this.innerView.nativeElement instanceof FlexboxLayout) {
      this.innerView.nativeElement.addEventListener('loaded', () => {
        if (this.innerView.nativeElement.android) {
          this.applyCardSizeAndShadow(this.innerView.nativeElement);
        }
      });
    }

    if (this.outerView && this.outerView.nativeElement instanceof FlexboxLayout) {
      this.outerView.nativeElement.addEventListener('loaded', () => {
        if (this.outerView.nativeElement.ios) {
          this.applyCardSizeAndShadow(this.outerView.nativeElement);
        }
      });
    }
  }

  applyCardSizeAndShadow(nativeView: View) {
    if (!(nativeView.ios || nativeView.android)) {
      return;
    }
    this.applyCardSize(nativeView);
    this.addShadow(nativeView);
  }

  applyCardSize(nativeView: View) {
    const widthDP = nativeView.getMeasuredWidth() / screenScale;
    if (widthDP >= ScssHelper.BREAKPOINT_CARD_L) {
      this.cardSizeClass = 'card-large';
    } else if (widthDP >= ScssHelper.BREAKPOINT_CARD_M) {
      this.cardSizeClass = 'card-medium';
    } else {
      this.cardSizeClass = 'card-small';
    }
  }

  addShadow(nativeView: View) {
    if (nativeView.android) {
      const bgColor = nativeView.style.backgroundColor;
      const androidView = nativeView.android;
      const shape = new android.graphics.drawable.GradientDrawable();
      shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
      shape.setColor(android.graphics.Color.parseColor(bgColor + ''));
      shape.setCornerRadius(ScssHelper.BORDER_RADIUS);
      androidView.setBackgroundDrawable(shape);
      androidView.setElevation(ScssHelper.ELEVATION_CARD_RESTING);
    } else if (nativeView.ios) {
      const iosView = nativeView.ios;
      iosView.layer.shadowColor = ScssHelper.SHADOW_COLOR.ios.CGColor;
      iosView.layer.shadowOffset = CGSizeMake(0, ScssHelper.SHADOW_OFFSET_Y);
      iosView.layer.shadowOpacity = ScssHelper.SHADOW_OPACITY;
      iosView.layer.shadowRadius = ScssHelper.SHADOW_RADIUS;
    }
  }

}
