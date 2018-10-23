import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss']
})
export class ModalExampleComponent implements OnInit {

  isLightModalOpen = false;
  isDarkModalOpen = false;

  constructor() { }

  ngOnInit() {
  }

  openLightModal() {
    this.isLightModalOpen = true;
    console.log('Opening light modal...');
  }

  openDarkModal() {
    this.isDarkModalOpen = true;
    console.log('Opening dark modal...');
  }

  closeDarkModal() {
    this.isDarkModalOpen = false;
    console.log('Closing dark modal...do stuff');
  }

  closeLightModal() {
    this.isLightModalOpen = false;
    console.log('Closing light modal...do stuff');
  }

}
