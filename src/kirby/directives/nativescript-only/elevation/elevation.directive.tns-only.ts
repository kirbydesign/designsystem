import { Directive, OnInit, Input, HostBinding, ElementRef } from '@angular/core';
import { isIOS } from 'tns-core-modules/ui/page/page';

@Directive({ selector: '[kirbyElevation]' })
export class NativeScriptElevationDirective implements OnInit {
  @Input() kirbyElevation?: 'z2' | 'z4' | 'z8';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (!this.kirbyElevation) {
      return;
    }

    this.applyElevation();
    // this.el.nativeElement.style.backgroundColor = 'red';
  }

  private applyElevation() {
    const el = this.el.nativeElement;
    if (isIOS) {
      console.log(`applying elevation ${this.kirbyElevation} on iOS`);
    } else {
      console.log(`applying elevation ${this.kirbyElevation} on Android`);
    }
  }
}
