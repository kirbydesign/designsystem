import { Component, OnInit, Input, Directive, TemplateRef, ContentChild, OnDestroy } from '@angular/core';
import { Observable, isObservable, Subscription } from 'rxjs';

@Directive({
  selector: '[kirbyListItem]'
})
export class ListItemDirective {}

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  @Input() items: any[] | Observable<any[]>;
  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, {read: TemplateRef}) listItemTemplate;
  private _itemsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (isObservable(this.items)) {
      this._itemsSubscription = (<Observable<any>>this.items).subscribe(
        items => this.items = items
      );
    }
  }

  ngOnDestroy(): void {
    if (this._itemsSubscription) {
      this._itemsSubscription.unsubscribe();
    }
  }

}
