import { ElementRef, NgZone, Injectable } from '@angular/core';
import { WebView, LoadEventData } from 'tns-core-modules/ui/web-view/web-view';
import { isAndroid, isIOS } from 'tns-core-modules/platform';
import { WebViewInterface } from 'nativescript-webview-interface';
import * as applicationModule from 'tns-core-modules/application';

import { CalendarOptions } from './calendar-options.model';

declare const android;
declare const UIColor;

@Injectable()
export class CalendarHelper {
  private webViewInterface: WebViewInterface;
  private webViewReady = false;

  constructor(private zone: NgZone) {}

  public init(
    calendarContainer: ElementRef,
    options: CalendarOptions,
    onDaySelected: (cell: { isSelectable: boolean; date: number }) => void,
    onChangeMonth: (direction: number) => void
  ) {
    if (calendarContainer && calendarContainer.nativeElement) {
      const webView = calendarContainer.nativeElement as WebView;
      if (webView) {
        webView.on(WebView.loadedEvent, (args: LoadEventData) => {
          setTimeout(() => {
            this.initializeWebView(webView, options, onDaySelected, onChangeMonth);
          }, 0);
        });
      }
    }
  }

  public update(options: CalendarOptions) {
    this.emitOptionsToWebView(options);
  }

  public setSelectedDay(day: number) {
    if (this.webViewReady) {
      this.webViewInterface.emit('setSelectedDay', day);
    }
  }

  private initializeWebView(
    webView: WebView,
    options: CalendarOptions,
    onDaySelected: (cell: { isSelectable: boolean; date: number }) => void,
    onChangeMonth: (direction: number) => void
  ) {
    if (webView) {
      webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
        if (!args.error) {
          this.webViewReady = true;
          this.setupWebViewForPlatform(webView);
          this.addEventListeners(onDaySelected, onChangeMonth);
          this.emitOptionsToWebView(options);
        }
      });

      this.webViewInterface = new WebViewInterface(webView, '~/calendar/calendar.webview.html');
      this.setTransparentBackground(webView);
    }
  }

  private emitOptionsToWebView(options: CalendarOptions) {
    if (this.webViewReady) {
      this.webViewInterface.emit('init', options);
    }
  }

  private addEventListeners(
    onDaySelected: (cell: { isSelectable: boolean; date: number }) => void,
    onChangeMonth: (direction: number) => void
  ) {
    this.webViewInterface.on('daySelected', (selectedDay: number) => {
      // Run in the zone, to make sure Angular data binding is informed of this:
      this.zone.run(() => {
        onDaySelected({ isSelectable: true, date: selectedDay });
      });
    });
    this.webViewInterface.on('changeMonth', (index: number) => {
      onChangeMonth(index);
    });
  }

  private setTransparentBackground(webView: WebView) {
    if (isAndroid) {
      webView.android.setBackgroundColor(0x00000000);
      webView.android.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
    }
    if (isIOS) {
      webView.ios.backgroundColor = UIColor.clearColor;
      webView.ios.opaque = false;
    }
  }

  private setupWebViewForPlatform(webView: WebView) {
    if (isAndroid) {
      const androidView = webView.android;
      androidView.getSettings().setBuiltInZoomControls(false);
      androidView.getSettings().setDisplayZoomControls(false);
      applicationModule.android.on(
        applicationModule.AndroidApplication.activityPausedEvent,
        (args: applicationModule.AndroidActivityEventData) => {
          androidView.onPause();
        }
      );
      applicationModule.android.on(
        applicationModule.AndroidApplication.activityResumedEvent,
        (args: applicationModule.AndroidActivityEventData) => {
          androidView.onResume();
        }
      );
    } else if (isIOS) {
      const iosScrollView = webView.ios.scrollView;
      iosScrollView.bounces = false;
      iosScrollView.scrollEnabled = false;
    }
  }
}
