import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { WebView, LoadEventData } from 'ui/web-view';
import { android, ios, AndroidApplication, AndroidActivityEventData } from 'tns-core-modules/application';
import { Options } from 'highcharts';
import { DonutOptions } from './options/donut';
import { AreaSplineOptions } from './options/areaspline';

const webViewInterfaceModule = require('nativescript-webview-interface');

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data = [];
  @Input() height = 300;
  @Input() type = 'pie';
  @Input() description = '';
  @Input() dataLabelsEnabled = true;

  options: Options = {};

  @ViewChild('webView') webViewRef: ElementRef;
  private chartWebViewInterface;
  private webViewReady = false;

  constructor() { }

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
    const chartType = this.type === 'donut' ? 'pie' : this.type;
    switch (chartType) {
      case 'pie': {
        this.options = new DonutOptions().options;
        break;
      }
      case 'areaspline': {
        this.options = new AreaSplineOptions().options;
        break;
      }
    }
    this.options.chart.type = chartType;
    this.updateChart();
  }

  ngOnChanges() {
    if (this.webViewReady) {
      this.updateChart();
    }
  }

  updateChart() {
    if (this.options.chart) {
      this.options.chart.height = this.height;
      this.options.series[0].data = this.data;
      this.options.chart.description = this.description;
    }
    if (this.options.chart.type === 'pie') {
      this.options.plotOptions.pie.dataLabels.enabled = this.dataLabelsEnabled;
    }
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
