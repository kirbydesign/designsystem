import { Options } from 'highcharts';
import { ElementRef } from '@angular/core';
import { WebView, LoadEventData } from 'tns-core-modules/ui/web-view/web-view';
import { android, ios, AndroidApplication, AndroidActivityEventData } from 'tns-core-modules/application';

const webViewInterfaceModule = require('nativescript-webview-interface');

export class ChartHelper {
  chartWebViewInterface;
  webViewReady = false;

  public init(options: Options, webViewRef: ElementRef) {
    const webView = webViewRef.nativeElement as WebView;
    webView.on(WebView.loadedEvent, (args: LoadEventData) => {
      setTimeout(() => {
        this.setupWebviewInterface(webView, options);
      }, 0);
    });
  }

  private setupWebviewInterface(webView: WebView, options: Options) {
    webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
      if (!args.error) {
        this.setupWebViewForPlatforms(webView);
        this.webViewReady = true;
        this.updateChart(options);
      }
    });
    this.chartWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/chart/chart.webview.html');
  }

  public onChanges(options: Options) {
    if (this.webViewReady) {
      this.updateChart(options);
    }
  }

  private updateChart(options: Options) {
    this.chartWebViewInterface.emit('updateChart', options);
  }

  private setupWebViewForPlatforms(webView: WebView) {
    const platformWebView = android ? webView.android : webView.ios;
    if (android) {
      platformWebView.getSettings().setBuiltInZoomControls(false);
      platformWebView.getSettings().setDisplayZoomControls(false);
      android.on(AndroidApplication.activityPausedEvent, (args: AndroidActivityEventData) => {
        platformWebView.onPause();
      });
      android.on(AndroidApplication.activityResumedEvent, (args: AndroidActivityEventData) => {
        platformWebView.onResume();
      });
    } else if (ios) {
      const sw = platformWebView.scrollView;
      sw.bounces = false;
      sw.scrollEnabled = false;
    }
  }

}
