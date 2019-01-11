import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { WebView, LoadEventData } from 'ui/web-view';
import { android, ios, AndroidApplication, AndroidActivityEventData } from 'tns-core-modules/application';
import { Options } from 'highcharts';
import { ChartHelper } from './chart-helper';
import { ChartType } from './chart-helper';

const webViewInterfaceModule = require('nativescript-webview-interface');

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit, OnChanges {
  @Input() data = [];
  @Input() height = 300;
  @Input() type: ChartType = 'pie';
  @Input() description = '';
  @Input() dataLabelsEnabled = true;

  options: Options = {};
  chartHelper: ChartHelper;

  @ViewChild('webView') webViewRef: ElementRef;
  private chartWebViewInterface;
  private webViewReady = false;

  constructor() {
    this.chartHelper = new ChartHelper();
  }

  ngOnInit() { }

  webViewLoaded(e) {
    setTimeout(() => {
      this.setupWebViewInterface();
      this.webViewReady = true;
    }, 0);
  }

  private setupWebViewInterface() {
    const webView: WebView = this.webViewRef.nativeElement;
    webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
      if (!args.error) {
        this.setupWebViewForPlatforms(webView);
        this.loadChartDataInWebView();
      }
    });
    this.chartWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/chart/chart.webview.html');
  }

  private loadChartDataInWebView() {
    this.options = this.chartHelper.setupChartType(this.options, this.type);
    this.updateChart();
  }

  ngOnChanges() {
    if (this.webViewReady) {
      this.updateChart();
    }
  }

  updateChart() {
    this.options = this.chartHelper.updateProperties(this.options, this.height, this.data, this.description, this.dataLabelsEnabled);
    const data = {
      options: this.options,
      height: this.height
    };
    this.chartWebViewInterface.emit('updateChart', data);
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
