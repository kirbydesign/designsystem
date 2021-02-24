import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cookbook-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}
  year: string = new Date(Date.now()).getFullYear().toString();
  ngOnInit(): void {}
}
