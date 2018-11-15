import { Component, Input, OnInit, AfterContentChecked, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
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
export class CardComponent implements OnInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  @Input() title: string;
  @Input() subtitle: string;

  // Søren, I can get this to work with ViewChild, not as View but as ElementRef<FlexboxLayout> ;)
  @ViewChild('outerView') outerView: ElementRef<FlexboxLayout>;
  @ViewChild('innerView') innerView: ElementRef<FlexboxLayout>;

  cardSizeClass = '';
  private isCardSizeAndShadowApplied = false;
  private starttime = null;

  constructor() {
    this.starttime = new Date();
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (this.innerView && this.innerView.nativeElement instanceof FlexboxLayout && this.innerView.nativeElement.android) {
      console.log('ngAfterViewChecked androidNativeView ready. Elapsed: ' + (new Date().getTime() - this.starttime.getTime()));
    }
  }

  ngAfterViewInit() {
    if (this.innerView && this.innerView.nativeElement instanceof FlexboxLayout && this.innerView.nativeElement.android) {
      console.log('ngAfterViewInit androidNativeView ready. Elapsed: ' + (new Date().getTime() - this.starttime.getTime()));
    }

    if (this.innerView && this.innerView.nativeElement instanceof FlexboxLayout) {
      this.innerView.nativeElement.addEventListener('loaded', () => {
        console.log('onLoaded from event listener Elapsed: ' + (new Date().getTime() - this.starttime.getTime()));
        if (this.innerView.nativeElement.android) {
          console.log('androidNativeView from controller ready. Elapsed: ' + (new Date().getTime() - this.starttime.getTime()));
          this.applyCardSizeAndShadow(this.innerView.nativeElement);
        }
      });
    }

    if (this.outerView && this.outerView.nativeElement instanceof FlexboxLayout) {
      this.outerView.nativeElement.addEventListener('loaded', () => {
        console.log('onLoaded from event listener Elapsed: ' + (new Date().getTime() - this.starttime.getTime()));
        if (this.outerView.nativeElement.ios) {
          console.log('iosNativeView from controller ready. Elapsed: ' + (new Date().getTime() - this.starttime.getTime()));
          this.applyCardSizeAndShadow(this.outerView.nativeElement);
        }
      });
    }
  }

  // Søren, I can get this to work with ngAfterContentChecked ;)
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked Elapsed: ' + (new Date().getTime() - this.starttime.getTime()));

    if (this.innerView && this.innerView.nativeElement instanceof FlexboxLayout && this.innerView.nativeElement.android) {
      const androidNativeView = this.innerView.nativeElement.android;
      if (androidNativeView) {
        console.log('androidNativeView ready. Elapsed: ' + (new Date().getTime() - this.starttime.getTime()));
      } else {
        console.log('Native Android View not initialized yet...');
      }
      // this.applyCardSizeAndShadow(this.innerView.nativeElement);
    } else if (this.outerView && this.outerView.nativeElement instanceof FlexboxLayout) {
      const iosNativeView = this.outerView.nativeElement.ios;
      if (iosNativeView) {
        console.log('iosNativeView ready. Elapsed: ' + (new Date().getTime() - this.starttime.getTime()));
      } else {
        console.log('Native iOS View not initialized yet...');
      }
    }
  }

  onOuterViewLoaded(nativeView: View) {
    console.log('onOuterViewLoaded ... Elapsed: ' + (new Date().getTime() - this.starttime.getTime()));
    if (nativeView.ios) {
      this.applyCardSizeAndShadow(nativeView);
    }
  }

  onInnerViewLoaded(nativeView: View) {
    console.log('onInnerViewLoaded Elapsed: ' + (new Date().getTime() - this.starttime.getTime()));
    if (nativeView.android) {
      this.applyCardSizeAndShadow(nativeView);
    }
  }

  applyCardSizeAndShadow(nativeView: View) {
    if (this.isCardSizeAndShadowApplied || !(nativeView.ios || nativeView.android)) {
      return;
    }
    console.log('apply card size and shadow: ' + (new Date().getTime() - this.starttime.getTime()));
    this.applyCardSize(nativeView);
    this.addShadow(nativeView);
    this.isCardSizeAndShadowApplied = true;
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
