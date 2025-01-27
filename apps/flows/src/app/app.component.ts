import { Component, OnInit } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'flows-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'flows';

  ngOnInit() {
    StatusBar.setStyle({ style: Style.Light });
  }
}
