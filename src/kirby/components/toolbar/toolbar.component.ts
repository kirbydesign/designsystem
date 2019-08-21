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

  @Output() back = new EventEmitter();
  @Output() primarySelect = new EventEmitter();
  @Output() secondarySelect = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onBackButtonSelected(): void {
    this.back.emit();
  }

  onPrimarySelected(): void {
    this.primarySelect.emit();
  }

  onSecondarySelected(): void {
    this.secondarySelect.emit();
  }
}
