import { Directive, OnInit, Input, HostBinding, ElementRef } from '@angular/core';

@Directive({ selector: '[kirbyShadow]' })
export class NativeScriptElevationDirective implements OnInit {
  @Input() elevation?: 'z2' | 'z4' | 'z8';

  constructor(private el: ElementRef) {
    // backgroundColor: string = 'red';
  }

  ngOnInit(): void {
    console.log(this.el);
    this.el.nativeElement.style.backgroundColor = 'red';
    // console.log('ngOnInit() invoked for kirby shadow directive');
  }
}
