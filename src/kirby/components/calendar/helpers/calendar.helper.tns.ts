import { ElementRef } from '@angular/core';
import { WebView, LoadEventData } from 'tns-core-modules/ui/web-view/web-view';
import { isAndroid, isIOS } from 'tns-core-modules/platform';

import * as webViewInterfaceModule from 'nativescript-webview-interface';
import * as applicationModule from 'tns-core-modules/application';

import { CalendarOptions } from '../calendar.component';

declare const android;
declare const UIColor;

export class CalendarHelper {
  calendarWebViewInterface;
  webViewReady = false;

  public init(calendarContainer: ElementRef, options: CalendarOptions) {
    if (calendarContainer && calendarContainer.nativeElement) {
      console.log('calendarContainer.nativeElement exists');
      const webView = calendarContainer.nativeElement as WebView;
      if (webView) {
        webView.on(WebView.loadedEvent, (args: LoadEventData) => {
          setTimeout(() => {
            this.initializeWebView(webView, options);
          }, 0);
        });
      }
    }
  }

  public selectCurrentDate(date: Date) {
    if (this.webViewReady) {
      this.calendarWebViewInterface.emit('selectCurrentDate', date);
    }
  }

  private initializeWebView(webView: WebView, options: CalendarOptions) {
    if (webView) {
      webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
        if (!args.error) {
          this.webViewReady = true;
          this.setupWebViewForPlatform(webView);
          this.emitDataToWebView(options);
          this.addWebViewEventListener(options.selectDate);
        }
      });

      this.calendarWebViewInterface = new webViewInterfaceModule.WebViewInterface(
        webView,
        '~/calendar/calendar.webview.html'
      );
      this.setTransparentBackground(webView);
    }
  }

  private emitDataToWebView(options: CalendarOptions) {
    const calendarOptions = {
      type: 'kirbyCalendarInit',
      disableWeekends: options.disableWeekends,
      disablePastDates: options.disablePastDates,
      disableDates: options.disableDates,
      currentDate: options.currentDate,
      displayDate: options.displayDate,
      weekDays: options.weekDays,
      month: JSON.stringify(options.month),
    };
    this.calendarWebViewInterface.emit('updateCalendarOptions', calendarOptions);
  }

  private addWebViewEventListener(selectDateCallback: (date: Date) => {}) {
    this.calendarWebViewInterface.on('dateSelected', (selectedDate: string) => {
      selectDateCallback(new Date(selectedDate));
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
