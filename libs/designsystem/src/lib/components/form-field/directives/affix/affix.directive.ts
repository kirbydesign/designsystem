import { Directive, OnInit } from '@angular/core';

@Directive({
  selector: '[kirby-input][affix]',
})
export class AffixDirective implements OnInit {
  constructor() {}
  ngOnInit(): void {
    console.log('lololol');
  }
}
