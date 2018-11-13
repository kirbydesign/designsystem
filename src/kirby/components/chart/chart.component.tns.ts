import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { WebView, LoadEventData } from 'ui/web-view';
const webViewInterfaceModule = require('nativescript-webview-interface');


@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() chartType = 'bar';
  @Input() labels: string[] = ['Taco', 'Toast', 'Pizza'];
  @Input() data: number[] = [300, 500, 100];

  @ViewChild('webView') private webView: ElementRef;
  private chartWebViewInterface;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setupWebViewInterface();
  }

  private setupWebViewInterface() {
    const webView: WebView = this.webView.nativeElement;
    this.chartWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/chart.webview.html');

    // loading chart data, on load of webView.
    webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
      if (!args.error) {
        this.loadChartDataInWebView();
      }
    });

    // this.listenForWebViewEvents();
  }

  private loadChartDataInWebView() {
    const data = {
      chartType: this.chartType,
      labels: this.labels,
      data: this.data
    };
    this.chartWebViewInterface.emit('loadChartData', data);
  }


}
