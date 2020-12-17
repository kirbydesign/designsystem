import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { ModalConfig } from '../../modal-wrapper/config/modal-config';
import { IonContent } from '@ionic/angular';

import { WindowRef } from '../../../../types';

@Component({
  selector: 'kirby-inline-footer',
  templateUrl: './inline-footer.component.html',
  styleUrls: ['./inline-footer.component.scss'],
})
export class InlineFooterComponent implements OnInit, AfterViewInit {
  @Input() config: ModalConfig;
  @ViewChild(IonContent, { static: true }) private ionContent: IonContent;

  constructor(private elementRef: ElementRef<HTMLElement>, private windowRef: WindowRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //  setTimeout(() => this.calculateHeights());
  }

  private calculateHeights(): void {
    const element = this.elementRef.nativeElement;
    //own height 22 - 48
    console.log(element.offsetHeight, element.scrollHeight, element.clientHeight, element);

    const parent = element.parentElement;
    console.log(parent.offsetHeight, parent.scrollHeight, parent.clientHeight, parent);

    const totalHeight = this.windowRef.innerHeight;
    console.log('innerHeight', totalHeight, this.windowRef);

    const footerHeight = parent.offsetHeight;
    console.log('parent', footerHeight);

    const h = totalHeight - footerHeight;
    console.log('top', h);
  }
}
