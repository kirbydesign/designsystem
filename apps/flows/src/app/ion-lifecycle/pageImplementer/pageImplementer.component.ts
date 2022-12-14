// import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
// import { Subject } from 'rxjs';
// import { EmitterService } from '../emitter.service';

// @Component({
//   selector: 'app-pageImplementer',
//   templateUrl: './pageImplementer.component.html',
//   styleUrls: ['./pageImplementer.component.scss'],
// })
// export abstract class PageImplementerComponent implements OnInit, OnDestroy {
//   protected $destroy = new Subject<void>();
//   // protected emitterService: EmitterService;

//   constructor(@Inject('name') name: string, protected emitterService: EmitterService) {
//     this._componentName = name;
//     this.emitterService = emitterService;
//   }

//   public ngOnDestroy(): void {
//     this.$destroy.next();
//     this.$destroy.complete;

//     console.log(`${this._componentName} component onDestroy`);
//     this.emitterService.componentDestroyed.emit(`${this._componentName} component OnInit`);
//   }

//   public ngOnInit(): void {
//     this.emitterService.componentInit.emit(`${this._componentName} component OnInit`);
//     console.log(`${this._componentName} component OnInit`);
//   }

//   private _componentName: string;

//   setName(componentName: string) {
//     this._componentName = componentName;
//   }

//   public enterMessage = () => {
//     console.log(`enter from ${this._componentName}`);
//   };
//   public leaveMessage = () => {
//     console.log(`leave from ${this._componentName}`);

//     this.$destroy.next();
//     this.$destroy.complete;
//   };
// }
