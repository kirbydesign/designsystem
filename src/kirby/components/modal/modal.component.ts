import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'kirby-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  // State of the modal - called from another component, e.g. a button
  @Input() open = false;

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyup(evt: KeyboardEvent) {
    // Check for ESCAPE key press
    if (evt.keyCode === 27) {
      this.open = false;
    }
  }
}
