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
  @Output() primarySelected: EventEmitter<null> = new EventEmitter<null>();
  @Output() secondarySelected: EventEmitter<null> = new EventEmitter<null>();

  constructor() {}

  ngOnInit() {}

  onBackButtonSelected(): void {
    this.back.emit();
  }

  onPrimarySelected(): void {
    this.primarySelected.emit();
  }

  onSecondarySelected(): void {
    this.secondarySelected.emit();
  }
}
