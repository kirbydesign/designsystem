import { Options } from 'highcharts';
import { ElementRef } from '@angular/core';
import { WebView, LoadEventData } from 'tns-core-modules/ui/web-view/web-view';
import { android, AndroidApplication, AndroidActivityEventData } from 'tns-core-modules/application';
import { isAndroid, isIOS } from 'tns-core-modules/platform';
import * as webViewInterfaceModule from 'nativescript-webview-interface';

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
    this.chartWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/chart/chart.webview.html');
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
      androidView .getSettings().setBuiltInZoomControls(false);
      androidView .getSettings().setDisplayZoomControls(false);
      android.on(AndroidApplication.activityPausedEvent, (args: AndroidActivityEventData) => {
        androidView .onPause();
      });
      android.on(AndroidApplication.activityResumedEvent, (args: AndroidActivityEventData) => {
        androidView .onResume();
      });
    } else if (isIOS) {
      const iosScrollView = webView.ios.scrollView;
      iosScrollView.bounces = false;
      iosScrollView.scrollEnabled = false;
    }
  }

}
