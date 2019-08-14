import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'kirby-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() hideBackButton: boolean;

  @Output() back: EventEmitter<null> = new EventEmitter<null>();
  @Output() middleSelected: EventEmitter<null> = new EventEmitter<null>();
  @Output() endSelected: EventEmitter<null> = new EventEmitter<null>();

  constructor() {}

  ngOnInit() {}

  onBackButtonSelected(): void {
    this.back.emit();
  }

  onMiddleSelected(): void {
    this.middleSelected.emit();
  }

  onEndSelected(): void {
    this.endSelected.emit();
  }
}
