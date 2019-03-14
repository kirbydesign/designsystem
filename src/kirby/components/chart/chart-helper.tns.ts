import { Options } from 'highcharts';
import { ElementRef } from '@angular/core';
import { WebView, LoadEventData } from 'tns-core-modules/ui/web-view/web-view';
import { isAndroid, isIOS } from 'tns-core-modules/platform';

import * as webViewInterfaceModule from 'nativescript-webview-interface';
import * as applicationModule from 'tns-core-modules/application';

declare const android;
declare const UIColor;

export class ChartHelper {
  chartWebViewInterface;
  webViewReady = false;

  public init(options: Options, chartContainer: ElementRef) {
    const webView = chartContainer.nativeElement as WebView;
    webView.on(WebView.loadedEvent, (args: LoadEventData) => {
      setTimeout(() => {
        this.initializeWebView(webView, options);
      }, 0);
    });
  }

  private initializeWebView(webView: WebView, options: Options) {
    webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
      if (!args.error) {
        this.setupWebViewForPlatform(webView);
        this.webViewReady = true;
        this.emitDataToWebView(options);
      }
    });
    this.chartWebViewInterface = new webViewInterfaceModule.WebViewInterface(
      webView,
      '~/chart/chart.webview.html'
    );
    this.setTransparentBackground(webView);
  }

  private setTransparentBackground(webView: WebView) {
    if (isAndroid) {
      webView.android.setBackgroundColor(0x00000000); // android.graphics.Color.TRANSPARENT);
      webView.android.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
    }
    if (isIOS) {
      webView.ios.backgroundColor = UIColor.clearColor;
      webView.ios.opaque = false;
    }
  }

  public updateChart(options: Options) {
    if (this.webViewReady) {
      this.emitDataToWebView(options);
    }
  }

  private emitDataToWebView(options: Options) {
    this.chartWebViewInterface.emit('updateChart', options);
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
