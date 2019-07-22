import {
  Component,
  Input,
  AfterViewInit,
  ContentChild,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { registerElement } from 'nativescript-angular';
import { EventData, View } from 'tns-core-modules/ui/core/view/view';
import { ContentView } from 'tns-core-modules/ui/content-view';

import { Avatar } from './avatar.interface';

declare const CGSizeMake: any;
declare const android: any;

const AVATAR_COMPONENT_SELECTOR = 'kirby-avatar';

@Component({
  selector: AVATAR_COMPONENT_SELECTOR,
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Using host property decorator is fine for static values:
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'kirby-avatar',
  },
})
export class AvatarComponent extends ContentView implements Avatar {
  @Input() imageSrc: string;
  @Input() altText: string;
  @Input() text: string;
  @Input() shadow?: false;
  @Input() overlay?: true;

  view: View;

  constructor() {
    super();
  }

  onViewLoaded(args: EventData) {
    this.view = <View>args.object; // We need a reference to the view so we can access it on orientation changes
    this.setClipping();
  }

  private setClipping() {
    if (this.view.android) {
      this.view.parent.android.setClipChildren(false);
      this.view.parent.android.setClipToPadding(false);

      this.view.android.setClipChildren(false);
      this.view.android.setClipToPadding(false);
    }
  }
}

registerElement(AVATAR_COMPONENT_SELECTOR, () => require('./avatar.component').AvatarComponent);
