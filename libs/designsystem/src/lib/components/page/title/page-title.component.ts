import { Component, HostBinding, ElementRef } from '@angular/core';

@Component({
  selector: 'kirby-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent {
  constructor(private elref: ElementRef) {}

  @HostBinding('class.has-children')
  private get hasChildren(): boolean {
    return this.elref.nativeElement.children.length > 0;
  }
}
