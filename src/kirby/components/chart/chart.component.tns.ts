import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { WebView, LoadEventData } from 'ui/web-view';
import { android, ios, AndroidApplication, AndroidActivityEventData } from 'tns-core-modules/application';

const webViewInterfaceModule = require('nativescript-webview-interface');

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() options = {};
  @Input() height = 300;

  @ViewChild('webView') private webView: ElementRef;
  private chartWebViewInterface;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.setupWebViewInterface();
  }

  private setupWebViewInterface() {
    const webView: WebView = this.webView.nativeElement;
    this.chartWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/chart.webview.html');

    // loading chart data, on load of webView
    webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
      if (!args.error) {
        this.loadChartDataInWebView();
        this.setupWebViewForPlatforms(webView);
      }
    });
  }

  private loadChartDataInWebView() {
    const data = {
      options: this.options,
      height: this.height
    };
    this.chartWebViewInterface.emit('loadChartData', data);
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
      const sw: UIScrollView = platformWebView.scrollView;
      sw.bounces = false;
      sw.scrollEnabled = false;
    }
  }

}
