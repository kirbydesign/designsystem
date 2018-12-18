import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { WebView, LoadEventData } from 'ui/web-view';
import { android, ios, AndroidApplication, AndroidActivityEventData } from 'tns-core-modules/application';
import { Options } from 'highcharts';
import { DonutOptions } from './donut/options';
import { Page } from 'tns-core-modules/ui/page';

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
  private pageLoaded = false;

  constructor(private page: Page) { }

  ngOnInit() {
    this.page.on('loaded', (data) => {
      this.setupWebViewInterface();
      this.pageLoaded = true;
    });
  }

  private setupWebViewInterface() {
    const webView: WebView = this.webViewRef.nativeElement;
    this.chartWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/chart/chart.webview.html');
    webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
      if (!args.error) {
        this.setupWebViewForPlatforms(webView);
        this.loadChartDataInWebView();
      }
    });
  }

  private loadChartDataInWebView() {
    const chartType = this.type === 'donut' ? 'pie' : this.type;
    if (chartType === 'pie') {
      this.options = new DonutOptions().options;
      this.options.chart.type = chartType;
    }
    this.updateChart();
  }

  ngOnChanges() {
    if (this.pageLoaded) {
      this.updateChart();
    }
  }

  updateChart() {
    if (this.options.chart && this.options.chart.type === 'pie') {
      this.options.chart.height = this.height;
      this.options.series[0].data = this.data;
      this.options.chart.description = this.description;
      this.options.plotOptions.pie.dataLabels.enabled = this.dataLabelsEnabled;
      this.options.plotOptions.pie.dataLabels.format = '{point.label}';
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
